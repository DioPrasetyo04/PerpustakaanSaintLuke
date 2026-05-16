<?php

namespace App\Filament\Resources\Loans\Pages;

use App\Filament\Resources\Loans\LoanResource;
use App\Models\Loan;
use Filament\Actions\DeleteAction;
use Filament\Notifications\Notification;
use Filament\Resources\Pages\EditRecord;
use Illuminate\Validation\ValidationException;

class EditLoan extends EditRecord
{
    protected static string $resource = LoanResource::class;

    /** @var array<int> */
    protected array $oldBookIds = [];

    protected function beforeSave(): void
    {
        $userId = $this->data['user_id'] ?? null;
        $loanId = $this->record->id;
        $details = $this->data['loanDetails'] ?? [];

        $this->oldBookIds = $this->record->loanDetails()->pluck('book_id')->all();

        if ($userId && ! Loan::checkUserVerified($userId)) {
            $this->failWith(
                'user_id',
                'Email user belum terverifikasi.'
            );
        }

        if (empty($details)) {
            $this->failWith(
                'loanDetails',
                'Minimal harus ada 1 buku yang dipinjam.'
            );
        }

        foreach ($details as $index => $detail) {
            $bookId = $detail['book_id'] ?? null;
            if (! $bookId) {
                continue;
            }

            $activeElsewhere = Loan::query()
                ->where('id', '!=', $loanId)
                ->where('user_id', $userId)
                ->whereHas('loanDetails', fn($q) => $q
                    ->where('book_id', $bookId)
                    ->whereDoesntHave('returnBook'))
                ->exists();

            if ($activeElsewhere) {
                $this->failWith(
                    "loanDetails.$index.book_id",
                    'Peminjam masih memiliki pinjaman aktif untuk buku ini di transaksi peminjaman lain.'
                );
            }

            if (! \in_array($bookId, $this->oldBookIds, true) && ! Loan::checkStock($bookId)) {
                $this->failWith(
                    "loanDetails.$index.book_id",
                    'Stok buku tidak tersedia.'
                );
            }
        }
    }

    protected function afterSave(): void
    {
        $newBookIds = collect($this->data['loanDetails'] ?? [])
            ->pluck('book_id')
            ->filter()
            ->map(fn($v) => (int) $v)
            ->all();

        $added = array_diff($newBookIds, $this->oldBookIds);
        $removed = array_diff($this->oldBookIds, $newBookIds);

        foreach ($removed as $bookId) {
            Loan::rollbacLoanStock($bookId);
        }

        foreach ($added as $bookId) {
            Loan::substractionStock($bookId);
            Loan::addLoanStock($bookId);
        }
    }

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make()
                ->before(function () {
                    $bookIds = $this->record->loanDetails()
                        ->whereDoesntHave('returnBook')
                        ->pluck('book_id');
                    foreach ($bookIds as $bookId) {
                        Loan::rollbacLoanStock($bookId);
                    }
                }),
        ];
    }

    protected function failWith(string $field, string $message): void
    {
        Notification::make()
            ->icon('heroicon-s-x-circle')
            ->color('danger')
            ->title('Gagal')
            ->body($message)
            ->persistent()
            ->send();

        throw ValidationException::withMessages([$field => $message]);
    }
}
