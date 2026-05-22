<?php

namespace App\Filament\Resources\Roles\Widgets;

use Filament\Widgets\ChartWidget;
use Spatie\Permission\Models\Role;

class UsersPerRoleChart extends ChartWidget
{
    protected ?string $heading = 'Jumlah Pengguna Per Peran';

    protected ?string $description = 'Sebaran pengguna pada tiap peran.';

    protected int|string|array $columnSpan = 'full';

    protected function getData(): array
    {
        $roles = Role::query()
            ->withCount('users')
            ->orderByDesc('users_count')
            ->get();

        return [
            'datasets' => [
                [
                    'label' => 'Jumlah Pengguna',
                    'data' => $roles->pluck('users_count')->all(),
                    'backgroundColor' => 'rgba(99, 102, 241, 0.6)',
                    'borderColor' => 'rgba(99, 102, 241, 1)',
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
