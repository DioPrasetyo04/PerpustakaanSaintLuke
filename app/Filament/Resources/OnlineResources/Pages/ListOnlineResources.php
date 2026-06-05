<?php

namespace App\Filament\Resources\OnlineResources\Pages;

use App\Filament\Resources\OnlineResources\OnlineResourcesResource;
use App\Filament\Resources\OnlineResources\Widgets\OnlineResourceStatsOverview;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListOnlineResources extends ListRecords
{
    protected static string $resource = OnlineResourcesResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }

    protected function getHeaderWidgets(): array
    {
        return [
            OnlineResourceStatsOverview::class,
        ];
    }
}
