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

    protected function mutateFormDataBeforeFill(array $data): array
    {
        return OnlineResourcesResource::expandCustomType($data);
    }

    protected function mutateFormDataBeforeSave(array $data): array
    {
        return OnlineResourcesResource::resolveCustomType($data);
    }
}
