<?php

namespace App\Filament\Resources\ReturnBooks\Pages;

use App\Enums\BookCondition;
use App\Enums\LoanBookStatus;
use App\Enums\PaymentStatus;
use App\Enums\ReturnBookStatus;
use App\Filament\Resources\ReturnBooks\ReturnBooksResource;
use App\Models\Fine;
use App\Models\FineSettings;
use App\Models\Loan;
use App\Models\LoanDetail;
use App\Models\ReturnBook;
use App\Models\ReturnBookCheck;
use App\Models\ReviewBook;
use App\Services\FineCalculatorService;
use Filament\Notifications\Notification;
use Filament\Resources\Pages\CreateRecord;
use Filament\Support\Exceptions\Halt;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class CreateReturnBooks extends CreateRecord
{
    protected static string $resource = ReturnBooksResource::class;

    protected function mutateFormDataBeforeCreate(array $data): array
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

        if (empty($data['returns'] ?? [])) {
            Notification::make()
                ->title('Tidak ada buku untuk dikembalikan')
                ->body('Tambahkan minimal satu buku pada daftar pengembalian.')
                ->danger()
                ->send();

            throw new Halt();
        }

        return $data;
    }

    protected function handleRecordCreation(array $data): Model
    {
        return DB::transaction(function () use ($data) {
            $loan = Loan::with('loanDetails.book')->findOrFail($data['loan_id']);
            $fineSetting = FineSettings::first();

            foreach ($data['returns'] as $item) {
                $loanDetail = LoanDetail::with('book')->findOrFail($item['loan_detail_id']);

                if ($loanDetail->loan_id !== $loan->id) {
                    continue;
                }

                if ($loanDetail->returnBook()->exists()) {
                    continue;
                }

                $this->createOneReturn($loanDetail, $item, $fineSetting);
            }

            $loan->recomputeStatus();

            return $loan->refresh();
        });
    }

    protected function createOneReturn(LoanDetail $loanDetail, array $item, ?FineSettings $fineSetting): ReturnBook
    {
        $book = $loanDetail->book;
        $condition = $item['condition'] ?? BookCondition::GOOD->value;
        $returnDate = Carbon::parse($item['return_date'] ?? now());

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

        $returnBook = ReturnBook::create([
            'return_book_code' => generateUniqueCode('return_book', ReturnBook::class, 'return_book_code'),
            'loan_user_id' => $loanDetail->id,
            'return_date' => $returnDate->toDateString(),
            'status' => $status,
        ]);

        $normalizedNotes = self::normalizeRichText($item['notes'] ?? null);
        $notes = $normalizedNotes ?: match ($condition) {
            BookCondition::DAMAGED->value => 'Buku rusak saat dikembalikan',
            BookCondition::LOST->value    => 'Buku hilang saat dikembalikan',
            default                       => 'Buku dalam kondisi baik saat dikembalikan',
        };

        ReturnBookCheck::create([
            'return_book_id' => $returnBook->id,
            'condition' => $condition,
            'notes' => $notes,
        ]);

        match ($condition) {
            BookCondition::GOOD->value    => ReturnBookCheck::addReturnStock($book->id),
            BookCondition::DAMAGED->value => ReturnBookCheck::addDamagedStock($book->id),
            BookCondition::LOST->value    => ReturnBookCheck::addLostStock($book->id),
        };

        $loanDetail->update(['status' => LoanBookStatus::RETURNED]);

        if ($shouldHaveFine) {
            Fine::create([
                'return_book_id' => $returnBook->id,
                'late_fee' => $lateFee,
                'other_fee' => $otherFee,
                'total_fee' => $totalFee,
                'fine_date' => now(),
                'payment_status' => PaymentStatus::PENDING->value,
            ]);
        }

        if (! empty($item['rating'])) {
            ReviewBook::create([
                'loan_user_id' => $loanDetail->id,
                'return_book_id' => $returnBook->id,
                'rating' => (float) $item['rating'],
                'comment' => self::normalizeRichText($item['comment'] ?? null),
            ]);
        }

        return $returnBook;
    }

    public static function normalizeRichText($value): ?string
    {
        if (blank($value)) {
            return null;
        }

        if (is_array($value)) {
            $html = tiptapToHtml($value);
            return blank($html) ? null : $html;
        }

        if (is_string($value)) {
            $decoded = json_decode($value, true);
            if (is_array($decoded) && isset($decoded['content'])) {
                $html = tiptapToHtml($decoded);
                return blank($html) ? null : $html;
            }
            return $value;
        }

        return null;
    }

    protected function fillForm(): void
    {
        $loanId = (int) request()->query('loan_id');

        if (! $loanId) {
            parent::fillForm();
            return;
        }

        $loan = Loan::with(['user', 'loanDetails.book', 'loanDetails.returnBook'])->find($loanId);

        if (! $loan) {
            parent::fillForm();
            return;
        }

        $returns = $loan->loanDetails
            ->filter(fn(LoanDetail $detail) => ! $detail->returnBook)
            ->values()
            ->map(fn(LoanDetail $detail) => [
                'loan_detail_id' => $detail->id,
                'book_id' => $detail->book_id,
                'book_title' => $detail->book?->title,
                'return_date' => now()->toDateString(),
                'condition' => BookCondition::GOOD->value,
                'notes' => null,
                'has_review' => false,
                'rating' => null,
                'comment' => null,
            ])
            ->all();

        if (empty($returns)) {
            Notification::make()
                ->title('Semua buku sudah dikembalikan')
                ->body('Tidak ada buku yang dapat dikembalikan untuk peminjaman ini.')
                ->warning()
                ->send();
        }

        $this->form->fill([
            'loan_id' => $loan->id,
            'user_name' => $loan->user?->name,
            'loan_code' => $loan->loan_code,
            'returns' => $returns,
        ]);
    }
}
