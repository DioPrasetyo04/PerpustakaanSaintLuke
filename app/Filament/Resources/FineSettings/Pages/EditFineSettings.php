<?php

namespace App\Filament\Resources\FineSettings\Pages;

use App\Enums\BookCondition;
use App\Enums\DiscountType;
use App\Enums\PaymentStatus;
use App\Filament\Resources\FineSettings\FineSettingsResource;
use App\Models\Fine;
use Filament\Actions\DeleteAction;
use Filament\Notifications\Notification;
use Filament\Resources\Pages\EditRecord;

class EditFineSettings extends EditRecord
{
    protected static string $resource = FineSettingsResource::class;

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
            ->with(['returnBook.loan', 'returnBook.book', 'returnBook.returnBookCheck'])
            ->each(function (Fine $fine) use ($fineSetting) {
                $returnBook = $fine->returnBook;
                if (!$returnBook) return;

                $loan = $returnBook->loan;
                $book = $returnBook->book;
                $condition = $returnBook->returnBookCheck?->condition;

                if (!$loan || !$book || !$condition) return;

                $lateFee = 0;
                $otherFee = 0;

                if ($returnBook->return_date > $loan->due_date) {
                    $daysLate = $loan->due_date->diffInDays($returnBook->return_date);
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
