<?php

namespace Database\Factories;

use App\Models\Testimonial;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Testimonial>
 */
class TestimonialFactory extends Factory
{
    protected $model = Testimonial::class;

    private static array $samples = [
        ['name' => 'Andini Pratiwi',   'role' => 'Siswa Kelas XII IPA',   'video' => 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'],
        ['name' => 'Bagas Wicaksono',  'role' => 'Alumni Angkatan 2021',  'video' => 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'],
        ['name' => 'Clara Mahendra',   'role' => 'Guru Bahasa Indonesia',  'video' => 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'],
        ['name' => 'Devan Saputra',    'role' => 'Siswa Kelas XI IPS',    'video' => 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4'],
        ['name' => 'Eka Lestari',      'role' => 'Orang Tua Siswa',       'video' => 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4'],
        ['name' => 'Farrel Nugraha',   'role' => 'Pengurus OSIS',         'video' => 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4'],
        ['name' => 'Gina Kusumawati',  'role' => 'Siswa Kelas X SMA',     'video' => 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'],
        ['name' => 'Hendra Gunawan',   'role' => 'Guru Matematika',       'video' => 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'],
    ];

    private static array $descriptions = [
        'Perpustakaan Saint Luke benar-benar mengubah cara saya belajar. Koleksinya lengkap dan proses pinjam cepat lewat akun digital.',
        'Sebagai alumni, saya masih mengakses sumber daring perpustakaan untuk riset kuliah. Sistemnya rapi dan mudah dari mana saja.',
        'Program literasi dan klub baca di sini sangat membantu siswa menjadi lebih antusias membaca dan berdiskusi.',
        'Saya suka fitur bookmark dan rekomendasi buku. Tinggal scan kartu anggota, langsung bisa pinjam. Praktis!',
        'Sebagai orang tua, senang anak punya akses perpustakaan sebaik ini. Koleksinya terkurasi dan lingkungannya mendukung.',
        'Perpustakaan jadi tempat favorit kami untuk belajar kelompok. Suasana tenang, koleksi banyak, staf ramah.',
        'Layanan digital perpustakaan ini sangat memudahkan proses peminjaman dan pengembalian buku.',
        'Saya dapat menemukan buku referensi yang saya butuhkan dengan mudah melalui sistem katalog yang tersedia.',
    ];

    private static int $index = 0;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $i    = self::$index % count(self::$samples);
        $data = self::$samples[$i];
        self::$index++;

        $slug = Str::slug($data['name']) . '-' . (self::$index);

        return [
            'name'        => $data['name'],
            'slug'        => $slug,
            'description' => self::$descriptions[$i % count(self::$descriptions)],
            'role'        => $data['role'],
            'video'       => $data['video'],
            'thumbnail'   => null,
            'is_active'   => true,
            'sort_order'  => self::$index - 1,
        ];
    }
}
