<?php

namespace Database\Seeders;

use App\Models\Author;
use App\Models\Book;
use App\Models\Type;
use Illuminate\Database\Seeder;

class BookSeeder extends Seeder
{
    /**
     * Seed koleksi buku menggunakan BookFactory.
     * Setiap buku secara otomatis mendapatkan:
     *   - publisher_id  : diambil acak dari Publisher yang sudah ada
     *   - language_id   : diambil acak dari Language yang sudah ada
     *   - added_by      : diambil acak dari User yang sudah ada
     *
     * Dependensi: LanguageSeeder, PublisherSeeder, AuthorsSeeder, TypeSeeder,
     * dan minimal 1 user (AdminUserSeeder/StaffUsersSeeder) untuk added_by.
     */
    public function run(): void
    {
        $books = Book::factory()->count(20)->create();

        // Hubungkan setiap buku ke minimal 1 penulis secara acak
        $authorIds = Author::pluck('id');
        $typeIds   = Type::pluck('id', 'type');

        foreach ($books as $book) {
            // Penulis: 1-2 penulis per buku
            if ($authorIds->isNotEmpty()) {
                $picks = $authorIds->shuffle()->take(fake()->numberBetween(1, 2));
                $book->authors()->syncWithoutDetaching($picks->all());
            }

            // Tipe buku: fisik atau digital (acak)
            if ($typeIds->isNotEmpty()) {
                $type = $typeIds->random();
                $book->types()->syncWithoutDetaching([$type]);
            }
        }

        $this->command?->info('BookSeeder: ' . Book::count() . ' buku tersedia.');
    }
}
