<?php

namespace App\Filament\Resources\OnlineResources\Pages;

use App\Filament\Resources\OnlineResources\OnlineResourcesResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditOnlineResources extends EditRecord
{
    protected static string $resource = OnlineResourcesResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
