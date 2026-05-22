<?php

namespace App\Filament\Resources\Users\Widgets;

use App\Models\User;
use Carbon\Carbon;
use Filament\Forms\Components\DatePicker;
use Filament\Schemas\Schema;
use Filament\Widgets\ChartWidget;
use Filament\Widgets\ChartWidget\Concerns\HasFiltersSchema;

class UserGrowthChart extends ChartWidget
{
    use HasFiltersSchema;

    protected ?string $heading = 'Pertumbuhan Anggota Per Bulan';

    protected ?string $description = 'Grafik jumlah anggota baru tiap bulan pada tahun terpilih.';

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
            $values[] = User::query()
                ->whereBetween('created_at', [$monthStart, $monthEnd])
                ->count();
        }

        return [
            'datasets' => [
                [
                    'label' => 'Anggota Baru',
                    'data' => $values,
                    'backgroundColor' => 'rgba(16, 185, 129, 0.2)',
                    'borderColor' => 'rgba(16, 185, 129, 1)',
                    'borderWidth' => 2,
                    'fill' => true,
                    'tension' => 0.4,
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