<?php

namespace App\Filament\Resources\Authors\Pages;

use App\Filament\Resources\Authors\AuthorResource;
use App\Filament\Resources\Authors\Widgets\AuthorStatsOverview;
use App\Filament\Resources\Authors\Widgets\TopAuthorsChart;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListAuthors extends ListRecords
{
    protected static string $resource = AuthorResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }

    protected function getHeaderWidgets(): array
    {
        return [
            AuthorStatsOverview::class,
            TopAuthorsChart::class,
        ];
    }

    public function getHeaderWidgetsColumns(): int|array
    {
        return 2;
    }
}
