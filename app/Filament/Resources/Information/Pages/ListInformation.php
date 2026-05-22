<?php

namespace App\Filament\Resources\Information\Pages;

use App\Filament\Resources\Information\InformationResource;
use App\Filament\Resources\Information\Widgets\InformationByCategoryChart;
use App\Filament\Resources\Information\Widgets\InformationStatsOverview;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListInformation extends ListRecords
{
    protected static string $resource = InformationResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }

    protected function getHeaderWidgets(): array
    {
        return [
            InformationStatsOverview::class,
            InformationByCategoryChart::class,
        ];
    }

    public function getHeaderWidgetsColumns(): int|array
    {
        return 2;
    }
}
