<?php

namespace Database\Seeders;

use App\Models\Book;
use App\Models\LocationOfBook;
use Illuminate\Database\Seeder;

class LocationOfBooksSeeder extends Seeder
{
    /**
     * Seed lokasi rak buku menggunakan LocationOfBooksFactory.
     * Setiap buku mendapat 1 record lokasi di rak perpustakaan.
     *
     * Dependensi: BookSeeder.
     */
    public function run(): void
    {
        $books = Book::query()->get();

        if ($books->isEmpty()) {
            $this->command?->warn('LocationOfBooksSeeder dilewati: belum ada buku (jalankan BookSeeder dulu).');
            return;
        }

        foreach ($books as $book) {
            // Lewati buku yang sudah punya lokasi
            if ($book->locationOfBook()->exists()) {
                continue;
            }

            LocationOfBook::factory()->create(['book_id' => $book->id]);
        }

        $this->command?->info('LocationOfBooksSeeder: lokasi dibuat untuk ' . LocationOfBook::count() . ' buku.');
    }
}
