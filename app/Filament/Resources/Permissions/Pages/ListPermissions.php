<?php

namespace App\Filament\Resources\Permissions\Pages;

use App\Filament\Resources\Permissions\PermissionResource;
use App\Filament\Resources\Permissions\Widgets\PermissionsPerRoleChart;
use App\Filament\Resources\Permissions\Widgets\PermissionStatsOverview;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListPermissions extends ListRecords
{
    protected static string $resource = PermissionResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }

    protected function getHeaderWidgets(): array
    {
        return [
            PermissionStatsOverview::class,
            PermissionsPerRoleChart::class,
        ];
    }

    public function getHeaderWidgetsColumns(): int|array
    {
        return 2;
    }
}
