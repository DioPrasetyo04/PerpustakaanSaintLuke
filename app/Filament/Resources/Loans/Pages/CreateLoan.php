<?php

namespace App\Filament\Resources\Loans\Pages;

use App\Filament\Resources\Loans\LoanResource;
use App\Models\FineSettings;
use App\Models\Loan;
use Filament\Notifications\Notification;
use Filament\Resources\Pages\CreateRecord;
use Illuminate\Validation\ValidationException;

class CreateLoan extends CreateRecord
{
    protected static string $resource = LoanResource::class;

    protected function mutateFormDataBeforeCreate(array $data): array
    {
        $duration = (int) (FineSettings::query()->value('loan_duration_days') ?? 14);
        $today = now()->startOfDay();
        $loanDate = $today->toDateString();
        $dueDate = $today->copy()->addDays($duration)->toDateString();

        if (! empty($data['loanDetails']) && \is_array($data['loanDetails'])) {
            foreach ($data['loanDetails'] as $index => $detail) {
                $data['loanDetails'][$index]['loan_date'] = $loanDate;
                $data['loanDetails'][$index]['due_date'] = $dueDate;
            }
        }

        return $data;
    }

    protected function beforeCreate(): void
    {
        $userId = $this->data['user_id'] ?? null;
        $details = $this->data['loanDetails'] ?? [];

        if ($userId && ! Loan::checkUserVerified($userId)) {
            $this->failWith(
                'user_id',
                'Email user belum terverifikasi. Verifikasi email terlebih dahulu sebelum melakukan peminjaman.'
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

            if ($userId && Loan::hasActiveLoan($userId, $bookId)) {
                $this->failWith(
                    "loanDetails.$index.book_id",
                    'Peminjam masih memiliki pinjaman aktif untuk buku ini yang belum dikembalikan.'
                );
            }

            if (! Loan::checkStock($bookId)) {
                $this->failWith(
                    "loanDetails.$index.book_id",
                    'Stok buku tidak tersedia.'
                );
            }
        }
    }

    public function afterCreate(): void
    {
        foreach ($this->data['loanDetails'] ?? [] as $detail) {
            if ($bookId = $detail['book_id'] ?? null) {
                Loan::substractionStock($bookId);
                Loan::addLoanStock($bookId);
            }
        }
    }

    protected function getCreatedNotification(): ?Notification
    {
        return Notification::make()
            ->icon('heroicon-s-check-circle')
            ->color('success')
            ->title('Berhasil')
            ->body('Data pinjaman berhasil disimpan.')
            ->persistent();
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
