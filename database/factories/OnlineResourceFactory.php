<?php

namespace Database\Factories;

use App\Models\OnlineResource;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\OnlineResource>
 */
class OnlineResourceFactory extends Factory
{
    protected $model = OnlineResource::class;

    private static array $resources = [
        ['title' => 'JSTOR — Jurnal Akademik',         'type' => 'Jurnal',     'format' => 'Eksternal', 'tag' => 'Referensi',     'color' => '#0F3D2E', 'url' => 'https://www.jstor.org',          'description' => 'Akses ribuan jurnal akademik bidang humaniora, sosial, dan sains. Login menggunakan kredensial sekolah.'],
        ['title' => 'Perpustakaan Nasional RI',         'type' => 'E-Book',     'format' => 'Web',       'tag' => 'Indonesia',     'color' => '#11324F', 'url' => 'https://www.perpusnas.go.id',    'description' => 'Koleksi nasional digital — termasuk naskah Nusantara, koran lama, dan e-book Indonesia.'],
        ['title' => 'Khan Academy Bahasa Indonesia',    'type' => 'Kursus',     'format' => 'Web',       'tag' => 'Pelajaran',     'color' => '#1E2440', 'url' => 'https://id.khanacademy.org',     'description' => 'Materi belajar daring untuk SMP-SMA: matematika, sains, ekonomi, dengan bahasa Indonesia.'],
        ['title' => 'Project Gutenberg',                'type' => 'E-Book',     'format' => 'Web',       'tag' => 'Klasik Dunia',  'color' => '#402015', 'url' => 'https://www.gutenberg.org',      'description' => '70.000+ buku klasik dunia berbahasa Inggris yang sudah berstatus public domain.'],
        ['title' => 'Indonesia Heritage Society',       'type' => 'Riset',      'format' => 'Eksternal', 'tag' => 'Sejarah',       'color' => '#13322F', 'url' => 'https://www.heritagejkt.org',    'description' => 'Sumber riset sejarah dan budaya Indonesia untuk pelajar tingkat lanjut.'],
        ['title' => 'Britannica School',                'type' => 'Ensiklopedi','format' => 'Eksternal', 'tag' => 'Referensi',     'color' => '#3A2B14', 'url' => 'https://school.eb.com',          'description' => 'Ensiklopedi akademik untuk tiga jenjang: SD, SMP, SMA.'],
        ['title' => 'TED-Ed',                          'type' => 'Video',      'format' => 'Web',       'tag' => 'Multimedia',    'color' => '#2A1840', 'url' => 'https://ed.ted.com',             'description' => 'Video pendek edukatif yang dikurasi sesuai mata pelajaran.'],
        ['title' => 'OpenStax Textbooks',               'type' => 'E-Book',     'format' => 'Web',       'tag' => 'Pelajaran',     'color' => '#3A1530', 'url' => 'https://openstax.org',           'description' => 'Buku teks terbuka untuk sains dan ilmu sosial tingkat menengah.'],
    ];

    private static int $index = 0;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $data = self::$resources[self::$index % count(self::$resources)];
        self::$index++;

        return array_merge($data, [
            'is_active'  => true,
            'sort_order' => self::$index - 1,
        ]);
    }
}
