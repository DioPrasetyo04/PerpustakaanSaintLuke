<?php

namespace App\Filament\Resources\Books\Widgets;

use App\Models\Category;
use Filament\Widgets\ChartWidget;

class BooksByCategoryChart extends ChartWidget
{
    protected ?string $heading = 'Distribusi Buku Per Kategori';

    protected ?string $description = 'Sepuluh kategori dengan jumlah buku terbanyak.';

    protected int|string|array $columnSpan = 'full';

    protected function getData(): array
    {
        $categories = Category::query()
            ->withCount('books')
            ->orderByDesc('books_count')
            ->limit(10)
            ->get();

        $palette = [
            'rgba(59, 130, 246, 0.7)',
            'rgba(16, 185, 129, 0.7)',
            'rgba(249, 115, 22, 0.7)',
            'rgba(139, 92, 246, 0.7)',
            'rgba(236, 72, 153, 0.7)',
            'rgba(234, 179, 8, 0.7)',
            'rgba(20, 184, 166, 0.7)',
            'rgba(239, 68, 68, 0.7)',
            'rgba(99, 102, 241, 0.7)',
            'rgba(107, 114, 128, 0.7)',
        ];

        return [
            'datasets' => [
                [
                    'label' => 'Jumlah Buku',
                    'data' => $categories->pluck('books_count')->all(),
                    'backgroundColor' => array_slice($palette, 0, $categories->count()),
                    'borderColor' => 'rgba(255, 255, 255, 0.8)',
                    'borderWidth' => 2,
                ],
            ],
            'labels' => $categories->pluck('name')->all(),
        ];
    }

    protected function getType(): string
    {
        return 'doughnut';
    }

    protected function getOptions(): array
    {
        return [
            'plugins' => [
                'legend' => ['position' => 'right'],
            ],
        ];
    }
}
