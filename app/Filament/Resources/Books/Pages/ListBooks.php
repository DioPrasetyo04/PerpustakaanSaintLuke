<?php

namespace App\Filament\Resources\Books\Pages;

use App\Filament\Resources\Books\BookResource;
use App\Filament\Resources\Books\Widgets\BookStatsOverview;
use App\Filament\Resources\Books\Widgets\BooksByCategoryChart;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListBooks extends ListRecords
{
    protected static string $resource = BookResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }

    protected function getHeaderWidgets(): array
    {
        return [
            BookStatsOverview::class,
            BooksByCategoryChart::class,
        ];
    }

    public function getHeaderWidgetsColumns(): int|array
    {
        return 2;
    }
}
