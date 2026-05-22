<?php

namespace App\Filament\Resources\Publishers\Pages;

use App\Filament\Resources\Publishers\PublishersResource;
use App\Filament\Resources\Publishers\Widgets\PublisherStatsOverview;
use App\Filament\Resources\Publishers\Widgets\TopPublishersChart;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListPublishers extends ListRecords
{
    protected static string $resource = PublishersResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }

    protected function getHeaderWidgets(): array
    {
        return [
            PublisherStatsOverview::class,
            TopPublishersChart::class,
        ];
    }

    public function getHeaderWidgetsColumns(): int|array
    {
        return 2;
    }
}
