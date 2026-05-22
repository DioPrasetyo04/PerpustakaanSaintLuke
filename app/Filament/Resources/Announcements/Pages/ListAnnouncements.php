<?php

namespace App\Filament\Resources\Announcements\Pages;

use App\Filament\Resources\Announcements\AnnouncementResource;
use App\Filament\Resources\Announcements\Widgets\AnnouncementStatsOverview;
use App\Filament\Resources\Announcements\Widgets\AnnouncementStatusChart;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListAnnouncements extends ListRecords
{
    protected static string $resource = AnnouncementResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make()
                ->visible(fn() => AnnouncementResource::canCreate()),
        ];
    }

    protected function getHeaderWidgets(): array
    {
        return [
            AnnouncementStatsOverview::class,
            AnnouncementStatusChart::class,
        ];
    }

    public function getHeaderWidgetsColumns(): int|array
    {
        return 2;
    }
}
