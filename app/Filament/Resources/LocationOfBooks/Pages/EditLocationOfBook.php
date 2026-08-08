<?php

namespace App\Filament\Resources\LocationOfBooks\Pages;

use App\Filament\Resources\LocationOfBooks\LocationOfBookResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditLocationOfBook extends EditRecord
{
    protected static string $resource = LocationOfBookResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
