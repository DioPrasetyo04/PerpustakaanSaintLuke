<?php

namespace App\Filament\Resources\LocationOfBooks\Widgets;

use App\Models\LocationOfBook;
use Filament\Widgets\ChartWidget;
use Illuminate\Support\Facades\DB;

class LocationOfBookChart extends ChartWidget
{
    protected ?string $heading = 'Distribusi Buku per Lokasi Rak';

    protected ?string $description = 'Jumlah buku yang tersimpan di setiap lokasi rak.';

    protected int|string|array $columnSpan = 'full';

    protected function getData(): array
    {
        // Eager-load: ambil lokasi yang memiliki buku beserta jumlahnya
        $data = LocationOfBook::query()
            ->with('book')                      // eager load relasi book
            ->whereNotNull('book_id')
            ->select('location', DB::raw('COUNT(*) as total'))
            ->groupBy('location')
            ->orderByDesc('total')
            ->limit(15)
            ->get();

        // Warna palet yang beragam untuk setiap bar
        $palette = [
            'rgba(99, 102, 241, 0.75)',
            'rgba(16, 185, 129, 0.75)',
            'rgba(245, 158, 11, 0.75)',
            'rgba(239, 68, 68, 0.75)',
            'rgba(59, 130, 246, 0.75)',
            'rgba(168, 85, 247, 0.75)',
            'rgba(236, 72, 153, 0.75)',
            'rgba(20, 184, 166, 0.75)',
            'rgba(251, 146, 60, 0.75)',
            'rgba(34, 197, 94, 0.75)',
            'rgba(248, 113, 113, 0.75)',
            'rgba(129, 140, 248, 0.75)',
            'rgba(52, 211, 153, 0.75)',
            'rgba(251, 191, 36, 0.75)',
            'rgba(167, 243, 208, 0.75)',
        ];

        $colors = collect($data)->keys()->map(fn ($i) => $palette[$i % count($palette)])->toArray();

        return [
            'datasets' => [
                [
                    'label'           => 'Jumlah Buku',
                    'data'            => $data->pluck('total')->toArray(),
                    'backgroundColor' => $colors,
                    'borderColor'     => str_replace('0.75', '1', $colors),
                    'borderWidth'     => 1,
                    'borderRadius'    => 6,
                ],
            ],
            'labels' => $data->pluck('location')->toArray(),
        ];
    }

    protected function getType(): string
    {
        return 'bar';
    }

    protected function getOptions(): array
    {
        return [
            'indexAxis' => 'y',      // horizontal bar → mudah dibaca nama rak panjang
            'responsive' => true,
            'plugins' => [
                'legend' => [
                    'display' => false,
                ],
                'tooltip' => [
                    'callbacks' => [
                        'label' => \Filament\Support\RawJs::make(<<<'JS'
                            function(context) {
                                return ' ' + context.raw + ' buku di ' + context.label;
                            }
                        JS),
                    ],
                ],
            ],
            'scales' => [
                'x' => [
                    'beginAtZero' => true,
                    'ticks' => [
                        'stepSize' => 1,
                        'precision' => 0,
                    ],
                    'grid' => [
                        'color' => 'rgba(0,0,0,0.05)',
                    ],
                ],
                'y' => [
                    'grid' => [
                        'display' => false,
                    ],
                ],
            ],
        ];
    }
}
