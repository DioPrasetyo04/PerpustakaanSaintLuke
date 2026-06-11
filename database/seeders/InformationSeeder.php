<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Information;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class InformationSeeder extends Seeder
{
    /**
     * Seed artikel/informasi perpustakaan yang terhubung ke kategori.
     * Dependensi: CategorySeeder.
     */
    public function run(): void
    {
        $categories = Category::query()->pluck('id', 'name');
        if ($categories->isEmpty()) {
            $this->command?->warn('InformationSeeder dilewati: belum ada kategori (jalankan CategorySeeder).');
            return;
        }

        $infos = [
            ['name' => 'Tips Memilih Buku Fiksi yang Bagus', 'category' => 'Fiksi', 'description' => 'Panduan singkat memilih novel fiksi sesuai selera: perhatikan sinopsis, penulis, dan ulasan pembaca.'],
            ['name' => 'Mengenal Sejarah Nusantara Lewat Buku', 'category' => 'Sejarah', 'description' => 'Rekomendasi bacaan sejarah Indonesia untuk pelajar yang ingin memahami akar bangsa.'],
            ['name' => 'Belajar Sains Jadi Menyenangkan', 'category' => 'Sains', 'description' => 'Koleksi buku sains populer yang menjelaskan konsep rumit dengan bahasa sederhana.'],
            ['name' => 'Literasi Teknologi untuk Pelajar', 'category' => 'Teknologi', 'description' => 'Buku pengantar pemrograman dan teknologi yang cocok untuk pemula di tingkat sekolah.'],
        ];

        foreach ($infos as $info) {
            $categoryId = $categories[$info['category']] ?? $categories->first();

            Information::updateOrCreate(
                ['slug' => Str::slug($info['name'])],
                [
                    'name' => $info['name'],
                    'description' => $info['description'],
                    'image' => 'informations/placeholder.jpg',
                    'category_id' => $categoryId,
                ],
            );
        }
    }
}
