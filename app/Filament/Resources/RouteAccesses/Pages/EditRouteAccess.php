<?php

namespace App\Filament\Resources\RouteAccesses\Pages;

use App\Filament\Resources\RouteAccesses\RouteAccessResource;
use App\Filament\Resources\RouteAccesses\Schemas\RouteAccessForm;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditRouteAccess extends EditRecord
{
    protected static string $resource = RouteAccessResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }

    protected function mutateFormDataBeforeFill(array $data): array
    {
        $permIds = $data['permission_ids'] ?? [];
        $groups  = RouteAccessForm::splitPermissionIds(\is_array($permIds) ? $permIds : []);
        unset($data['permission_ids']);

        return array_merge($data, $groups);
    }

    protected function mutateFormDataBeforeSave(array $data): array
    {
        return RouteAccessForm::mergePermissionIds($data);
    }
}
