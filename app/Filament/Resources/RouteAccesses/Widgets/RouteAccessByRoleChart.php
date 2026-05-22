<?php

namespace App\Filament\Resources\RouteAccesses\Widgets;

use App\Models\RouteAccess;
use Filament\Widgets\ChartWidget;
use Spatie\Permission\Models\Role;

class RouteAccessByRoleChart extends ChartWidget
{
    protected ?string $heading = 'Jumlah Rute Per Peran';

    protected ?string $description = 'Banyaknya rute yang dapat diakses tiap peran.';

    protected int|string|array $columnSpan = 'full';

    protected function getData(): array
    {
        $roles  = Role::query()->get();
        $labels = [];
        $values = [];

        foreach ($roles as $role) {
            $labels[] = $role->name;
            $values[] = RouteAccess::query()
                ->whereJsonContains('role_ids', $role->id)
                ->count();
        }

        return [
            'datasets' => [
                [
                    'label' => 'Jumlah Rute',
                    'data' => $values,
                    'backgroundColor' => 'rgba(236, 72, 153, 0.6)',
                    'borderColor' => 'rgba(236, 72, 153, 1)',
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
