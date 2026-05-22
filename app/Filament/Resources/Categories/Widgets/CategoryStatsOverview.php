<?php

namespace App\Filament\Resources\Categories\Widgets;

use App\Models\Category;
use Filament\Widgets\StatsOverviewWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class CategoryStatsOverview extends StatsOverviewWidget
{
    protected ?string $heading = 'Statistik Kategori';

    protected ?string $description = 'Ringkasan kategori buku perpustakaan.';

    protected function getStats(): array
    {
        $total    = Category::query()->count();
        $active   = Category::query()->where('is_active', true)->count();
        $withBook = Category::query()->whereHas('books')->count();

        $activePercent = $total > 0 ? round($active / $total * 100) : 0;

        return [
            Stat::make('Total Kategori', $total)
                ->description('Seluruh kategori terdaftar')
                ->descriptionIcon('heroicon-m-tag')
                ->color('info'),

            Stat::make('Kategori Aktif', $active)
                ->description($activePercent . '% dari total kategori')
                ->descriptionIcon('heroicon-m-check-circle')
                ->color('success'),

            Stat::make('Kategori Berisi Buku', $withBook)
                ->description('Kategori yang sudah memiliki buku')
                ->descriptionIcon('heroicon-m-book-open')
                ->color('primary'),
        ];
    }
}
