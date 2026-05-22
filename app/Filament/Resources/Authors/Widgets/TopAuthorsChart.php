<?php

namespace App\Filament\Resources\Authors\Widgets;

use App\Models\Author;
use Filament\Widgets\ChartWidget;

class TopAuthorsChart extends ChartWidget
{
    protected ?string $heading = 'Penulis Paling Produktif';

    protected ?string $description = 'Sepuluh penulis dengan jumlah buku terbanyak.';

    protected int|string|array $columnSpan = 'full';

    protected function getData(): array
    {
        $authors = Author::query()
            ->withCount('books')
            ->orderByDesc('books_count')
            ->limit(10)
            ->get();

        return [
            'datasets' => [
                [
                    'label' => 'Jumlah Buku',
                    'data' => $authors->pluck('books_count')->all(),
                    'backgroundColor' => 'rgba(139, 92, 246, 0.6)',
                    'borderColor' => 'rgba(139, 92, 246, 1)',
                    'borderWidth' => 1,
                ],
            ],
            'labels' => $authors->pluck('name')->all(),
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
