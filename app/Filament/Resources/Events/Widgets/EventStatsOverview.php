<?php

namespace App\Filament\Resources\Events\Widgets;

use App\Models\Event;
use Filament\Widgets\StatsOverviewWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class EventStatsOverview extends StatsOverviewWidget
{
    protected ?string $heading = 'Statistik Acara';

    protected ?string $description = 'Ringkasan agenda kegiatan perpustakaan.';

    protected function getStats(): array
    {
        $total = Event::query()->count();
        $active = Event::query()->where('is_active', true)->count();
        $upcoming = Event::query()->where('is_active', true)->where('start_at', '>=', now())->count();

        return [
            Stat::make('Total Acara', $total)
                ->description('Seluruh acara terdaftar')
                ->descriptionIcon('heroicon-m-calendar-days')
                ->color('info'),

            Stat::make('Acara Mendatang', $upcoming)
                ->description('Belum berlangsung & aktif')
                ->descriptionIcon('heroicon-m-clock')
                ->color('success'),

            Stat::make('Tersembunyi', $total - $active)
                ->description('Tidak ditampilkan')
                ->descriptionIcon('heroicon-m-eye-slash')
                ->color('warning'),
        ];
    }
}
