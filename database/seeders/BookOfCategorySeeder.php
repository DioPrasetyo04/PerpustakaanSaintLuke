<?php

namespace Database\Seeders;

use App\Models\Book;
use App\Models\Category;
use Illuminate\Database\Seeder;

class BookOfCategorySeeder extends Seeder
{
    /**
     * Hubungkan buku dengan kategori (pivot book_of_categories).
     * Setiap buku mendapat 1-3 kategori secara acak.
     *
     * Dependensi: BookSeeder & CategorySeeder.
     */
    public function run(): void
    {
        $books      = Book::query()->get();
        $categoryIds = Category::query()->pluck('id');

        if ($books->isEmpty() || $categoryIds->isEmpty()) {
            $this->command?->warn('BookOfCategorySeeder dilewati: butuh buku (BookSeeder) dan kategori (CategorySeeder).');
            return;
        }

        foreach ($books as $book) {
            $picks = $categoryIds->shuffle()->take(fake()->numberBetween(1, 3))->all();
            $book->categories()->syncWithoutDetaching($picks);
        }

        $this->command?->info('BookOfCategorySeeder: relasi buku ↔ kategori selesai.');
    }
}
