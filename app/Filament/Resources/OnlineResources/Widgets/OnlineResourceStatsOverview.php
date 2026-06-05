<?php

namespace App\Filament\Resources\OnlineResources\Widgets;

use App\Models\OnlineResource;
use Filament\Widgets\StatsOverviewWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class OnlineResourceStatsOverview extends StatsOverviewWidget
{
    protected ?string $heading = 'Statistik Sumber Daring';

    protected ?string $description = 'Ringkasan sumber bacaan daring eksternal.';

    protected function getStats(): array
    {
        $total = OnlineResource::query()->count();
        $active = OnlineResource::query()->where('is_active', true)->count();
        $types = OnlineResource::query()->distinct('type')->count('type');

        return [
            Stat::make('Total Sumber', $total)
                ->description('Seluruh sumber terdaftar')
                ->descriptionIcon('heroicon-m-globe-alt')
                ->color('info'),

            Stat::make('Sumber Aktif', $active)
                ->description('Tampil di halaman publik')
                ->descriptionIcon('heroicon-m-check-circle')
                ->color('success'),

            Stat::make('Ragam Tipe', $types)
                ->description('Jenis sumber berbeda')
                ->descriptionIcon('heroicon-m-rectangle-stack')
                ->color('primary'),
        ];
    }
}
