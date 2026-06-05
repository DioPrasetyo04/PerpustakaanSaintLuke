<?php

namespace Database\Seeders;

use App\Models\Testimonial;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class TestimonialSeeder extends Seeder
{
    public function run(): void
    {
        // Video & poster contoh dari bucket sampel publik Google (gratis dipakai untuk demo).
        $samples = [
            [
                'name' => 'Andini Pratiwi',
                'role' => 'Siswa Kelas XII IPA',
                'description' => 'Perpustakaan Santo Lukas benar-benar mengubah cara saya belajar. Koleksinya lengkap, dan proses pinjamnya cepat lewat akun. Saya jadi lebih rajin membaca buku referensi untuk ujian.',
                'video' => 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
                'thumbnail' => 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop',
            ],
            [
                'name' => 'Bagas Wicaksono',
                'role' => 'Alumni Angkatan 2021',
                'description' => 'Sebagai alumni, saya masih sering mengakses sumber daring perpustakaan untuk riset kuliah. Sistem digitalnya rapi dan mudah dipakai dari mana saja.',
                'video' => 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
                'thumbnail' => 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=800&auto=format&fit=crop',
            ],
            [
                'name' => 'Clara Mahendra',
                'role' => 'Guru Bahasa Indonesia',
                'description' => 'Program literasi dan klub baca di sini sangat membantu siswa. Anak-anak jadi lebih antusias membaca dan berdiskusi tentang buku.',
                'video' => 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
                'thumbnail' => 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=800&auto=format&fit=crop',
            ],
            [
                'name' => 'Devan Saputra',
                'role' => 'Siswa Kelas XI IPS',
                'description' => 'Saya suka fitur bookmark dan rekomendasi bukunya. Tinggal scan kartu anggota, langsung bisa pinjam. Praktis banget!',
                'video' => 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
                'thumbnail' => 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=800&auto=format&fit=crop',
            ],
            [
                'name' => 'Eka Lestari',
                'role' => 'Orang Tua Siswa',
                'description' => 'Sebagai orang tua, saya senang anak saya punya akses ke perpustakaan sebaik ini. Koleksinya terkurasi dan lingkungannya mendukung kebiasaan membaca.',
                'video' => 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
                'thumbnail' => 'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=800&auto=format&fit=crop',
            ],
            [
                'name' => 'Farrel Nugraha',
                'role' => 'Pengurus OSIS',
                'description' => 'Perpustakaan jadi tempat favorit kami untuk belajar kelompok. Suasananya tenang, koleksinya banyak, dan stafnya ramah membantu mencari buku.',
                'video' => 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
                'thumbnail' => 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=800&auto=format&fit=crop',
            ],
        ];

        foreach ($samples as $i => $sample) {
            Testimonial::updateOrCreate(
                ['slug' => Str::slug($sample['name']) . '-' . ($i + 1)],
                [
                    'name' => $sample['name'],
                    'role' => $sample['role'],
                    'description' => $sample['description'],
                    'video' => $sample['video'],
                    'thumbnail' => $sample['thumbnail'],
                    'is_active' => true,
                    'sort_order' => $i,
                ],
            );
        }
    }
}
