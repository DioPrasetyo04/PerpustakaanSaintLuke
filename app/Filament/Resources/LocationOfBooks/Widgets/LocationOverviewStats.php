<?php

namespace App\Filament\Resources\LocationOfBooks\Widgets;

use App\Models\Book;
use App\Models\LocationOfBook;
use Filament\Widgets\StatsOverviewWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class LocationOverviewStats extends StatsOverviewWidget
{
    protected function getStats(): array
    {
        // Total lokasi rak yang terdaftar
        $totalLocations = LocationOfBook::count();

        // Lokasi yang sudah terhubung ke buku
        $locationsWithBook = LocationOfBook::whereNotNull('book_id')->count();

        // Lokasi master (belum terhubung ke buku)
        $locationsWithoutBook = LocationOfBook::whereNull('book_id')->count();

        // Total buku di database (semua, bukan hanya yang punya lokasi)
        $totalBooks = Book::count();

        // Buku yang sudah memiliki entri lokasi
        $booksHaveLocation = LocationOfBook::distinct('book_id')
            ->whereNotNull('book_id')
            ->count('book_id');

        // Buku yang belum punya lokasi
        $booksWithoutLocation = $totalBooks - $booksHaveLocation;

        return [
            Stat::make('Total Lokasi Rak', $totalLocations)
                ->description('Seluruh data lokasi terdaftar')
                ->descriptionIcon('heroicon-o-map-pin')
                ->color('primary')
                ->chart(
                    LocationOfBook::selectRaw('COUNT(*) as count')
                        ->groupByRaw('DATE(created_at)')
                        ->orderByRaw('DATE(created_at)')
                        ->limit(7)
                        ->pluck('count')
                        ->toArray()
                ),

            Stat::make('Lokasi Terisi Buku', $locationsWithBook)
                ->description('Lokasi yang terhubung ke buku')
                ->descriptionIcon('heroicon-o-book-open')
                ->color('success')
                ->chart(
                    LocationOfBook::whereNotNull('book_id')
                        ->selectRaw('COUNT(*) as count')
                        ->groupByRaw('DATE(created_at)')
                        ->orderByRaw('DATE(created_at)')
                        ->limit(7)
                        ->pluck('count')
                        ->toArray()
                ),

            Stat::make('Lokasi Master (Kosong)', $locationsWithoutBook)
                ->description('Lokasi belum dihubungkan ke buku')
                ->descriptionIcon('heroicon-o-inbox')
                ->color('warning'),

            Stat::make('Total Buku', $totalBooks)
                ->description("{$booksHaveLocation} sudah berlokasi · {$booksWithoutLocation} belum")
                ->descriptionIcon('heroicon-o-book-open')
                ->color('info'),
        ];
    }
}
