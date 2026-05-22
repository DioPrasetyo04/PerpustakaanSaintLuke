<?php

namespace App\Filament\Resources\FineSettings\Widgets;

use App\Models\FineSettings;
use Filament\Widgets\ChartWidget;

class FineSettingsComparisonChart extends ChartWidget
{
    protected ?string $heading = 'Perbandingan Komponen Biaya';

    protected ?string $description = 'Besaran tiap komponen biaya denda (dalam Rupiah).';

    protected int|string|array $columnSpan = 'full';

    protected function getData(): array
    {
        $settings = FineSettings::query()->first();

        $lateFee   = (float) ($settings->late_fee_per_day ?? 0);
        $damageFee = (float) ($settings->damage_fee_book ?? 0);
        $lostFee   = (float) ($settings->lost_fee_book ?? 0);

        return [
            'datasets' => [
                [
                    'label' => 'Biaya (Rp)',
                    'data' => [$lateFee, $damageFee, $lostFee],
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
            'labels' => ['Denda / Hari', 'Buku Rusak', 'Buku Hilang'],
        ];
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
