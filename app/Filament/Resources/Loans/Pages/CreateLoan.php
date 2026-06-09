<?php

namespace App\Filament\Resources\Loans\Pages;

use App\Filament\Resources\Loans\Concerns\InteractsWithMemberScan;
use App\Filament\Resources\Loans\LoanResource;
use App\Models\FineSettings;
use App\Models\Loan;
use Filament\Notifications\Notification;
use Filament\Resources\Pages\CreateRecord;
use Illuminate\Validation\ValidationException;

class CreateLoan extends CreateRecord
{
    use InteractsWithMemberScan;

    protected static string $resource = LoanResource::class;

    protected function mutateFormDataBeforeCreate(array $data): array
    {
        $today = now()->startOfDay()->toDateString();

        // Buku baru: tanggal pinjam selalu hari ini. Tanggal jatuh tempo dibiarkan
        // sesuai input (dapat diatur per buku). Buku lama (is_existing) tidak ikut.
        if (! empty($data['loanDetails']) && \is_array($data['loanDetails'])) {
            foreach ($data['loanDetails'] as $index => $detail) {
                if (! empty($detail['is_existing'])) {
                    continue;
                }
                $data['loanDetails'][$index]['loan_date'] = $today;
            }
        }

        return $data;
    }

    protected function beforeCreate(): void
    {
        $userId = $this->data['user_id'] ?? null;

        // Buang baris buku lama (pinjaman aktif yang di-load otomatis) agar tidak
        // tersimpan ulang sebagai pinjaman baru dan tidak menggandakan stok.
        $this->data['loanDetails'] = array_filter(
            $this->data['loanDetails'] ?? [],
            fn($detail) => empty($detail['is_existing'])
        );

        $details = $this->data['loanDetails'];

        if ($userId && ! Loan::checkUserVerified($userId)) {
            $this->failWith(
                'user_id',
                'Email user belum terverifikasi. Verifikasi email terlebih dahulu sebelum melakukan peminjaman.'
            );
        }

        if (empty(array_filter($details, fn($d) => ! empty($d['book_id'])))) {
            $this->failWith(
                'loanDetails',
                'Minimal harus ada 1 buku baru yang dipinjam.'
            );
        }

        foreach ($details as $index => $detail) {
            $bookId = $detail['book_id'] ?? null;
            if (! $bookId) {
                continue;
            }

            if ($userId && Loan::hasActiveLoan($userId, $bookId)) {
                $bookTitle = \App\Models\Book::query()->whereKey($bookId)->value('title') ?? 'tersebut';
                $this->failWith(
                    "loanDetails.$index.book_id",
                    "Peminjam masih memiliki pinjaman aktif untuk buku \"{$bookTitle}\" yang belum dikembalikan."
                );
            }

            if (! Loan::checkStock($bookId)) {
                $bookTitle = \App\Models\Book::query()->whereKey($bookId)->value('title') ?? 'tersebut';
                $this->failWith(
                    "loanDetails.$index.book_id",
                    "Stok buku \"{$bookTitle}\" tidak tersedia."
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
