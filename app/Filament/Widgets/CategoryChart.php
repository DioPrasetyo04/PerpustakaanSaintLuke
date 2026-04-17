<?php

namespace App\Filament\Widgets;

use App\Models\Category;
use Filament\Widgets\ChartWidget;
use Filament\Widgets\ChartWidget\Concerns\HasFiltersSchema;
use Filament\Forms\Components\DatePicker;
use Filament\Schemas\Schema;
use Illuminate\Support\Carbon;

class CategoryChart extends ChartWidget
{
    use HasFiltersSchema;

    protected ?string $heading = 'Books Per Category Count';

    protected function getData(): array
    {
        $start = $this->filters['startDate'] ?? now()->startOfMonth();
        $end   = $this->filters['endDate'] ?? now();

        $categories = Category::withCount([
            'books' => function ($query) use ($start, $end) {
                $query->whereBetween('books.created_at', [
                    Carbon::parse($start)->startOfDay(),
                    Carbon::parse($end)->endOfDay(),
                ]);
            }
        ])->get();

        return [
            'datasets' => [
                [
                    'label' => 'Total Books',
                    'data' => $categories->pluck('books_count')->toArray(),
                    'backgroundColor' => 'rgba(234, 179, 8, 0.5)', // kuning transparan
                    'borderColor' => 'rgba(234, 179, 8, 1)',       // kuning solid
                ],
            ],
            'labels' => $categories->pluck('name')->toArray(),
        ];
    }

    protected function getType(): string
    {
        return 'bar'; // 🔥 ini lebih cocok daripada line
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
        ]);
    }

    // 🔥 biar angka gak 1.0 / 2.0
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
        ];
    }
}
