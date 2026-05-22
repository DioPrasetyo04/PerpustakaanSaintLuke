<?php

namespace App\Filament\Resources\Information\Widgets;

use App\Models\Information;
use Carbon\Carbon;
use Filament\Widgets\StatsOverviewWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class InformationStatsOverview extends StatsOverviewWidget
{
    protected ?string $heading = 'Statistik Informasi';

    protected ?string $description = 'Ringkasan konten informasi perpustakaan.';

    protected function getStats(): array
    {
        $now          = Carbon::now();
        $startOfMonth = $now->copy()->startOfMonth();
        $endOfMonth   = $now->copy()->endOfMonth();

        $total      = Information::query()->count();
        $categories = Information::query()->whereNotNull('category_id')->distinct('category_id')->count('category_id');
        $thisMonth  = Information::query()->whereBetween('created_at', [$startOfMonth, $endOfMonth])->count();

        return [
            Stat::make('Total Informasi', $total)
                ->description('Seluruh konten informasi')
                ->descriptionIcon('heroicon-m-information-circle')
                ->color('info'),

            Stat::make('Kategori Terpakai', $categories)
                ->description('Kategori yang memiliki informasi')
                ->descriptionIcon('heroicon-m-tag')
                ->color('primary'),

            Stat::make('Informasi Baru Bulan Ini', $thisMonth)
                ->description($now->translatedFormat('F Y'))
                ->descriptionIcon('heroicon-m-document-plus')
                ->chart($this->last7DaysChart())
                ->color('success'),
        ];
    }

    private function last7DaysChart(): array
    {
        $data = [];

        for ($i = 6; $i >= 0; $i--) {
            $day = Carbon::now()->subDays($i)->toDateString();
            $data[] = Information::query()->whereDate('created_at', $day)->count();
        }

        return $data;
    }
}
