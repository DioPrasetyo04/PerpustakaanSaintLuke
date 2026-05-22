<?php

namespace App\Filament\Resources\Fines\Widgets;

use App\Enums\PaymentStatus;
use App\Models\Fine;
use Carbon\Carbon;
use Filament\Widgets\StatsOverviewWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class FineStatsOverview extends StatsOverviewWidget
{
    protected ?string $heading = 'Statistik Denda';

    protected ?string $description = 'Ringkasan denda dan pendapatan perpustakaan.';

    protected function getStats(): array
    {
        $totalRevenue = (float) Fine::query()
            ->where('payment_status', PaymentStatus::SUCCESS->value)
            ->sum('total_fee');

        $paidCount = Fine::query()
            ->where('payment_status', PaymentStatus::SUCCESS->value)
            ->count();

        $unpaidCount = Fine::query()
            ->whereIn('payment_status', [
                PaymentStatus::PENDING->value,
                PaymentStatus::FAILED->value,
                PaymentStatus::ERROR->value,
            ])
            ->count();

        return [
            Stat::make('Total Pendapatan Denda', 'Rp ' . number_format($totalRevenue, 0, ',', '.'))
                ->description('Akumulasi denda yang sudah lunas')
                ->descriptionIcon('heroicon-m-banknotes')
                ->chart($this->last7DaysRevenue())
                ->color('success'),

            Stat::make('Denda Lunas', $paidCount)
                ->description('Transaksi berhasil')
                ->descriptionIcon('heroicon-m-check-circle')
                ->color('primary'),

            Stat::make('Belum Dibayar', $unpaidCount)
                ->description('Pending / gagal / bermasalah')
                ->descriptionIcon('heroicon-m-exclamation-triangle')
                ->color($unpaidCount > 0 ? 'danger' : 'gray'),
        ];
    }

    private function last7DaysRevenue(): array
    {
        $data = [];

        for ($i = 6; $i >= 0; $i--) {
            $day = Carbon::now()->subDays($i)->toDateString();
            $data[] = (float) Fine::query()
                ->where('payment_status', PaymentStatus::SUCCESS->value)
                ->whereDate('fine_date', $day)
                ->sum('total_fee');
        }

        return $data;
    }
}
