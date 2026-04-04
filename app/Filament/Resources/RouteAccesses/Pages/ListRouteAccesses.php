<?php

namespace App\Filament\Resources\RouteAccesses\Pages;

use App\Filament\Resources\RouteAccesses\RouteAccessResource;
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
}
