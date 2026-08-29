<?php

namespace Database\Seeders;

use App\Models\Book;
use App\Models\Stock;
use Illuminate\Database\Seeder;

class StockSeeder extends Seeder
{
    /**
     * Seed stok untuk tiap buku menggunakan StockFactory.
     * Setiap buku mendapat tepat 1 record stok.
     * Stock model memvalidasi total = available + loan + lost + damaged.
     *
     * Dependensi: BookSeeder.
     */
    public function run(): void
    {
        $books = Book::query()->get();

        if ($books->isEmpty()) {
            $this->command?->warn('StockSeeder dilewati: belum ada buku (jalankan BookSeeder dulu).');
            return;
        }

        foreach ($books as $book) {
            // Lewati buku yang sudah punya stok
            if ($book->stock()->exists()) {
                continue;
            }

            Stock::factory()->create(['book_id' => $book->id]);
        }

        $this->command?->info('StockSeeder: stok dibuat untuk ' . Stock::count() . ' buku.');
    }
}
