<?php

namespace App\Filament\Resources\ReturnBooks\Pages;

use App\Enums\BookCondition;
use App\Enums\DiscountType;
use App\Enums\LoanBookStatus;
use App\Enums\PaymentStatus;
use App\Enums\ReturnBookStatus;
use App\Filament\Resources\ReturnBooks\ReturnBooksResource;
use App\Models\Fine;
use App\Models\FineSettings;
use App\Models\LoanDetail;
use App\Models\ReturnBook;
use App\Models\ReturnBookCheck;
use App\Models\ReviewBook;
use Filament\Actions\DeleteAction;
use Filament\Notifications\Notification;
use Filament\Resources\Pages\EditRecord;
use Filament\Support\Exceptions\Halt;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class EditReturnBooks extends EditRecord
{
    protected static string $resource = ReturnBooksResource::class;

    protected function mutateFormDataBeforeSave(array $data): array
    {
        if (! FineSettings::exists()) {
            Notification::make()
                ->title('Pengaturan denda belum dibuat')
                ->body('Silakan buat pengaturan denda terlebih dahulu.')
                ->danger()
                ->persistent()
                ->send();

            $this->redirectRoute('filament.admin.resources.fine-settings.create');

            throw new Halt();
        }

        return $data;
    }

    protected function mutateFormDataBeforeFill(array $data): array
    {
        $loan = $this->record;
        $loan->loadMissing([
            'user',
            'loanDetails.book',
            'loanDetails.returnBook.returnBookCheck',
            'loanDetails.returnBook.review',
        ]);

        $returns = $loan->loanDetails
            ->filter(fn(LoanDetail $detail) => $detail->returnBook)
            ->values()
            ->map(function (LoanDetail $detail) {
                $rb = $detail->returnBook;
                $check = $rb?->returnBookCheck;
                $review = $rb?->review;

                return [
                    'return_book_id' => $rb?->id,
                    'loan_detail_id' => $detail->id,
                    'book_id' => $detail->book_id,
                    'book_title' => $detail->book?->title,
                    'return_date' => $rb?->return_date ? Carbon::parse($rb->return_date)->toDateString() : null,
                    'condition' => $check?->condition?->value ?? BookCondition::GOOD->value,
                    'notes' => $check?->notes,
                    'rating' => $review?->rating !== null ? (string) (float) $review->rating : null,
                    'comment' => $review?->comment,
                ];
            })
            ->all();

        return [
            'loan_id' => $loan->id,
            'user_name' => $loan->user?->name,
            'loan_code' => $loan->loan_code,
            'returns' => $returns,
        ];
    }

    protected function handleRecordUpdate(Model $record, array $data): Model
    {
        return DB::transaction(function () use ($record, $data) {
            $fineSetting = FineSettings::first();

            foreach ($data['returns'] ?? [] as $item) {
                if (empty($item['return_book_id'])) {
                    continue;
                }

                $returnBook = ReturnBook::with(['loanDetail.book', 'returnBookCheck', 'review'])
                    ->find($item['return_book_id']);

                if (! $returnBook || $returnBook->loanDetail?->loan_id !== $record->id) {
                    continue;
                }

                $this->updateOneReturn($returnBook, $item, $fineSetting);
            }

            $record->recomputeStatus();

            return $record;
        });
    }

    protected function updateOneReturn(ReturnBook $returnBook, array $item, ?FineSettings $fineSetting): void
    {
        $loanDetail = $returnBook->loanDetail;
        $book = $loanDetail?->book;
        if (! $loanDetail || ! $book) return;

        $condition = $item['condition'] ?? BookCondition::GOOD->value;
        $returnDate = Carbon::parse($item['return_date'] ?? $returnBook->return_date);
        $dueDate = Carbon::parse($loanDetail->due_date);

        $oldCondition = $returnBook->returnBookCheck?->condition;
        $newCondition = BookCondition::tryFrom($condition);

        $bookPrice = (float) $book->price;
        $damageType = $fineSetting?->damage_discount_type instanceof DiscountType
            ? $fineSetting->damage_discount_type
            : DiscountType::tryFrom((string) $fineSetting?->damage_discount_type);
        $lostType = $fineSetting?->lost_discount_type instanceof DiscountType
            ? $fineSetting->lost_discount_type
            : DiscountType::tryFrom((string) $fineSetting?->lost_discount_type);

        $damageFee = (float) ($fineSetting?->damage_fee_book ?? 0);
        $lostFee   = (float) ($fineSetting?->lost_fee_book ?? 0);

        $lateFee = 0;
        $otherFee = 0;

        if ($fineSetting && $returnDate->gt($dueDate)) {
            $lateDays = (int) $dueDate->diffInDays($returnDate);
            $lateFee = $lateDays * (float) $fineSetting->late_fee_per_day;
        }

        if ($condition === BookCondition::DAMAGED->value) {
            $otherFee = $damageType === DiscountType::PERCENTAGE
                ? ($damageFee * $bookPrice) / 100
                : $damageFee;
        }

        if ($condition === BookCondition::LOST->value) {
            $otherFee = $lostType === DiscountType::PERCENTAGE
                ? ($lostFee * $bookPrice) / 100
                : $lostFee;
        }

        $totalFee = $lateFee + $otherFee;
        $status = $totalFee > 0 ? ReturnBookStatus::COST : ReturnBookStatus::RETURNED;

        $returnBook->update([
            'return_date' => $returnDate->toDateString(),
            'status' => $status,
        ]);

        $normalizedNotes = CreateReturnBooks::normalizeRichText($item['notes'] ?? null);
        $notes = $normalizedNotes ?: match ($condition) {
            BookCondition::DAMAGED->value => 'Buku rusak saat dikembalikan',
            BookCondition::LOST->value    => 'Buku hilang saat dikembalikan',
            default                       => 'Buku dalam kondisi baik saat dikembalikan',
        };

        ReturnBookCheck::updateOrCreate(
            ['return_book_id' => $returnBook->id],
            ['condition' => $condition, 'notes' => $notes],
        );

        if ($oldCondition && $newCondition && $oldCondition !== $newCondition) {
            $this->rollbackStockForCondition($oldCondition, $book->id);
            $this->applyStockForCondition($newCondition, $book->id);
        } elseif (! $oldCondition && $newCondition) {
            $this->applyStockForCondition($newCondition, $book->id);
        }

        $existingFine = Fine::where('return_book_id', $returnBook->id)->first();

        if ($totalFee > 0) {
            if ($existingFine?->payment_status === PaymentStatus::SUCCESS) {
                // skip: jangan ubah fine yang sudah dibayar
            } else {
                Fine::updateOrCreate(
                    ['return_book_id' => $returnBook->id],
                    [
                        'late_fee' => $lateFee,
                        'other_fee' => $otherFee,
                        'total_fee' => $totalFee,
                        'fine_date' => now(),
                        'payment_status' => PaymentStatus::PENDING->value,
                    ],
                );
            }
        } else {
            if ($existingFine && $existingFine->payment_status !== PaymentStatus::SUCCESS) {
                $existingFine->delete();
            }
        }

        if (! empty($item['rating'])) {
            ReviewBook::updateOrCreate(
                ['return_book_id' => $returnBook->id],
                [
                    'loan_user_id' => $loanDetail->id,
                    'rating' => (float) $item['rating'],
                    'comment' => CreateReturnBooks::normalizeRichText($item['comment'] ?? null),
                ],
            );
        }

        $loanDetail->update(['status' => LoanBookStatus::RETURNED]);
    }

    protected function rollbackStockForCondition(BookCondition $condition, int $bookId): void
    {
        match ($condition) {
            BookCondition::GOOD => DB::table('stocks')
                ->where('book_id', $bookId)
                ->update([
                    'available' => DB::raw('GREATEST(available - 1,0)'),
                    'loan' => DB::raw('loan + 1'),
                ]),

            BookCondition::DAMAGED => DB::table('stocks')
                ->where('book_id', $bookId)
                ->update([
                    'damaged' => DB::raw('GREATEST(damaged - 1,0)'),
                    'loan' => DB::raw('loan + 1'),
                ]),

            BookCondition::LOST => DB::table('stocks')
                ->where('book_id', $bookId)
                ->update([
                    'lost' => DB::raw('GREATEST(lost - 1,0)'),
                    'loan' => DB::raw('loan + 1'),
                ]),
        };
    }

    protected function applyStockForCondition(BookCondition $condition, int $bookId): void
    {
        match ($condition) {
            BookCondition::GOOD => ReturnBookCheck::addReturnStock($bookId),
            BookCondition::DAMAGED => ReturnBookCheck::addDamagedStock($bookId),
            BookCondition::LOST => ReturnBookCheck::addLostStock($bookId),
        };
    }

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make()
                ->visible(fn() => ! $this->hasAnyPaidFine())
                ->before(function () {
                    if ($this->hasAnyPaidFine()) {
                        Notification::make()
                            ->title('Tidak dapat dihapus')
                            ->body('Peminjaman ini memiliki denda yang sudah dibayar.')
                            ->danger()
                            ->send();

                        throw new Halt();
                    }

                    DB::transaction(function () {
                        $this->record->loadMissing(['loanDetails.returnBook.returnBookCheck']);

                        foreach ($this->record->loanDetails as $detail) {
                            $returnBook = $detail->returnBook;
                            if (! $returnBook) continue;

                            $condition = $returnBook->returnBookCheck?->condition;
                            if ($condition) {
                                $this->rollbackStockForCondition($condition, $detail->book_id);
                            }

                            Fine::where('return_book_id', $returnBook->id)->delete();
                            $returnBook->delete();

                            $detail->update(['status' => LoanBookStatus::BORROWED]);
                        }

                        $this->record->recomputeStatus();
                    });
                }),
        ];
    }

    protected function hasAnyPaidFine(): bool
    {
        $returnBookIds = ReturnBook::whereHas('loanDetail', fn($q) => $q->where('loan_id', $this->record->id))
            ->pluck('id');

        if ($returnBookIds->isEmpty()) {
            return false;
        }

        return Fine::whereIn('return_book_id', $returnBookIds)
            ->where('payment_status', PaymentStatus::SUCCESS)
            ->exists();
    }

    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }
}
