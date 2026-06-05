<?php

namespace Database\Seeders;

use App\Models\OnlineResource;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class OnlineResourceSeeder extends Seeder
{
    public function run(): void
    {
        $resources = [
            ['title' => 'JSTOR — Jurnal Akademik', 'type' => 'Jurnal', 'format' => 'Eksternal', 'tag' => 'Referensi', 'palette' => 0, 'url' => 'https://www.jstor.org', 'description' => 'Akses ribuan jurnal akademik bidang humaniora, sosial, dan sains. Login menggunakan kredensial sekolah.'],
            ['title' => 'Perpustakaan Nasional RI', 'type' => 'E-Book', 'format' => 'Web', 'tag' => 'Indonesia', 'palette' => 1, 'url' => 'https://www.perpusnas.go.id', 'description' => 'Koleksi nasional digital — termasuk naskah Nusantara, koran lama, dan e-book Indonesia.'],
            ['title' => 'Khan Academy Bahasa Indonesia', 'type' => 'Kursus', 'format' => 'Web', 'tag' => 'Pelajaran', 'palette' => 3, 'url' => 'https://id.khanacademy.org', 'description' => 'Materi belajar daring untuk SMP-SMA: matematika, sains, ekonomi, dengan bahasa Indonesia.'],
            ['title' => 'Project Gutenberg', 'type' => 'E-Book', 'format' => 'Web', 'tag' => 'Klasik Dunia', 'palette' => 7, 'url' => 'https://www.gutenberg.org', 'description' => '70.000+ buku klasik dunia berbahasa Inggris yang sudah berstatus public domain.'],
            ['title' => 'Indonesia Heritage Society Library', 'type' => 'Riset', 'format' => 'Eksternal', 'tag' => 'Sejarah', 'palette' => 5, 'url' => 'https://www.heritagejkt.org', 'description' => 'Sumber riset sejarah dan budaya Indonesia untuk pelajar tingkat lanjut.'],
            ['title' => 'Britannica School', 'type' => 'Ensiklopedi', 'format' => 'Eksternal', 'tag' => 'Referensi', 'palette' => 2, 'url' => 'https://school.eb.com', 'description' => 'Ensiklopedi akademik yang disesuaikan untuk tiga jenjang: SD, SMP, SMA.'],
            ['title' => 'TED-Ed', 'type' => 'Video', 'format' => 'Web', 'tag' => 'Multimedia', 'palette' => 6, 'url' => 'https://ed.ted.com', 'description' => 'Video pendek edukatif yang dikurasi sesuai mata pelajaran.'],
            ['title' => 'OpenStax Textbooks', 'type' => 'E-Book', 'format' => 'Web', 'tag' => 'Pelajaran', 'palette' => 4, 'url' => 'https://openstax.org', 'description' => 'Buku teks terbuka untuk pelajaran sains dan ilmu sosial tingkat menengah-atas.'],
        ];

        foreach ($resources as $index => $resource) {
            OnlineResource::updateOrCreate(
                ['slug' => Str::slug($resource['title'])],
                array_merge($resource, [
                    'is_active' => true,
                    'sort_order' => $index,
                ]),
            );
        }
    }
}
