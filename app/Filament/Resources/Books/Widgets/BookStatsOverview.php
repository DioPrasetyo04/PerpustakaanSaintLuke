<?php

namespace App\Filament\Resources\Books\Widgets;

use App\Enums\PublishedBooks;
use App\Models\Book;
use App\Models\Stock;
use Carbon\Carbon;
use Filament\Widgets\StatsOverviewWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class BookStatsOverview extends StatsOverviewWidget
{
    protected ?string $heading = 'Statistik Buku';

    protected ?string $description = 'Ringkasan koleksi dan ketersediaan buku.';

    protected function getStats(): array
    {
        $total      = Book::query()->count();
        $published  = Book::query()->where('is_published', PublishedBooks::PUBLISH->value)->count();
        $available  = (int) Stock::query()->sum('available');
        $onLoan     = (int) Stock::query()->sum('loan');

        $publishedPercent = $total > 0 ? round($published / $total * 100) : 0;

        return [
            Stat::make('Total Judul Buku', $total)
                ->description('Seluruh judul di katalog')
                ->descriptionIcon('heroicon-m-book-open')
                ->chart($this->last7DaysChart())
                ->color('info'),

            Stat::make('Buku Terbit', $published)
                ->description($publishedPercent . '% dari katalog dipublikasikan')
                ->descriptionIcon('heroicon-m-check-badge')
                ->color('success'),

            Stat::make('Stok Tersedia', $available)
                ->description($onLoan . ' eksemplar sedang dipinjam')
                ->descriptionIcon('heroicon-m-archive-box')
                ->color('primary'),
        ];
    }

    private function last7DaysChart(): array
    {
        $data = [];

        for ($i = 6; $i >= 0; $i--) {
            $day = Carbon::now()->subDays($i)->toDateString();
            $data[] = Book::query()->whereDate('created_at', $day)->count();
        }

        return $data;
    }
}
