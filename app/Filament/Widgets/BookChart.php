<?php

namespace App\Filament\Widgets;

use App\Models\Book;
use Filament\Widgets\ChartWidget;
use Flowframe\Trend\Trend;
use Flowframe\Trend\TrendValue;
use Illuminate\Support\Carbon;
use Filament\Forms\Components\DatePicker;
use Filament\Schemas\Schema;
use Filament\Widgets\ChartWidget\Concerns\HasFiltersSchema;

class BookChart extends ChartWidget
{
    use HasFiltersSchema;

    protected ?string $heading = 'Books Count';

    protected function getData(): array
    {
        $start = $this->filters['startDate'] ?? now()->startOfWeek();
        $end   = $this->filters['endDate'] ?? now()->endOfWeek();

        $data = Trend::model(Book::class)
            ->between(
                start: Carbon::parse($start),
                end: Carbon::parse($end),
            )
            ->perMonth()
            ->count();

        return [
            'datasets' => [
                [
                    'label' => 'Count Books Created',
                    'data' => $data->map(fn(TrendValue $value) => $value->aggregate)->toArray(),
                    'backgroundColor' => 'rgba(54, 162, 235, 0.5)',
                    'borderColor' => 'rgba(54, 162, 235, 1)',
                ],
            ],
            'labels' => $data->map(
                fn(TrendValue $value) =>
                Carbon::parse($value->date)->format('d M Y')
            )->toArray(),
        ];
    }

    protected function getType(): string
    {
        return 'line';
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
