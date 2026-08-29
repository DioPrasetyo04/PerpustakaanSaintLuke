<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Category>
 */
class CategoryFactory extends Factory
{
    protected $model = Category::class;

    /** Daftar kategori buku perpustakaan umum */
    private static array $categories = [
        ['name' => 'Fiksi',         'description' => 'Karya sastra naratif hasil imajinasi: novel, cerpen, dan roman.'],
        ['name' => 'Non-Fiksi',     'description' => 'Buku berbasis fakta: biografi, esai, dan reportase.'],
        ['name' => 'Sains',         'description' => 'Ilmu pengetahuan alam, matematika, dan penemuan ilmiah.'],
        ['name' => 'Sejarah',       'description' => 'Peristiwa masa lampau Indonesia dan dunia.'],
        ['name' => 'Teknologi',     'description' => 'Komputer, pemrograman, dan perkembangan teknologi terkini.'],
        ['name' => 'Agama',         'description' => 'Buku rohani, spiritualitas, dan kajian keagamaan.'],
        ['name' => 'Anak',          'description' => 'Bacaan ringan dan edukatif untuk anak-anak.'],
        ['name' => 'Pelajaran',     'description' => 'Buku teks dan penunjang pelajaran sekolah.'],
        ['name' => 'Biografi',      'description' => 'Kisah hidup tokoh-tokoh berpengaruh dunia dan Indonesia.'],
        ['name' => 'Psikologi',     'description' => 'Ilmu tentang perilaku manusia dan kesehatan mental.'],
        ['name' => 'Ekonomi',       'description' => 'Buku tentang keuangan, bisnis, dan ilmu ekonomi.'],
        ['name' => 'Sastra',        'description' => 'Karya sastra klasik dan kontemporer Indonesia maupun dunia.'],
    ];

    private static int $index = 0;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $data = self::$categories[self::$index % count(self::$categories)];
        self::$index++;

        // Tambah suffix unik agar slug tidak konflik jika factory dipanggil berulang
        $suffix = self::$index > count(self::$categories) ? '-' . self::$index : '';
        $name   = $data['name'] . $suffix;

        return [
            'name'        => $name,
            'slug'        => Str::slug($name),
            'icon'        => null,
            'photo'       => null,
            'description' => $data['description'],
            'is_active'   => true,
        ];
    }
}
