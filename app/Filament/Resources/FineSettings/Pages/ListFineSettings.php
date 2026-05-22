<?php

namespace App\Filament\Resources\FineSettings\Pages;

use App\Filament\Resources\FineSettings\FineSettingsResource;
use App\Filament\Resources\FineSettings\Widgets\FineSettingsComparisonChart;
use App\Filament\Resources\FineSettings\Widgets\FineSettingsStatsOverview;
use App\Models\FineSettings;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListFineSettings extends ListRecords
{
    protected static string $resource = FineSettingsResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make()
                ->visible(fn() => FineSettings::count() === 0),
        ];
    }

    protected function getHeaderWidgets(): array
    {
        return [
            FineSettingsStatsOverview::class,
            FineSettingsComparisonChart::class,
        ];
    }

    public function getHeaderWidgetsColumns(): int|array
    {
        return 2;
    }
}
