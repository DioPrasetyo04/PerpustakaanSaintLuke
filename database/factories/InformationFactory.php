<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Information;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Information>
 */
class InformationFactory extends Factory
{
    protected $model = Information::class;

    private static array $topics = [
        'Tips Memilih Buku yang Bagus',
        'Cara Merawat Buku dengan Benar',
        'Manfaat Membaca Setiap Hari',
        'Mengenal Sejarah Perpustakaan Dunia',
        'Panduan Meminjam Buku di Perpustakaan',
        'Buku Rekomendasi untuk Pelajar SMA',
        'Literasi Digital di Era Modern',
        'Program Membaca untuk Anak-Anak',
        'Koleksi Terbaru Perpustakaan Kami',
        'Cara Menggunakan Katalog Online',
        'Kegiatan Klub Buku Bulanan',
        'Rekomendasi Buku Sains Populer',
    ];

    private static int $index = 0;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name  = self::$topics[self::$index % count(self::$topics)];
        self::$index++;

        // Buat nama unik jika index melebihi jumlah topik
        if (self::$index > count(self::$topics)) {
            $name = $name . ' ' . self::$index;
        }

        return [
            'image'       => 'informations/placeholder.jpg',
            'name'        => $name,
            'slug'        => Str::slug($name),
            'description' => fake()->paragraph(4),
            'category_id' => Category::inRandomOrder()->value('id') ?? Category::factory(),
        ];
    }
}
