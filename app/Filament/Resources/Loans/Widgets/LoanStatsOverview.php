<?php

namespace App\Filament\Resources\Loans\Widgets;

use App\Enums\LoanStatus;
use App\Models\Loan;
use Carbon\Carbon;
use Filament\Widgets\StatsOverviewWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class LoanStatsOverview extends StatsOverviewWidget
{
    protected ?string $heading = 'Statistik Peminjaman';

    protected ?string $description = 'Ringkasan aktivitas peminjaman buku.';

    protected function getStats(): array
    {
        $now          = Carbon::now();
        $startOfMonth = $now->copy()->startOfMonth();
        $endOfMonth   = $now->copy()->endOfMonth();
        $startLast    = $now->copy()->subMonth()->startOfMonth();
        $endLast      = $now->copy()->subMonth()->endOfMonth();

        $today     = Loan::query()->whereDate('created_at', $now->toDateString())->count();
        $active    = Loan::query()->whereIn('status', [
            LoanStatus::LOANED->value,
            LoanStatus::PARTIAL_RETURNED->value,
        ])->count();
        $thisMonth = Loan::query()->whereBetween('created_at', [$startOfMonth, $endOfMonth])->count();
        $lastMonth = Loan::query()->whereBetween('created_at', [$startLast, $endLast])->count();

        $diff  = $thisMonth - $lastMonth;
        $trend = $diff === 0 ? 'flat' : ($diff > 0 ? 'up' : 'down');

        return [
            Stat::make('Peminjaman Hari Ini', $today)
                ->description($now->translatedFormat('l, d M Y'))
                ->descriptionIcon('heroicon-m-calendar-days')
                ->color('info'),

            Stat::make('Peminjaman Aktif', $active)
                ->description('Belum dikembalikan sepenuhnya')
                ->descriptionIcon('heroicon-m-arrow-path')
                ->chart($this->last7DaysChart())
                ->color('warning'),

            Stat::make('Peminjaman Bulan Ini', $thisMonth)
                ->description(($diff >= 0 ? '+' : '') . $diff . ' dibanding bulan lalu')
                ->descriptionIcon($trend === 'up' ? 'heroicon-m-arrow-trending-up' : ($trend === 'down' ? 'heroicon-m-arrow-trending-down' : 'heroicon-m-minus'))
                ->color($trend === 'up' ? 'success' : ($trend === 'down' ? 'danger' : 'gray')),
        ];
    }

    private function last7DaysChart(): array
    {
        $data = [];

        for ($i = 6; $i >= 0; $i--) {
            $day = Carbon::now()->subDays($i)->toDateString();
            $data[] = Loan::query()->whereDate('created_at', $day)->count();
        }

        return $data;
    }
}
