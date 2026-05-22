<?php

namespace App\Filament\Resources\RouteAccesses\Widgets;

use App\Models\RouteAccess;
use Filament\Widgets\StatsOverviewWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RouteAccessStatsOverview extends StatsOverviewWidget
{
    protected ?string $heading = 'Statistik Akses Rute';

    protected ?string $description = 'Ringkasan aturan akses rute aplikasi.';

    protected function getStats(): array
    {
        $totalRoutes      = RouteAccess::query()->count();
        $totalRoles       = Role::query()->count();
        $totalPermissions = Permission::query()->count();

        return [
            Stat::make('Total Rute Diatur', $totalRoutes)
                ->description('Rute dengan aturan akses')
                ->descriptionIcon('heroicon-m-lock-closed')
                ->color('info'),

            Stat::make('Total Peran', $totalRoles)
                ->description('Peran yang dapat diberi akses')
                ->descriptionIcon('heroicon-m-shield-check')
                ->color('primary'),

            Stat::make('Total Izin', $totalPermissions)
                ->description('Izin yang dapat diberi akses')
                ->descriptionIcon('heroicon-m-key')
                ->color('warning'),
        ];
    }
}
