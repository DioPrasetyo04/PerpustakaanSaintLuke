<?php

namespace App\Filament\Resources\Loans\Widgets;

use App\Models\Loan;
use Carbon\Carbon;
use Filament\Forms\Components\DatePicker;
use Filament\Schemas\Schema;
use Filament\Widgets\ChartWidget;
use Filament\Widgets\ChartWidget\Concerns\HasFiltersSchema;

class LoanTrendChart extends ChartWidget
{
    use HasFiltersSchema;

    protected ?string $heading = 'Tren Peminjaman Harian';

    protected ?string $description = 'Grafik jumlah peminjaman per hari pada bulan terpilih.';

    protected int|string|array $columnSpan = 'full';

    protected function getData(): array
    {
        $month = $this->filters['month'] ?? now()->startOfMonth()->toDateString();
        $base  = Carbon::parse($month);

        $monthStart = $base->copy()->startOfMonth();
        $daysInMonth = $base->copy()->daysInMonth;

        $labels = [];
        $values = [];

        for ($day = 1; $day <= $daysInMonth; $day++) {
            $date = $monthStart->copy()->day($day);

            $labels[] = $date->format('d');
            $values[] = Loan::query()->whereDate('created_at', $date->toDateString())->count();
        }

        return [
            'datasets' => [
                [
                    'label' => 'Jumlah Peminjaman',
                    'data' => $values,
                    'backgroundColor' => 'rgba(59, 130, 246, 0.2)',
                    'borderColor' => 'rgba(59, 130, 246, 1)',
                    'borderWidth' => 2,
                    'fill' => true,
                    'tension' => 0.3,
                ],
            ],
            'labels' => $labels,
        ];
    }

    protected function getType(): string
    {
        return 'line';
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
