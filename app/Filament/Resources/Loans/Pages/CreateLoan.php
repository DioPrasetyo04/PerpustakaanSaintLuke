<?php

namespace App\Filament\Resources\Loans\Pages;

use App\Filament\Resources\Loans\LoanResource;
use App\Models\Loan;
use Filament\Notifications\Notification;
use Filament\Resources\Pages\CreateRecord;
use Illuminate\Validation\ValidationException;

class CreateLoan extends CreateRecord
{
    protected static string $resource = LoanResource::class;

    protected function beforeCreate(): void
    {
        $userId = $this->data['user_id'] ?? null;
        $bookId = $this->data['book_id'] ?? null;

        if ($userId && Loan::hasActiveLoan($userId, $bookId)) {
            Notification::make()->icon('heroicon-s-x-circle')->color('danger')->title('Gagal')->body('User masih memiliki buku yang dikembalikan')->persistent()->send();

            throw ValidationException::withMessages([
                'user_id' => 'User masih memiliki pinjaman buku yang belum dikembalikan',
            ]);
        }

        if ($bookId && !Loan::checkStock($bookId)) {
            Notification::make()->icon('heroicon-s-x-circle')->color('danger')->title('Gagal')->body('Stock buku sudah habis dipinjam')->persistent()->send();
        }
    }

    public function afterCreate()
    {
        if ($bookId = $this->data['book_id']) {
            Loan::substractionStock($bookId);
        }

        Notification::make()->icon('heroicon-s-check-circle')->color('success')->title('Berhasil')->body('Data pinjaman berhasil disimpan')->persistent()->send();
    }
}
