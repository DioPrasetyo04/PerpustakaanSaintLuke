<?php

namespace App\Filament\Resources\FineSettings\Widgets;

use App\Enums\DiscountType;
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
        $damageFee = (float) ($settings->damage_fee_book ?? 0);
        $lostFee   = (float) ($settings->lost_fee_book ?? 0);

        $damageIsPercent = $settings?->damage_discount_type === DiscountType::PERCENTAGE;
        $lostIsPercent   = $settings?->lost_discount_type === DiscountType::PERCENTAGE;

        return [
            Stat::make('Denda Keterlambatan / Hari', 'Rp ' . number_format($lateFee, 0, ',', '.'))
                ->description('Dikenakan untuk tiap hari terlambat')
                ->descriptionIcon('heroicon-m-clock')
                ->color('warning'),

            Stat::make('Durasi Peminjaman', $duration . ' hari')
                ->description('Batas waktu peminjaman buku')
                ->descriptionIcon('heroicon-m-calendar-days')
                ->color('info'),

            Stat::make('Biaya Buku Rusak', self::formatFee($damageFee, $damageIsPercent))
                ->description($damageIsPercent ? 'Persentase dari harga buku' : 'Nominal tetap penggantian')
                ->descriptionIcon($damageIsPercent ? 'heroicon-m-receipt-percent' : 'heroicon-m-banknotes')
                ->color('warning'),

            Stat::make('Biaya Buku Hilang', self::formatFee($lostFee, $lostIsPercent))
                ->description($lostIsPercent ? 'Persentase dari harga buku' : 'Nominal tetap penggantian')
                ->descriptionIcon($lostIsPercent ? 'heroicon-m-receipt-percent' : 'heroicon-m-exclamation-triangle')
                ->color('danger'),
        ];
    }

    /** Format nilai denda sesuai tipe: persentase (%) atau nilai tetap (Rp). */
    private static function formatFee(float $value, bool $isPercent): string
    {
        return $isPercent
            ? rtrim(rtrim(number_format($value, 2, ',', '.'), '0'), ',') . '%'
            : 'Rp ' . number_format($value, 0, ',', '.');
    }
}
