<?php

namespace App\Filament\Resources\ReturnBooks\Pages;

use App\Filament\Resources\ReturnBooks\ReturnBooksResource;
use App\Filament\Resources\ReturnBooks\Schemas\ReturnBookInfolist;
use Filament\Actions\EditAction;
use Filament\Resources\Pages\ViewRecord;
use Filament\Schemas\Schema;

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
            'loanDetails.review',
        ]);
    }

    public function infolist(Schema $schema): Schema
    {
        return ReturnBookInfolist::configure($schema);
    }

    protected function getHeaderActions(): array
    {
        return [
            EditAction::make(),
        ];
    }
}
