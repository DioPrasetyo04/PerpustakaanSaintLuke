<?php

namespace App\Filament\Resources\Fines\Pages;

use App\Filament\Resources\Fines\FineResource;
use App\Filament\Resources\Fines\Widgets\FineRevenueChart;
use App\Filament\Resources\Fines\Widgets\FineStatsOverview;
use Filament\Resources\Pages\ListRecords;

class ListFines extends ListRecords
{
    protected static string $resource = FineResource::class;

    protected function getHeaderWidgets(): array
    {
        return [
            FineStatsOverview::class,
            FineRevenueChart::class,
        ];
    }

    public function getHeaderWidgetsColumns(): int|array
    {
        return 2;
    }
}
