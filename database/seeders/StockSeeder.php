<?php

namespace Database\Seeders;

use App\Models\Book;
use App\Models\Stock;
use Illuminate\Database\Seeder;

class StockSeeder extends Seeder
{
    /**
     * Seed stok untuk tiap buku. Stock model memvalidasi
     * total = available + loan + lost + damaged, jadi angka dijaga konsisten.
     */
    public function run(): void
    {
        $books = Book::query()->get();
        if ($books->isEmpty()) {
            $this->command?->warn('StockSeeder dilewati: belum ada buku (jalankan BookSeeder dulu).');
            return;
        }

        foreach ($books as $book) {
            if ($book->stock()->exists()) {
                continue;
            }

            $total = random_int(3, 10);
            $loan = random_int(0, 2);
            $damaged = random_int(0, 1);
            $available = $total - $loan - $damaged; // lost = 0, jaga agar penjumlahan = total

            Stock::create([
                'book_id' => $book->id,
                'total' => $total,
                'available' => $available,
                'loan' => $loan,
                'lost' => 0,
                'damaged' => $damaged,
            ]);
        }
    }
}
