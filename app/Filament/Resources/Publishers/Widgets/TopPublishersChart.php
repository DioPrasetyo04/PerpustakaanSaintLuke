<?php

namespace App\Filament\Resources\Publishers\Widgets;

use App\Models\Publisher;
use Filament\Widgets\ChartWidget;

class TopPublishersChart extends ChartWidget
{
    protected ?string $heading = 'Penerbit dengan Buku Terbanyak';

    protected ?string $description = 'Sepuluh penerbit dengan koleksi buku terbanyak.';

    protected int|string|array $columnSpan = 'full';

    protected function getData(): array
    {
        $publishers = Publisher::query()
            ->withCount('books')
            ->orderByDesc('books_count')
            ->limit(10)
            ->get();

        return [
            'datasets' => [
                [
                    'label' => 'Jumlah Buku',
                    'data' => $publishers->pluck('books_count')->all(),
                    'backgroundColor' => 'rgba(20, 184, 166, 0.6)',
                    'borderColor' => 'rgba(20, 184, 166, 1)',
                    'borderWidth' => 1,
                ],
            ],
            'labels' => $publishers->pluck('name')->all(),
        ];
    }

    protected function getType(): string
    {
        return 'bar';
    }

    protected function getOptions(): array
    {
        return [
            'indexAxis' => 'y',
            'scales' => [
                'x' => [
                    'beginAtZero' => true,
                    'ticks' => [
                        'stepSize' => 1,
                        'precision' => 0,
                    ],
                ],
            ],
            'plugins' => [
                'legend' => ['display' => false],
            ],
        ];
    }
}
