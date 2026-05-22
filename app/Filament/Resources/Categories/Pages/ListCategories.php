<?php

namespace App\Filament\Resources\Categories\Pages;

use App\Filament\Resources\Categories\CategoriesResource;
use App\Filament\Resources\Categories\Widgets\CategoryBookChart;
use App\Filament\Resources\Categories\Widgets\CategoryStatsOverview;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListCategories extends ListRecords
{
    protected static string $resource = CategoriesResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }

    protected function getHeaderWidgets(): array
    {
        return [
            CategoryStatsOverview::class,
            CategoryBookChart::class,
        ];
    }

    public function getHeaderWidgetsColumns(): int|array
    {
        return 2;
    }
}
