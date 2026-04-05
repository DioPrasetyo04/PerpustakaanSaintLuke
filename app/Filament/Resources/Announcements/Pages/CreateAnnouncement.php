<?php

namespace App\Filament\Resources\Announcements\Pages;

use App\Filament\Resources\Announcements\AnnouncementResource;
use App\Models\Announcement;
use Filament\Notifications\Notification;
use Filament\Resources\Pages\CreateRecord;

class CreateAnnouncement extends CreateRecord
{
    protected static string $resource = AnnouncementResource::class;

    protected function mutateFormDataBeforeCreate(array $data): array
    {
        $exists = Announcement::query()
            ->where('is_active', true)
            ->whereNull('deleted_at')
            ->exists();

        if ($exists) {
            Notification::make()
                ->title('Active announcement already exists')
                ->danger()
                ->send();

            $this->halt();
        }

        return $data;
    }
}
