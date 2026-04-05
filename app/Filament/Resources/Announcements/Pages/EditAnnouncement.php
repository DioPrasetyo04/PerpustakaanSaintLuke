<?php

namespace App\Filament\Resources\Announcements\Pages;

use App\Filament\Resources\Announcements\AnnouncementResource;
use App\Models\Announcement;
use Filament\Actions\DeleteAction;
use Filament\Notifications\Notification;
use Filament\Resources\Pages\EditRecord;

class EditAnnouncement extends EditRecord
{
    protected static string $resource = AnnouncementResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }

    protected function mutateFormDataBeforeSave(array $data): array
    {
        if ($data['is_active'] ?? false) {

            $exists = Announcement::query()
                ->where('is_active', true)
                ->whereNull('deleted_at')
                ->whereKeyNot($this->record->id)
                ->exists();

            if ($exists) {
                Notification::make()
                    ->title('Another active announcement exists')
                    ->body('Only one announcement can be active.')
                    ->danger()
                    ->send();

                $this->halt();
            }
        }

        return $data;
    }
}
