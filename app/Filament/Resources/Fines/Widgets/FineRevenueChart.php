<?php

namespace App\Filament\Resources\Fines\Widgets;

use App\Enums\PaymentStatus;
use App\Models\Fine;
use Carbon\Carbon;
use Filament\Forms\Components\DatePicker;
use Filament\Schemas\Schema;
use Filament\Widgets\ChartWidget;
use Filament\Widgets\ChartWidget\Concerns\HasFiltersSchema;

class FineRevenueChart extends ChartWidget
{
    use HasFiltersSchema;

    protected ?string $heading = 'Pendapatan Denda Per Bulan';

    protected ?string $description = 'Grafik total denda lunas tiap bulan pada tahun terpilih.';

    protected int|string|array $columnSpan = 'full';

    protected function getData(): array
    {
        $year = $this->filters['year'] ?? now()->startOfYear()->toDateString();
        $base = Carbon::parse($year);

        $labels = [];
        $values = [];

        for ($month = 1; $month <= 12; $month++) {
            $monthStart = $base->copy()->month($month)->startOfMonth();
            $monthEnd   = $monthStart->copy()->endOfMonth();

            $labels[] = $monthStart->translatedFormat('M');
            $values[] = (float) Fine::query()
                ->where('payment_status', PaymentStatus::SUCCESS->value)
                ->whereBetween('fine_date', [$monthStart, $monthEnd])
                ->sum('total_fee');
        }

        return [
            'datasets' => [
                [
                    'label' => 'Pendapatan Denda (Rp)',
                    'data' => $values,
                    'backgroundColor' => 'rgba(234, 179, 8, 0.6)',
                    'borderColor' => 'rgba(234, 179, 8, 1)',
                    'borderWidth' => 1,
                ],
            ],
            'labels' => $labels,
        ];
    }

    protected function getType(): string
    {
        return 'bar';
    }

    public function filtersSchema(Schema $schema): Schema
    {
        return $schema->components([
            DatePicker::make('year')
                ->label('Pilih Tahun')
                ->native(false)
                ->displayFormat('Y')
                ->default(now()->startOfYear()),
        ]);
    }

    protected function getOptions(): array
    {
        return [
            'scales' => [
                'y' => [
                    'beginAtZero' => true,
                ],
            ],
            'plugins' => [
                'legend' => ['position' => 'bottom'],
            ],
        ];
    }
}
