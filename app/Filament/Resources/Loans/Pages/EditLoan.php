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

    protected ?int $oldBookId = null;

    protected function beforeSave(): void
    {
        $userId = $this->data['user_id'] ?? null;
        $bookId = $this->data['book_id'] ?? null;
        $loanId = $this->record->id;

        // simpan book lama sebelum update
        $this->oldBookId = $this->record->book_id;

        // cek loan aktif selain record ini
        if (
            $userId && Loan::query()
            ->where('id', '!=', $loanId)
            ->where('user_id', $userId)
            ->whereDoesntHave('returnBook')
            ->exists()
        ) {
            Notification::make()
                ->danger()
                ->title('Failed')
                ->body('User masih memiliki pinjaman buku')
                ->persistent()
                ->send();

            throw ValidationException::withMessages([
                'user_id' => 'User masih memiliki pinjaman buku',
            ]);
        }

        // cek email verified
        if ($userId && !Loan::checkUserVerified($userId)) {
            Notification::make()
                ->danger()
                ->title('Failed')
                ->body('Email user belum terverifikasi')
                ->persistent()
                ->send();

            throw ValidationException::withMessages([
                'user_id' => 'User email belum diverifikasi',
            ]);
        }

        // cek stock buku baru
        if ($bookId && !Loan::checkStock($bookId)) {
            Notification::make()
                ->danger()
                ->title('Failed')
                ->body('Stock buku tidak tersedia')
                ->persistent()
                ->send();

            throw ValidationException::withMessages([
                'book_id' => 'Stock buku tidak tersedia',
            ]);
        }
    }

    protected function afterSave(): void
    {
        $newBookId = $this->data['book_id'];

        // jika buku diganti
        if ($this->oldBookId != $newBookId) {
            // rollback buku lama
            Loan::rollbacLoanStock($this->oldBookId);

            // kurangi buku baru
            Loan::substractionStock($newBookId);
            Loan::addLoanStock($newBookId);
        }
    }

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make()
                ->before(function () {

                    if (!$this->record->returnBook()->exists()) {
                        Loan::rollbacLoanStock(
                            $this->record->book_id
                        );
                    }
                }),
        ];
    }
}
