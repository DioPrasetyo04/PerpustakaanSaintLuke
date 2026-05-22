<?php

namespace App\Filament\Resources\ReturnBooks\Widgets;

use App\Models\ReturnBook;
use Carbon\Carbon;
use Filament\Widgets\StatsOverviewWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class ReturnBookStatsOverview extends StatsOverviewWidget
{
    protected ?string $heading = 'Statistik Pengembalian';

    protected ?string $description = 'Ringkasan aktivitas pengembalian buku.';

    protected function getStats(): array
    {
        $now           = Carbon::now();
        $startOfWeek   = $now->copy()->startOfWeek();
        $endOfWeek     = $now->copy()->endOfWeek();
        $startLastWk   = $now->copy()->subWeek()->startOfWeek();
        $endLastWk     = $now->copy()->subWeek()->endOfWeek();
        $startOfMonth  = $now->copy()->startOfMonth();
        $endOfMonth    = $now->copy()->endOfMonth();

        $today     = ReturnBook::query()->whereDate('return_date', $now->toDateString())->count();
        $thisWeek  = ReturnBook::query()->whereBetween('return_date', [$startOfWeek, $endOfWeek])->count();
        $lastWeek  = ReturnBook::query()->whereBetween('return_date', [$startLastWk, $endLastWk])->count();
        $thisMonth = ReturnBook::query()->whereBetween('return_date', [$startOfMonth, $endOfMonth])->count();

        $diff  = $thisWeek - $lastWeek;
        $trend = $diff === 0 ? 'flat' : ($diff > 0 ? 'up' : 'down');

        return [
            Stat::make('Pengembalian Hari Ini', $today)
                ->description($now->translatedFormat('l, d M Y'))
                ->descriptionIcon('heroicon-m-calendar-days')
                ->color('info'),

            Stat::make('Pengembalian Minggu Ini', $thisWeek)
                ->description(($diff >= 0 ? '+' : '') . $diff . ' dibanding minggu lalu')
                ->descriptionIcon($trend === 'up' ? 'heroicon-m-arrow-trending-up' : ($trend === 'down' ? 'heroicon-m-arrow-trending-down' : 'heroicon-m-minus'))
                ->chart($this->weeklyChartData())
                ->color($trend === 'up' ? 'success' : ($trend === 'down' ? 'danger' : 'gray')),

            Stat::make('Pengembalian Bulan Ini', $thisMonth)
                ->description($now->translatedFormat('F Y'))
                ->descriptionIcon('heroicon-m-arrow-uturn-left')
                ->color('primary'),
        ];
    }

    private function weeklyChartData(): array
    {
        $start = Carbon::now()->startOfWeek();
        $data  = [];

        for ($i = 0; $i < 7; $i++) {
            $day = $start->copy()->addDays($i);
            $data[] = ReturnBook::query()->whereDate('return_date', $day->toDateString())->count();
        }

        return $data;
    }
}
