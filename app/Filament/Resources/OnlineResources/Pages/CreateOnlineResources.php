<?php

namespace App\Filament\Resources\OnlineResources\Pages;

use App\Filament\Resources\OnlineResources\OnlineResourcesResource;
use Filament\Resources\Pages\CreateRecord;

class CreateOnlineResources extends CreateRecord
{
    protected static string $resource = OnlineResourcesResource::class;

    protected function mutateFormDataBeforeCreate(array $data): array
    {
        return OnlineResourcesResource::resolveCustomType($data);
    }
}
