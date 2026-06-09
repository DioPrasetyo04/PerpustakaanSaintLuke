<?php

namespace App\Filament\Resources\FineSettings\Pages;

use App\Filament\Resources\FineSettings\Concerns\ValidatesFinePercentages;
use App\Filament\Resources\FineSettings\FineSettingsResource;
use App\Models\FineSettings;
use Filament\Notifications\Notification;
use Filament\Resources\Pages\CreateRecord;

class CreateFineSettings extends CreateRecord
{
    use ValidatesFinePercentages;

    protected static string $resource = FineSettingsResource::class;

    protected function beforeCreate(): void
    {
        if (FineSettings::count() >= 1) {
            Notification::make()
                ->title('Pengaturan denda sudah ada')
                ->body('Hanya boleh ada 1 pengaturan denda. Silakan edit data yang sudah ada.')
                ->danger()
                ->send();

            $this->halt();
        }

        if ($error = $this->finePercentageError($this->data)) {
            Notification::make()
                ->title('Gagal menyimpan pengaturan denda')
                ->body($error)
                ->danger()
                ->persistent()
                ->send();

            $this->halt();
        }
    }

    protected function getCreatedNotification(): ?Notification
    {
        return Notification::make()
            ->title('Pengaturan denda berhasil dibuat')
            ->body('Pengaturan denda perpustakaan telah berhasil disimpan.')
            ->success();
    }

    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }
}
