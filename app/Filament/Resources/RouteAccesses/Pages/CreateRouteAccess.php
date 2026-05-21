<?php

namespace App\Filament\Resources\RouteAccesses\Pages;

use App\Filament\Resources\RouteAccesses\RouteAccessResource;
use App\Filament\Resources\RouteAccesses\Schemas\RouteAccessForm;
use Filament\Resources\Pages\CreateRecord;

class CreateRouteAccess extends CreateRecord
{
    protected static string $resource = RouteAccessResource::class;

    protected function mutateFormDataBeforeCreate(array $data): array
    {
        return RouteAccessForm::mergePermissionIds($data);
    }
}
