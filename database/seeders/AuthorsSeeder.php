<?php

namespace Database\Seeders;

use App\Models\Author;
use Illuminate\Database\Seeder;

class AuthorsSeeder extends Seeder
{
    /**
     * Seed penulis buku menggunakan AuthorsFactory.
     * Author yang dibuat otomatis diberi role "writer" lewat boot model Author.
     */
    public function run(): void
    {
        Author::factory()->count(10)->create();

        $this->command?->info('AuthorsSeeder: ' . Author::count() . ' penulis tersedia.');
    }
}
