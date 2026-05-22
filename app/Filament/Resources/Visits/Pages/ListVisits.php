<?php

namespace App\Filament\Resources\Visits\Pages;

use App\Filament\Resources\Visits\Concerns\InteractsWithVisitScan;
use App\Filament\Resources\Visits\VisitResource;
use App\Filament\Resources\Visits\Widgets\VisitStatsOverview;
use App\Filament\Resources\Visits\Widgets\VisitWeeklyChart;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListVisits extends ListRecords
{
    use InteractsWithVisitScan;

    protected static string $resource = VisitResource::class;

    protected function getHeaderActions(): array
    {
        return [
            $this->scanVisitAction(),
            CreateAction::make()->label('Tambah Kunjungan'),
        ];
    }

    protected function getHeaderWidgets(): array
    {
        return [
            VisitStatsOverview::class,
            VisitWeeklyChart::class,
        ];
    }

    public function getHeaderWidgetsColumns(): int|array
    {
        return 2;
    }
}
