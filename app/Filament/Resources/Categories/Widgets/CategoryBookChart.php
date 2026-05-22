<?php

namespace App\Filament\Resources\Categories\Widgets;

use App\Models\Category;
use Filament\Widgets\ChartWidget;

class CategoryBookChart extends ChartWidget
{
    protected ?string $heading = 'Jumlah Buku Per Kategori';

    protected ?string $description = 'Sepuluh kategori dengan koleksi buku terbanyak.';

    protected int|string|array $columnSpan = 'full';

    protected function getData(): array
    {
        $categories = Category::query()
            ->withCount('books')
            ->orderByDesc('books_count')
            ->limit(10)
            ->get();

        return [
            'datasets' => [
                [
                    'label' => 'Jumlah Buku',
                    'data' => $categories->pluck('books_count')->all(),
                    'backgroundColor' => 'rgba(59, 130, 246, 0.6)',
                    'borderColor' => 'rgba(59, 130, 246, 1)',
                    'borderWidth' => 1,
                ],
            ],
            'labels' => $categories->pluck('name')->all(),
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
