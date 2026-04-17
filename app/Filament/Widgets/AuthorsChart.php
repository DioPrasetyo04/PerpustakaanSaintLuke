<?php

namespace App\Filament\Widgets;

use App\Models\Author;
use Filament\Widgets\ChartWidget;
use Filament\Widgets\ChartWidget\Concerns\HasFiltersSchema;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\Select;
use Filament\Schemas\Schema;
use Illuminate\Support\Carbon;

class AuthorsChart extends ChartWidget
{
    use HasFiltersSchema;

    protected ?string $heading = 'Top Authors (Books Written)';

    protected function getData(): array
    {
        $start = $this->filters['startDate'] ?? now()->startOfMonth();
        $end   = $this->filters['endDate'] ?? now();
        $limit = $this->filters['limit'] ?? 10;

        $query = Author::withCount([
            'books' => function ($query) use ($start, $end) {
                $query->whereBetween('created_at', [
                    Carbon::parse($start)->startOfDay(),
                    Carbon::parse($end)->endOfDay(),
                ]);
            }
        ])
            ->having('books_count', '>', 0)
            ->orderByDesc('books_count');

        if ($limit > 0) {
            $query->limit($limit);
        }

        $authors = $query->get();

        return [
            'datasets' => [
                [
                    'label' => $authors->pluck('name')->toArray(),
                    'data' => $authors->pluck('books_count')->toArray(),
                    'backgroundColor' => 'rgba(59, 130, 246, 0.7)',
                    'borderRadius' => 6, // biar modern
                ],
            ],
            'labels' => $authors->pluck('name')->toArray(), // 🔥 ini nama author
        ];
    }

    protected function getType(): string
    {
        return 'bar';
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
                ->label('Top Authors')
                ->options([
                    5 => 'Top 5',
                    10 => 'Top 10',
                    15 => 'Top 15',
                    20 => 'Top 20',
                    0 => 'All',
                ])
                ->default(10),
        ]);
    }

    protected function getOptions(): array
    {
        return [
            'scales' => [
                'x' => [
                    'ticks' => [
                        'color' => '#E5E7EB',
                    ],
                ],
                'y' => [
                    'beginAtZero' => true,
                    'ticks' => [
                        'stepSize' => 1,
                        'color' => '#9CA3AF',
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
