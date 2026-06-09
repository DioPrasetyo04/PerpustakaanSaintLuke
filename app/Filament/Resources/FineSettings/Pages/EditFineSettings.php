<?php

namespace App\Filament\Resources\FineSettings\Pages;

use App\Enums\BookCondition;
use App\Enums\DiscountType;
use App\Enums\PaymentStatus;
use App\Filament\Resources\FineSettings\Concerns\ValidatesFinePercentages;
use App\Filament\Resources\FineSettings\FineSettingsResource;
use App\Models\Fine;
use Filament\Actions\DeleteAction;
use Filament\Notifications\Notification;
use Filament\Resources\Pages\EditRecord;

class EditFineSettings extends EditRecord
{
    use ValidatesFinePercentages;

    protected static string $resource = FineSettingsResource::class;

    protected function beforeSave(): void
    {
        if ($error = $this->finePercentageError($this->data)) {
            Notification::make()
                ->title('Gagal menyimpan pengaturan denda')
                ->body($error)
                ->danger()
                ->persistent()
                ->send();

            $this->halt();
        }
    }

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make()
                ->successNotification(
                    Notification::make()
                        ->title('Pengaturan denda berhasil dihapus')
                        ->body('Data pengaturan denda telah dihapus. Anda dapat membuat pengaturan baru.')
                        ->success()
                ),
        ];
    }

    protected function afterSave(): void
    {
        $fineSetting = $this->record->fresh();

        Fine::where('payment_status', PaymentStatus::PENDING)
            ->with(['returnBook.loanDetail.book', 'returnBook.returnBookCheck'])
            ->each(function (Fine $fine) use ($fineSetting) {
                $returnBook = $fine->returnBook;
                if (!$returnBook) return;

                $loanDetail = $returnBook->loanDetail;
                $book = $loanDetail?->book;
                $condition = $returnBook->returnBookCheck?->condition;

                if (!$loanDetail || !$book || !$condition) return;

                $lateFee = 0;
                $otherFee = 0;

                $dueDate = $loanDetail->due_date;
                if ($dueDate && $returnBook->return_date > $dueDate) {
                    $daysLate = $dueDate->diffInDays($returnBook->return_date);
                    $lateFee = $daysLate * $fineSetting->late_fee_per_day;
                }

                if ($condition === BookCondition::DAMAGED) {
                    if ($fineSetting->damage_discount_type === DiscountType::PERCENTAGE) {
                        $otherFee = $book->price * ($fineSetting->damage_fee_book / 100);
                    } else {
                        $otherFee = $fineSetting->damage_fee_book;
                    }
                }

                if ($condition === BookCondition::LOST) {
                    if ($fineSetting->lost_discount_type === DiscountType::PERCENTAGE) {
                        $otherFee = $book->price * ($fineSetting->lost_fee_book / 100);
                    } else {
                        $otherFee = $fineSetting->lost_fee_book;
                    }
                }

                $fine->update([
                    'late_fee' => $lateFee,
                    'other_fee' => $otherFee,
                    'total_fee' => $lateFee + $otherFee,
                ]);
            });
    }

    protected function getSavedNotification(): ?Notification
    {
        return Notification::make()
            ->title('Pengaturan denda berhasil diperbarui')
            ->body('Perubahan pengaturan denda perpustakaan telah berhasil disimpan. Semua denda yang belum dibayar telah dikalkulasi ulang.')
            ->success();
    }

    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }
}
