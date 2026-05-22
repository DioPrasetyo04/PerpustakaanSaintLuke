<?php

namespace App\Filament\Resources\Permissions\Widgets;

use Filament\Widgets\ChartWidget;
use Spatie\Permission\Models\Role;

class PermissionsPerRoleChart extends ChartWidget
{
    protected ?string $heading = 'Jumlah Izin Per Peran';

    protected ?string $description = 'Banyaknya izin yang dimiliki tiap peran.';

    protected int|string|array $columnSpan = 'full';

    protected function getData(): array
    {
        $roles = Role::query()
            ->withCount('permissions')
            ->orderByDesc('permissions_count')
            ->get();

        return [
            'datasets' => [
                [
                    'label' => 'Jumlah Izin',
                    'data' => $roles->pluck('permissions_count')->all(),
                    'backgroundColor' => 'rgba(234, 88, 12, 0.6)',
                    'borderColor' => 'rgba(234, 88, 12, 1)',
                    'borderWidth' => 1,
                ],
            ],
            'labels' => $roles->pluck('name')->all(),
        ];
    }

    protected function getType(): string
    {
        return 'bar';
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
                'legend' => ['display' => false],
            ],
        ];
    }
}
