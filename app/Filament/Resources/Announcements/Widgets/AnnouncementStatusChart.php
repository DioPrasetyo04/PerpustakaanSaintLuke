<?php

namespace App\Filament\Resources\Announcements\Widgets;

use App\Models\Announcement;
use Filament\Widgets\ChartWidget;

class AnnouncementStatusChart extends ChartWidget
{
    protected ?string $heading = 'Status Pengumuman';

    protected ?string $description = 'Perbandingan pengumuman aktif dan nonaktif.';

    protected int|string|array $columnSpan = 'full';

    protected function getData(): array
    {
        $active   = Announcement::query()->where('is_active', true)->count();
        $inactive = Announcement::query()->where('is_active', false)->count();

        return [
            'datasets' => [
                [
                    'label' => 'Jumlah Pengumuman',
                    'data' => [$active, $inactive],
                    'backgroundColor' => [
                        'rgba(16, 185, 129, 0.7)',
                        'rgba(107, 114, 128, 0.7)',
                    ],
                    'borderColor' => 'rgba(255, 255, 255, 0.8)',
                    'borderWidth' => 2,
                ],
            ],
            'labels' => ['Aktif', 'Nonaktif'],
        ];
    }

    protected function getType(): string
    {
        return 'doughnut';
    }

    protected function getOptions(): array
    {
        return [
            'plugins' => [
                'legend' => ['position' => 'bottom'],
            ],
        ];
    }
}
