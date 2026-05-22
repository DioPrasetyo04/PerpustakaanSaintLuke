<?php

namespace App\Filament\Resources\FineSettings\Widgets;

use App\Models\FineSettings;
use Filament\Widgets\StatsOverviewWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class FineSettingsStatsOverview extends StatsOverviewWidget
{
    protected ?string $heading = 'Ringkasan Pengaturan Denda';

    protected ?string $description = 'Konfigurasi denda dan durasi peminjaman yang berlaku.';

    protected function getStats(): array
    {
        $settings = FineSettings::query()->first();

        $lateFee   = (float) ($settings->late_fee_per_day ?? 0);
        $duration  = (int) ($settings->loan_duration_days ?? 0);
        $lostFee   = (float) ($settings->lost_fee_book ?? 0);

        return [
            Stat::make('Denda Keterlambatan / Hari', 'Rp ' . number_format($lateFee, 0, ',', '.'))
                ->description('Dikenakan untuk tiap hari terlambat')
                ->descriptionIcon('heroicon-m-clock')
                ->color('warning'),

            Stat::make('Durasi Peminjaman', $duration . ' hari')
                ->description('Batas waktu peminjaman buku')
                ->descriptionIcon('heroicon-m-calendar-days')
                ->color('info'),

            Stat::make('Biaya Buku Hilang', 'Rp ' . number_format($lostFee, 0, ',', '.'))
                ->description('Beban penggantian buku hilang')
                ->descriptionIcon('heroicon-m-exclamation-triangle')
                ->color('danger'),
        ];
    }
}
