<?php

namespace App\Filament\Resources\LocationOfBooks\Pages;

use App\Filament\Resources\LocationOfBooks\LocationOfBookResource;
use App\Filament\Resources\LocationOfBooks\Widgets\LocationOfBookChart;
use App\Filament\Resources\LocationOfBooks\Widgets\LocationOverviewStats;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListLocationOfBooks extends ListRecords
{
    protected static string $resource = LocationOfBookResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }

    /**
     * Daftarkan widget di atas tabel.
     * Urutan: Stats Overview → Chart.
     */
    protected function getHeaderWidgets(): array
    {
        return [
            LocationOverviewStats::class,
            LocationOfBookChart::class,
        ];
    }
}
