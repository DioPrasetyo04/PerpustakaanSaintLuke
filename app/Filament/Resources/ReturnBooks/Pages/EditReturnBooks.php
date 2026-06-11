<?php

namespace App\Filament\Resources\ReturnBooks\Pages;

use App\Enums\BookCondition;
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
use App\Services\FineCalculatorService;
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
                    'has_review' => (bool) $review,
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

        $oldCondition = $returnBook->returnBookCheck?->condition;
        $newCondition = BookCondition::tryFrom($condition);

        $calc = FineCalculatorService::calculateRaw(
            $condition,
            $returnDate,
            $loanDetail->due_date,
            (float) $book->price,
            $fineSetting,
        );

        $lateFee = $calc['late_fee'];
        $otherFee = $calc['other_fee'];
        $totalFee = $calc['total_fee'];
        $shouldHaveFine = $calc['should_have_fine'];
        $status = $shouldHaveFine ? ReturnBookStatus::COST : ReturnBookStatus::RETURNED;

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

        if ($shouldHaveFine) {
            // Jangan utak-atik denda yang benar-benar SUDAH DIBAYAR (SUCCESS dengan
            // nominal > 0). Namun denda SUCCESS bernominal 0 adalah "auto-lunas"
            // (tak bisa diproses Midtrans) — tetap boleh diperbarui bila kini > 0.
            $isGenuinelyPaid = $existingFine?->payment_status === PaymentStatus::SUCCESS
                && (float) $existingFine->total_fee > 0;

            if (! $isGenuinelyPaid) {
                Fine::updateOrCreate(
                    ['return_book_id' => $returnBook->id],
                    [
                        'late_fee' => $lateFee,
                        'other_fee' => $otherFee,
                        'total_fee' => $totalFee,
                        'fine_date' => now(),
                        'payment_status' => Fine::paymentStatusForTotal($totalFee)->value,
                    ],
                );
            }
        } else {
            // Hapus denda bila tak lagi diperlukan, KECUALI yang benar-benar sudah
            // dibayar (SUCCESS & nominal > 0). Denda auto-lunas Rp0 boleh dihapus.
            $isGenuinelyPaid = $existingFine?->payment_status === PaymentStatus::SUCCESS
                && (float) $existingFine->total_fee > 0;

            if ($existingFine && ! $isGenuinelyPaid) {
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
                    'available' => DB::raw('CASE WHEN available >= 1 THEN available - 1 ELSE 0 END'),
                    'loan' => DB::raw('loan + 1'),
                ]),

            BookCondition::DAMAGED => DB::table('stocks')
                ->where('book_id', $bookId)
                ->update([
                    'damaged' => DB::raw('CASE WHEN damaged >= 1 THEN damaged - 1 ELSE 0 END'),
                    'loan' => DB::raw('loan + 1'),
                ]),

            BookCondition::LOST => DB::table('stocks')
                ->where('book_id', $bookId)
                ->update([
                    'lost' => DB::raw('CASE WHEN lost >= 1 THEN lost - 1 ELSE 0 END'),
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
