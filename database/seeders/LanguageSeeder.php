<?php

namespace Database\Seeders;

use App\Models\Language;
use Illuminate\Database\Seeder;

class LanguageSeeder extends Seeder
{
    /**
     * Seed daftar bahasa buku (dipakai relasi books.language_id).
     */
    public function run(): void
    {
        $languages = [
            ['code' => 'id', 'language' => 'Indonesia'],
            ['code' => 'en', 'language' => 'English'],
        ];

        foreach ($languages as $language) {
            Language::updateOrCreate(
                ['code' => $language['code']],
                ['language' => $language['language']],
            );
        }
    }
}
