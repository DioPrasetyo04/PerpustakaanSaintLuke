<?php

namespace App\Filament\Resources\Publishers\Widgets;

use App\Models\Publisher;
use Filament\Widgets\StatsOverviewWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class PublisherStatsOverview extends StatsOverviewWidget
{
    protected ?string $heading = 'Statistik Penerbit';

    protected ?string $description = 'Ringkasan data penerbit buku.';

    protected function getStats(): array
    {
        $total    = Publisher::query()->count();
        $active   = Publisher::query()->where('is_active', true)->count();
        $withBook = Publisher::query()->whereHas('books')->count();

        $activePercent = $total > 0 ? round($active / $total * 100) : 0;

        return [
            Stat::make('Total Penerbit', $total)
                ->description('Seluruh penerbit terdaftar')
                ->descriptionIcon('heroicon-m-building-office-2')
                ->color('info'),

            Stat::make('Penerbit Aktif', $active)
                ->description($activePercent . '% dari total penerbit')
                ->descriptionIcon('heroicon-m-check-circle')
                ->color('success'),

            Stat::make('Penerbit Berkontribusi', $withBook)
                ->description('Penerbit yang sudah memiliki buku')
                ->descriptionIcon('heroicon-m-book-open')
                ->color('primary'),
        ];
    }
}
