<?php

namespace App\Filament\Resources\OrganizationMembers\Widgets;

use App\Models\OrganizationMember;
use Filament\Widgets\StatsOverviewWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class OrganizationMemberStatsOverview extends StatsOverviewWidget
{
    protected ?string $heading = 'Statistik Struktur Organisasi';

    protected ?string $description = 'Ringkasan pengurus & staf perpustakaan.';

    protected function getStats(): array
    {
        $total = OrganizationMember::query()->count();
        $active = OrganizationMember::query()->where('is_active', true)->count();
        $featured = OrganizationMember::query()->where('is_featured', true)->count();

        return [
            Stat::make('Total Anggota', $total)
                ->description('Seluruh anggota terdaftar')
                ->descriptionIcon('heroicon-m-user-group')
                ->color('info'),

            Stat::make('Tampil di Publik', $active)
                ->description('Aktif di halaman struktur')
                ->descriptionIcon('heroicon-m-check-circle')
                ->color('success'),

            Stat::make('Kartu Sorotan', $featured)
                ->description('Pimpinan yang disorot')
                ->descriptionIcon('heroicon-m-star')
                ->color('warning'),
        ];
    }
}
