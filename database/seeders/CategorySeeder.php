<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    /**
     * Seed kategori buku.
     */
    public function run(): void
    {
        $categories = [
            ['name' => 'Fiksi', 'description' => 'Karya sastra naratif hasil imajinasi: novel, cerpen, dan roman.'],
            ['name' => 'Non-Fiksi', 'description' => 'Buku berbasis fakta: biografi, esai, dan reportase.'],
            ['name' => 'Sains', 'description' => 'Ilmu pengetahuan alam, matematika, dan penemuan ilmiah.'],
            ['name' => 'Sejarah', 'description' => 'Peristiwa masa lampau Indonesia dan dunia.'],
            ['name' => 'Teknologi', 'description' => 'Komputer, pemrograman, dan perkembangan teknologi terkini.'],
            ['name' => 'Agama', 'description' => 'Buku rohani, spiritualitas, dan kajian keagamaan.'],
            ['name' => 'Anak', 'description' => 'Bacaan ringan dan edukatif untuk anak-anak.'],
            ['name' => 'Pelajaran', 'description' => 'Buku teks dan penunjang pelajaran sekolah.'],
        ];

        foreach ($categories as $category) {
            Category::updateOrCreate(
                ['slug' => Str::slug($category['name'])],
                [
                    'name' => $category['name'],
                    'description' => $category['description'],
                    'is_active' => true,
                ],
            );
        }
    }
}
