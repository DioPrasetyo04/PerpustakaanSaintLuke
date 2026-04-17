<?php

namespace App\Filament\Widgets;

use App\Models\Fine;
use App\Enums\PaymentStatus;
use Filament\Widgets\ChartWidget;
use Filament\Widgets\ChartWidget\Concerns\HasFiltersSchema;
use Filament\Forms\Components\DatePicker;
use Filament\Schemas\Schema;
use Filament\Support\RawJs;
use Illuminate\Support\Carbon;

class FineChart extends ChartWidget
{
    use HasFiltersSchema;

    protected ?string $heading = 'Payment Status Count';

    protected function getData(): array
    {
        $start = $this->filters['startDate'] ?? now()->startOfMonth();
        $end   = $this->filters['endDate'] ?? now();

        $query = Fine::whereBetween('fine_date', [
            Carbon::parse($start)->startOfDay(),
            Carbon::parse($end)->endOfDay(),
        ]);

        $pending = (clone $query)->where('payment_status', PaymentStatus::PENDING->value)->count();
        $success = (clone $query)->where('payment_status', PaymentStatus::SUCCESS->value)->count();
        $failed  = (clone $query)->where('payment_status', PaymentStatus::FAILED->value)->count();

        return [
            'datasets' => [
                [
                    'label' => 'Payment Status',
                    'data' => [$pending, $success, $failed],
                    'backgroundColor' => [
                        'rgba(234, 179, 8, 0.7)',  // 🟡 Pending (yellow)
                        'rgba(34, 197, 94, 0.7)',  // 🟢 Success (green)
                        'rgba(239, 68, 68, 0.7)',  // 🔴 Failed (red)
                    ],
                    'borderColor' => [
                        'rgba(234, 179, 8, 1)',
                        'rgba(34, 197, 94, 1)',
                        'rgba(239, 68, 68, 1)',
                    ],
                    'borderWidth' => 2,
                ],
            ],
            'labels' => [
                'Pending',
                'Success',
                'Failed',
            ],
        ];
    }

    protected function getType(): string
    {
        return 'doughnut';
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
            'plugins' => [
                'legend' => [
                    'position' => 'bottom',
                ],
            ],
        ];
    }
}
