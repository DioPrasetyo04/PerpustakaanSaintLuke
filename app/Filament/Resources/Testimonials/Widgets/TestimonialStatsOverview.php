<?php

namespace App\Filament\Resources\Testimonials\Widgets;

use App\Models\Testimonial;
use Filament\Widgets\StatsOverviewWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class TestimonialStatsOverview extends StatsOverviewWidget
{
    protected ?string $heading = 'Statistik Testimoni';

    protected ?string $description = 'Ringkasan video testimoni anggota.';

    protected function getStats(): array
    {
        $total = Testimonial::query()->count();
        $active = Testimonial::query()->where('is_active', true)->count();

        return [
            Stat::make('Total Testimoni', $total)
                ->description('Seluruh testimoni terdaftar')
                ->descriptionIcon('heroicon-m-chat-bubble-left-right')
                ->color('info'),

            Stat::make('Testimoni Aktif', $active)
                ->description('Tampil di halaman publik')
                ->descriptionIcon('heroicon-m-check-circle')
                ->color('success'),

            Stat::make('Tersembunyi', $total - $active)
                ->description('Tidak ditampilkan')
                ->descriptionIcon('heroicon-m-eye-slash')
                ->color('warning'),
        ];
    }
}
