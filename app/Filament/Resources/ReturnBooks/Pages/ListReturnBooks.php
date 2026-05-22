<?php

namespace App\Filament\Resources\ReturnBooks\Pages;

use App\Filament\Resources\ReturnBooks\ReturnBooksResource;
use App\Filament\Resources\ReturnBooks\Widgets\ReturnBookStatsOverview;
use App\Filament\Resources\ReturnBooks\Widgets\ReturnBookWeeklyChart;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListReturnBooks extends ListRecords
{
    protected static string $resource = ReturnBooksResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }

    protected function getHeaderWidgets(): array
    {
        return [
            ReturnBookStatsOverview::class,
            ReturnBookWeeklyChart::class,
        ];
    }

    public function getHeaderWidgetsColumns(): int|array
    {
        return 2;
    }
}
