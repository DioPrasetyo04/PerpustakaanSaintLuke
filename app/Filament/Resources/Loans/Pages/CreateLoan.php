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
            Notification::make()->icon('heroicon-s-x-circle')->color('danger')->title('Failed')->body('User have loan book')->persistent()->send();

            throw ValidationException::withMessages([
                'user_id' => 'User masih memiliki pinjaman buku yang belum dikembalikan',
            ]);
        }

        if ($bookId && !Loan::checkStock($bookId)) {
            Notification::make()->icon('heroicon-s-x-circle')->color('danger')->title('Failed')->body('Stock buku not available')->persistent()->send();
        }

        // if ($userId && Loan::checkUserVerified($userId)) {
        //     Notification::make()->icon('heroicon-s-x-circle')->color('danger')->title('Failed')->body('Email User Not Verified, Please Verified Email First!!!')->persistent()->send();
        // }
    }

    public function afterCreate()
    {
        if ($bookId = $this->data['book_id']) {
            Loan::substractionStock($bookId);
            Loan::addLoanStock($bookId);
        }

        Notification::make()->icon('heroicon-s-check-circle')->color('success')->title('Berhasil')->body('Data pinjaman berhasil disimpan')->persistent()->send();
    }
}
