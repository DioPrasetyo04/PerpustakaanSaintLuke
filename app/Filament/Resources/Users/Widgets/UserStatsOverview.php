<?php

namespace App\Filament\Resources\Users\Widgets;

use App\Models\User;
use Carbon\Carbon;
use Filament\Widgets\StatsOverviewWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class UserStatsOverview extends StatsOverviewWidget
{
    protected ?string $heading = 'Statistik Anggota';

    protected ?string $description = 'Ringkasan jumlah dan pertumbuhan anggota perpustakaan.';

    protected function getStats(): array
    {
        $now           = Carbon::now();
        $startOfMonth  = $now->copy()->startOfMonth();
        $endOfMonth    = $now->copy()->endOfMonth();
        $startLastWk   = $now->copy()->subMonth()->startOfMonth();
        $endLastMonth  = $now->copy()->subMonth()->endOfMonth();

        $total      = User::query()->count();
        $thisMonth  = User::query()->whereBetween('created_at', [$startOfMonth, $endOfMonth])->count();
        $lastMonth  = User::query()->whereBetween('created_at', [$startLastWk, $endLastMonth])->count();
        $withCard   = User::query()->whereNotNull('member_card_issued_at')->count();

        $diff  = $thisMonth - $lastMonth;
        $trend = $diff === 0 ? 'flat' : ($diff > 0 ? 'up' : 'down');

        $cardPercent = $total > 0 ? round($withCard / $total * 100) : 0;

        return [
            Stat::make('Total Anggota', $total)
                ->description('Seluruh anggota terdaftar')
                ->descriptionIcon('heroicon-m-users')
                ->color('info'),

            Stat::make('Anggota Baru Bulan Ini', $thisMonth)
                ->description(($diff >= 0 ? '+' : '') . $diff . ' dibanding bulan lalu')
                ->descriptionIcon($trend === 'up' ? 'heroicon-m-arrow-trending-up' : ($trend === 'down' ? 'heroicon-m-arrow-trending-down' : 'heroicon-m-minus'))
                ->chart($this->last7DaysChart())
                ->color($trend === 'up' ? 'success' : ($trend === 'down' ? 'danger' : 'gray')),

            Stat::make('Sudah Punya Kartu Anggota', $withCard)
                ->description($cardPercent . '% dari total anggota')
                ->descriptionIcon('heroicon-m-identification')
                ->color('primary'),
        ];
    }

    private function last7DaysChart(): array
    {
        $data = [];

        for ($i = 6; $i >= 0; $i--) {
            $day = Carbon::now()->subDays($i)->toDateString();
            $data[] = User::query()->whereDate('created_at', $day)->count();
        }

        return $data;
    }
}