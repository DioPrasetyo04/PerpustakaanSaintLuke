<?php

namespace App\Filament\Widgets;

use App\Models\Fine;
use App\Enums\PaymentStatus;
use Filament\Widgets\ChartWidget;
use Filament\Widgets\ChartWidget\Concerns\HasFiltersSchema;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\Select;
use Filament\Schemas\Schema;
use Illuminate\Support\Carbon;

class FineConditionChart extends ChartWidget
{
    use HasFiltersSchema;

    protected ?string $heading = 'Total Fee by Payment Status';

    protected function getData(): array
    {
        $start = $this->filters['startDate'] ?? now()->startOfMonth();
        $end   = $this->filters['endDate'] ?? now();

        $statusFilter = $this->filters['status'] ?? null;

        $query = Fine::whereBetween('fine_date', [
            Carbon::parse($start)->startOfDay(),
            Carbon::parse($end)->endOfDay(),
        ]);

        // kalau user pilih status tertentu
        if ($statusFilter) {
            $query->where('payment_status', $statusFilter);
        }

        // SUM total_fee per status
        $data = $query
            ->selectRaw('payment_status, SUM(total_fee) as total')
            ->groupBy('payment_status')
            ->pluck('total', 'payment_status');

        // mapping ke semua status biar tidak hilang
        $statuses = [
            PaymentStatus::PENDING->value,
            PaymentStatus::SUCCESS->value,
            PaymentStatus::FAILED->value,
        ];

        $values = collect($statuses)->map(fn($status) => $data[$status] ?? 0);

        return [
            'datasets' => [
                [
                    'label' => 'Total Fee',
                    'data' => $values->toArray(),
                    'backgroundColor' => [
                        'rgba(234, 179, 8, 0.7)',  // pending
                        'rgba(34, 197, 94, 0.7)',  // success
                        'rgba(239, 68, 68, 0.7)',  // failed
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

            Select::make('status')
                ->label('Filter Status')
                ->options([
                    PaymentStatus::PENDING->value => 'Pending',
                    PaymentStatus::SUCCESS->value => 'Success',
                    PaymentStatus::FAILED->value  => 'Failed',
                ])
                ->placeholder('All Status'),
        ]);
    }

    // biar angka gak desimal
    protected function getOptions(): array
    {
        return [
            'scales' => [
                'y' => [
                    'beginAtZero' => true,
                    'ticks' => [
                        'precision' => 0,
                    ],
                ],
            ],
        ];
    }
}
