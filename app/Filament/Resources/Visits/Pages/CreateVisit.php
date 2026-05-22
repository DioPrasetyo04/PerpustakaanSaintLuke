<?php

namespace App\Filament\Resources\Visits\Pages;

use App\Filament\Resources\Visits\Concerns\InteractsWithVisitScan;
use App\Filament\Resources\Visits\VisitResource;
use App\Models\Visit;
use Filament\Notifications\Notification;
use Filament\Resources\Pages\CreateRecord;

class CreateVisit extends CreateRecord
{
    use InteractsWithVisitScan;

    protected static string $resource = VisitResource::class;

    protected function getHeaderActions(): array
    {
        return [
            $this->scanVisitAction(),
        ];
    }

    /**
     * Aturan 1 pengunjung 1x kunjungan per hari — hindari data ganda.
     * Pengguna terdaftar dicek via user_id, tamu via nama.
     */
    protected function beforeCreate(): void
    {
        $userId = filled($this->data['user_id'] ?? null) ? (int) $this->data['user_id'] : null;
        $name   = $this->data['name'] ?? null;

        if (Visit::recordedToday($userId, $name)) {
            Notification::make()
                ->warning()
                ->icon('heroicon-o-clock')
                ->title('Sudah Tercatat Hari Ini')
                ->body('Kunjungan untuk pengunjung ini sudah tercatat hari ini. Tidak perlu input ulang.')
                ->persistent()
                ->send();

            $this->halt();
        }
    }

    protected function mutateFormDataBeforeCreate(array $data): array
    {
        return VisitResource::normalizeVisitData($data);
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
