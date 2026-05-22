<?php

namespace App\Filament\Resources\Roles\Widgets;

use App\Models\User;
use Filament\Widgets\StatsOverviewWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleStatsOverview extends StatsOverviewWidget
{
    protected ?string $heading = 'Statistik Peran';

    protected ?string $description = 'Ringkasan peran, izin, dan pengguna.';

    protected function getStats(): array
    {
        $totalRoles       = Role::query()->count();
        $totalPermissions = Permission::query()->count();
        $totalUsers       = User::query()->count();

        return [
            Stat::make('Total Peran', $totalRoles)
                ->description('Seluruh peran yang tersedia')
                ->descriptionIcon('heroicon-m-shield-check')
                ->color('info'),

            Stat::make('Total Izin', $totalPermissions)
                ->description('Seluruh izin terdaftar')
                ->descriptionIcon('heroicon-m-key')
                ->color('warning'),

            Stat::make('Total Pengguna', $totalUsers)
                ->description('Pengguna yang dapat diberi peran')
                ->descriptionIcon('heroicon-m-users')
                ->color('primary'),
        ];
    }
}
