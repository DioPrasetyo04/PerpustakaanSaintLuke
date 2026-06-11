<?php

namespace App\Filament\Resources\Authors\Widgets;

use App\Models\Author;
use Carbon\Carbon;
use Filament\Widgets\StatsOverviewWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class AuthorStatsOverview extends StatsOverviewWidget
{
    protected ?string $heading = 'Statistik Penulis';

    protected ?string $description = 'Ringkasan data penulis buku.';

    protected function getStats(): array
    {
        $now          = Carbon::now();
        $startOfMonth = $now->copy()->startOfMonth();
        $endOfMonth   = $now->copy()->endOfMonth();

        $total     = Author::query()->count();
        $withBooks = Author::query()->has('books')->count();
        $thisMonth = Author::query()->whereBetween('created_at', [$startOfMonth, $endOfMonth])->count();

        $withBooksPercent = $total > 0 ? round($withBooks / $total * 100) : 0;

        return [
            Stat::make('Total Penulis', $total)
                ->description('Seluruh penulis terdaftar')
                ->descriptionIcon('heroicon-m-pencil-square')
                ->color('info'),

            Stat::make('Penulis dengan Buku', $withBooks)
                ->description($withBooksPercent . '% dari total penulis')
                ->descriptionIcon('heroicon-m-book-open')
                ->color('success'),

            Stat::make('Penulis Baru Bulan Ini', $thisMonth)
                ->description($now->translatedFormat('F Y'))
                ->descriptionIcon('heroicon-m-user-plus')
                ->chart($this->last7DaysChart())
                ->color('primary'),
        ];
    }

    private function last7DaysChart(): array
    {
        $data = [];

        for ($i = 6; $i >= 0; $i--) {
            $day = Carbon::now()->subDays($i)->toDateString();
            $data[] = Author::query()->whereDate('created_at', $day)->count();
        }

        return $data;
    }
}
