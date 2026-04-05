<?php

namespace App\Filament\Resources\Announcements\Pages;

use App\Filament\Resources\Announcements\AnnouncementResource;
use App\Models\Announcement;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListAnnouncements extends ListRecords
{
    protected static string $resource = AnnouncementResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make()
                ->visible(
                    fn() => !Announcement::query()
                        ->where('is_active', true)
                        ->withoutTrashed()
                        ->exists()
                ),
        ];
    }
}
