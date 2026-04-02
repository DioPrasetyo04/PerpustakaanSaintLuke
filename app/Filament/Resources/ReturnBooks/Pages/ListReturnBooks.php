<?php

namespace App\Filament\Resources\ReturnBooks\Pages;

use App\Filament\Resources\ReturnBooks\ReturnBooksResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListReturnBooks extends ListRecords
{
    protected static string $resource = ReturnBooksResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
