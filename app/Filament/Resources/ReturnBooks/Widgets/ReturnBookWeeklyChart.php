<?php

namespace App\Filament\Resources\ReturnBooks\Widgets;

use App\Models\ReturnBook;
use Carbon\Carbon;
use Filament\Forms\Components\DatePicker;
use Filament\Schemas\Schema;
use Filament\Widgets\ChartWidget;
use Filament\Widgets\ChartWidget\Concerns\HasFiltersSchema;

class ReturnBookWeeklyChart extends ChartWidget
{
    use HasFiltersSchema;

    protected ?string $heading = 'Jumlah Pengembalian Per Minggu';

    protected ?string $description = 'Grafik jumlah pengembalian per minggu pada bulan terpilih.';

    protected int|string|array $columnSpan = 'full';

    protected function getData(): array
    {
        $month = $this->filters['month'] ?? now()->startOfMonth()->toDateString();
        $base  = Carbon::parse($month);

        $monthStart = $base->copy()->startOfMonth();
        $monthEnd   = $base->copy()->endOfMonth();

        $weeks = [];
        $cursor = $monthStart->copy()->startOfWeek();

        $weekIndex = 1;
        while ($cursor->lte($monthEnd)) {
            $weekStart = $cursor->copy();
            $weekEnd   = $cursor->copy()->endOfWeek();

            $count = ReturnBook::query()
                ->whereBetween('return_date', [$weekStart, $weekEnd])
                ->count();

            $weeks[] = [
                'label' => 'Minggu ' . $weekIndex . ' (' . $weekStart->format('d M') . ' - ' . $weekEnd->format('d M') . ')',
                'value' => $count,
            ];

            $cursor->addWeek();
            $weekIndex++;
        }

        return [
            'datasets' => [
                [
                    'label' => 'Jumlah Pengembalian',
                    'data' => array_column($weeks, 'value'),
                    'backgroundColor' => 'rgba(16, 185, 129, 0.6)',
                    'borderColor' => 'rgba(16, 185, 129, 1)',
                    'borderWidth' => 1,
                ],
            ],
            'labels' => array_column($weeks, 'label'),
        ];
    }

    protected function getType(): string
    {
        return 'bar';
    }

    public function filtersSchema(Schema $schema): Schema
    {
        return $schema->components([
            DatePicker::make('month')
                ->label('Pilih Bulan')
                ->native(false)
                ->displayFormat('F Y')
                ->default(now()->startOfMonth()),
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
            'plugins' => [
                'legend' => ['position' => 'bottom'],
            ],
        ];
    }
}
