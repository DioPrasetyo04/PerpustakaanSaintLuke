<?php

namespace App\Filament\Resources\ReturnBooks\Pages;

use App\Filament\Resources\ReturnBooks\ReturnBooksResource;
use App\Filament\Resources\ReturnBooks\Schemas\ReturnBookInfolist;
use Filament\Actions\EditAction;
use Filament\Resources\Pages\ViewRecord;
use Filament\Schemas\Schema;
use App\Models\Fine;
use App\Services\MidtransService;
use Filament\Notifications\Notification;

class ViewReturnBooks extends ViewRecord
{
    protected static string $resource = ReturnBooksResource::class;

    protected function resolveRecord(int | string $key): \Illuminate\Database\Eloquent\Model
    {
        return parent::resolveRecord($key)->load([
            'user',
            'loanDetails.book.authors',
            'loanDetails.returnBook.returnBookCheck',
            'loanDetails.returnBook.fine',
            'loanDetails.returnBook.review',
        ]);
    }

    public function infolist(Schema $schema): Schema
    {
        return ReturnBookInfolist::configure($schema);
    }

    public function payFine(int $fineId): void
    {
        try {

            $fine = Fine::findOrFail($fineId);

            $snapToken = MidtransService::getSnapToken($fine);

            $this->dispatch(
                'midtrans-pay',
                snapToken: $snapToken
            );
        } catch (\Exception $e) {

            Notification::make()
                ->title('Error Midtrans')
                ->body($e->getMessage())
                ->danger()
                ->send();
        }
    }

    protected function getHeaderActions(): array
    {
        return [
            EditAction::make(),
        ];
    }
}
