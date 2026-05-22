<?php

namespace App\Filament\Resources\Permissions\Widgets;

use Filament\Widgets\StatsOverviewWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class PermissionStatsOverview extends StatsOverviewWidget
{
    protected ?string $heading = 'Statistik Izin';

    protected ?string $description = 'Ringkasan izin dan keterkaitannya dengan peran.';

    protected function getStats(): array
    {
        $totalPermissions = Permission::query()->count();
        $totalRoles       = Role::query()->count();
        $avgPerRole       = $totalRoles > 0
            ? round(Role::query()->withCount('permissions')->get()->avg('permissions_count'), 1)
            : 0;

        return [
            Stat::make('Total Izin', $totalPermissions)
                ->description('Seluruh izin terdaftar')
                ->descriptionIcon('heroicon-m-key')
                ->color('info'),

            Stat::make('Total Peran', $totalRoles)
                ->description('Peran yang memakai izin')
                ->descriptionIcon('heroicon-m-shield-check')
                ->color('primary'),

            Stat::make('Rata-rata Izin / Peran', $avgPerRole)
                ->description('Rerata izin yang dimiliki tiap peran')
                ->descriptionIcon('heroicon-m-calculator')
                ->color('success'),
        ];
    }
}
