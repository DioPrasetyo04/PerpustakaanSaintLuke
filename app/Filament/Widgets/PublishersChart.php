<?php

namespace App\Filament\Widgets;

use App\Models\Publisher;
use Filament\Widgets\ChartWidget;
use Filament\Widgets\ChartWidget\Concerns\HasFiltersSchema;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\Select;
use Filament\Schemas\Schema;
use Illuminate\Support\Carbon;

class PublishersChart extends ChartWidget
{
    use HasFiltersSchema;

    protected ?string $heading = 'Top Publishers (Books Count)';

    protected function getData(): array
    {
        $start = $this->filters['startDate'] ?? now()->startOfMonth();
        $end   = $this->filters['endDate'] ?? now();
        $limit = $this->filters['limit'] ?? 5;

        $query = Publisher::withCount([
            'books' => function ($query) use ($start, $end) {
                $query->whereBetween('created_at', [
                    Carbon::parse($start)->startOfDay(),
                    Carbon::parse($end)->endOfDay(),
                ]);
            }
        ])
            ->orderByDesc('books_count');

        // Kalau bukan "All"
        if ($limit > 0) {
            $query->limit($limit);
        }

        $publishers = $query->get();

        return [
            'datasets' => [
                [
                    'label' => 'Books Count',
                    'data' => $publishers->pluck('books_count')->toArray(),
                    'backgroundColor' => 'rgba(59, 130, 246, 0.2)',
                    'borderColor' => 'rgba(59, 130, 246, 1)',
                    'pointBackgroundColor' => 'rgba(59, 130, 246, 1)',
                    'pointBorderColor' => '#fff',
                ],
            ],
            'labels' => $publishers->pluck('name')->toArray(),
        ];
    }

    protected function getType(): string
    {
        return 'radar';
    }

    public function filtersSchema(Schema $schema): Schema
    {
        return $schema->components([
            DatePicker::make('startDate')
                ->label('Start Date')
                ->default(now()->startOfMonth()),

            DatePicker::make('endDate')
                ->label('End Date')
                ->default(now()),

            Select::make('limit')
                ->label('Top Publisher')
                ->options([
                    5 => 'Top 5',
                    10 => 'Top 10',
                    15 => 'Top 15',
                    20 => 'Top 20',
                    0 => 'All',
                ])
                ->default(5),
        ]);
    }

    protected function getOptions(): array
    {
        return [
            'scales' => [
                'r' => [
                    'beginAtZero' => true,
                    'ticks' => [
                        'stepSize' => 1,
                        'color' => '#9CA3AF', // abu-abu biar cocok dark mode
                    ],
                    'grid' => [
                        'color' => 'rgba(156, 163, 175, 0.2)',
                    ],
                    'angleLines' => [
                        'color' => 'rgba(156, 163, 175, 0.2)',
                    ],
                    'pointLabels' => [
                        'color' => '#E5E7EB', // label publisher
                        'font' => [
                            'size' => 12,
                        ],
                    ],
                ],
            ],
            'plugins' => [
                'legend' => [
                    'display' => true,
                    'labels' => [
                        'color' => '#E5E7EB',
                    ],
                ],
            ],
        ];
    }
}
