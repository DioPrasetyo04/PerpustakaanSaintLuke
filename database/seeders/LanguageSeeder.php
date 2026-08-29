<?php

namespace Database\Seeders;

use App\Models\Language;
use Illuminate\Database\Seeder;

class LanguageSeeder extends Seeder
{
    /**
     * Seed daftar bahasa buku menggunakan LanguageFactory.
     * Setiap bahasa memiliki code unik (id, en, ar, dll.).
     */
    public function run(): void
    {
        // Seed 2 bahasa utama (Indonesia & Inggris) yang paling sering dipakai
        Language::factory()->count(2)->create();

        $this->command?->info('LanguageSeeder: ' . Language::count() . ' bahasa tersedia.');
    }
}
