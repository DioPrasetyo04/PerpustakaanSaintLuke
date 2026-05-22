<?php

namespace App\Filament\Resources\RouteAccesses\Pages;

use App\Filament\Resources\RouteAccesses\RouteAccessResource;
use App\Filament\Resources\RouteAccesses\Widgets\RouteAccessByRoleChart;
use App\Filament\Resources\RouteAccesses\Widgets\RouteAccessStatsOverview;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListRouteAccesses extends ListRecords
{
    protected static string $resource = RouteAccessResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }

    protected function getHeaderWidgets(): array
    {
        return [
            RouteAccessStatsOverview::class,
            RouteAccessByRoleChart::class,
        ];
    }

    public function getHeaderWidgetsColumns(): int|array
    {
        return 2;
    }
}
