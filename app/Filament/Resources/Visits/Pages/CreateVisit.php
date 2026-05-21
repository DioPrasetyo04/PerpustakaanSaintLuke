<?php

namespace App\Filament\Resources\Visits\Pages;

use App\Filament\Resources\Visits\VisitResource;
use App\Models\User;
use Filament\Notifications\Notification;
use Filament\Resources\Pages\CreateRecord;

class CreateVisit extends CreateRecord
{
    protected static string $resource = VisitResource::class;

    protected function mutateFormDataBeforeCreate(array $data): array
    {
        if (! empty($data['user_id'])) {
            $user = User::query()->find($data['user_id']);
            if ($user) {
                $data['type'] = $user->type;
                $data['type_other'] = $user->type_other;
            }
        }

        return $data;
    }

    protected function getCreatedNotification(): ?Notification
    {
        return Notification::make()
            ->icon('heroicon-s-check-circle')
            ->color('success')
            ->title('Berhasil')
            ->body('Data kunjungan berhasil disimpan.');
    }
}
