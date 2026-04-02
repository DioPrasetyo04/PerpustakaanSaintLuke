<?php

namespace App\Filament\Resources\FineSettings\Pages;

use App\Filament\Resources\FineSettings\FineSettingsResource;
use App\Models\FineSettings;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListFineSettings extends ListRecords
{
    protected static string $resource = FineSettingsResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make()
                ->visible(fn() => FineSettings::count() === 0),
        ];
    }
}
