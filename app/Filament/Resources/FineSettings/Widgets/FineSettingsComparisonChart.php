<?php

namespace App\Filament\Resources\FineSettings\Widgets;

use App\Enums\DiscountType;
use App\Models\Book;
use App\Models\FineSettings;
use Filament\Widgets\ChartWidget;

class FineSettingsComparisonChart extends ChartWidget
{
    protected ?string $heading = 'Perbandingan Komponen Biaya';

    protected int|string|array $columnSpan = 'full';

    protected function getData(): array
    {
        $settings = FineSettings::query()->first();

        $lateFee   = (float) ($settings->late_fee_per_day ?? 0);
        $damageFee = (float) ($settings->damage_fee_book ?? 0);
        $lostFee   = (float) ($settings->lost_fee_book ?? 0);

        $damageIsPercent = $settings?->damage_discount_type === DiscountType::PERCENTAGE;
        $lostIsPercent   = $settings?->lost_discount_type === DiscountType::PERCENTAGE;

        // Harga rata-rata buku sebagai dasar konversi denda persentase ke Rupiah,
        // agar tiap komponen biaya bisa dibandingkan dalam satuan yang sama.
        $avgPrice = (float) (Book::query()->avg('price') ?? 0);

        $damageRp = $damageIsPercent ? $avgPrice * ($damageFee / 100) : $damageFee;
        $lostRp   = $lostIsPercent ? $avgPrice * ($lostFee / 100) : $lostFee;

        return [
            'datasets' => [
                [
                    'label' => 'Estimasi Biaya (Rp)',
                    'data' => [
                        round($lateFee, 2),
                        round($damageRp, 2),
                        round($lostRp, 2),
                    ],
                    'backgroundColor' => [
                        'rgba(234, 179, 8, 0.6)',
                        'rgba(249, 115, 22, 0.6)',
                        'rgba(239, 68, 68, 0.6)',
                    ],
                    'borderColor' => [
                        'rgba(234, 179, 8, 1)',
                        'rgba(249, 115, 22, 1)',
                        'rgba(239, 68, 68, 1)',
                    ],
                    'borderWidth' => 1,
                ],
            ],
            'labels' => [
                'Denda / Hari',
                'Buku Rusak' . ($damageIsPercent ? " ({$this->trimNumber($damageFee)}%)" : ''),
                'Buku Hilang' . ($lostIsPercent ? " ({$this->trimNumber($lostFee)}%)" : ''),
            ],
        ];
    }

    public function getDescription(): ?string
    {
        $avgPrice = (float) (Book::query()->avg('price') ?? 0);

        return 'Estimasi biaya denda dalam Rupiah. Komponen bertipe persentase dihitung dari '
            . 'harga rata-rata buku (Rp ' . number_format($avgPrice, 0, ',', '.') . ').';
    }

    private function trimNumber(float $value): string
    {
        return rtrim(rtrim(number_format($value, 2, ',', '.'), '0'), ',');
    }

    protected function getType(): string
    {
        return 'bar';
    }

    protected function getOptions(): array
    {
        return [
            'scales' => [
                'y' => [
                    'beginAtZero' => true,
                ],
            ],
            'plugins' => [
                'legend' => ['display' => false],
            ],
        ];
    }
}
