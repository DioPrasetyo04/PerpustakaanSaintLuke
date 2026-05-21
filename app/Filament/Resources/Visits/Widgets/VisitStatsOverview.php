<?php

namespace App\Filament\Resources\Visits\Widgets;

use App\Models\Visit;
use Carbon\Carbon;
use Filament\Widgets\StatsOverviewWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class VisitStatsOverview extends StatsOverviewWidget
{
    protected ?string $heading = 'Statistik Kunjungan';

    protected ?string $description = 'Ringkasan jumlah kunjungan perpustakaan.';

    protected function getStats(): array
    {
        $now            = Carbon::now();
        $startOfWeek    = $now->copy()->startOfWeek();
        $endOfWeek      = $now->copy()->endOfWeek();
        $startOfLastWk  = $now->copy()->subWeek()->startOfWeek();
        $endOfLastWk    = $now->copy()->subWeek()->endOfWeek();

        $thisWeek = Visit::query()->whereBetween('visit_date', [$startOfWeek, $endOfWeek])->count();
        $lastWeek = Visit::query()->whereBetween('visit_date', [$startOfLastWk, $endOfLastWk])->count();
        $today    = Visit::query()->whereDate('visit_date', $now->toDateString())->count();
        $thisMonth = Visit::query()
            ->whereBetween('visit_date', [$now->copy()->startOfMonth(), $now->copy()->endOfMonth()])
            ->count();

        $weeklyChart = $this->weeklyChartData();

        $diff = $thisWeek - $lastWeek;
        $trend = $diff === 0 ? 'flat' : ($diff > 0 ? 'up' : 'down');

        return [
            Stat::make('Kunjungan Hari Ini', $today)
                ->description($now->translatedFormat('l, d M Y'))
                ->descriptionIcon('heroicon-m-calendar-days')
                ->color('info'),

            Stat::make('Kunjungan Minggu Ini', $thisWeek)
                ->description(($diff >= 0 ? '+' : '') . $diff . ' dibanding minggu lalu')
                ->descriptionIcon($trend === 'up' ? 'heroicon-m-arrow-trending-up' : ($trend === 'down' ? 'heroicon-m-arrow-trending-down' : 'heroicon-m-minus'))
                ->chart($weeklyChart)
                ->color($trend === 'up' ? 'success' : ($trend === 'down' ? 'danger' : 'gray')),

            Stat::make('Kunjungan Bulan Ini', $thisMonth)
                ->description($now->translatedFormat('F Y'))
                ->descriptionIcon('heroicon-m-chart-bar')
                ->color('primary'),
        ];
    }

    private function weeklyChartData(): array
    {
        $start = Carbon::now()->startOfWeek();
        $data  = [];

        for ($i = 0; $i < 7; $i++) {
            $day = $start->copy()->addDays($i);
            $data[] = Visit::query()->whereDate('visit_date', $day->toDateString())->count();
        }

        return $data;
    }
}
