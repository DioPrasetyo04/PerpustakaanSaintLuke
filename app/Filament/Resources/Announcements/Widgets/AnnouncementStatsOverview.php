<?php

namespace App\Filament\Resources\Announcements\Widgets;

use App\Enums\Days;
use App\Models\Announcement;
use Filament\Widgets\StatsOverviewWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class AnnouncementStatsOverview extends StatsOverviewWidget
{
    protected ?string $heading = 'Statistik Pengumuman';

    protected ?string $description = 'Ringkasan jadwal dan pengumuman perpustakaan.';

    protected function getStats(): array
    {
        $totalDays = count(Days::cases());

        $total    = Announcement::query()->count();
        $active   = Announcement::query()->where('is_active', true)->count();
        $daysUsed = Announcement::query()->distinct('days')->count('days');

        return [
            Stat::make('Total Pengumuman', $total)
                ->description('Seluruh pengumuman terdaftar')
                ->descriptionIcon('heroicon-m-megaphone')
                ->color('info'),

            Stat::make('Pengumuman Aktif', $active)
                ->description('Sedang ditampilkan ke publik')
                ->descriptionIcon('heroicon-m-check-circle')
                ->color('success'),

            Stat::make('Hari Terisi', $daysUsed . ' / ' . $totalDays)
                ->description('Hari yang sudah memiliki jadwal')
                ->descriptionIcon('heroicon-m-calendar')
                ->color($daysUsed >= $totalDays ? 'success' : 'warning'),
        ];
    }
}
