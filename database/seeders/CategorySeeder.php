<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Seed kategori buku menggunakan CategoryFactory.
     */
    public function run(): void
    {
        Category::factory()->count(12)->create();

        $this->command?->info('CategorySeeder: ' . Category::count() . ' kategori tersedia.');
    }
}
