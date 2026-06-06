<?php

namespace Database\Seeders;

use App\Models\Event;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;

class EventSeeder extends Seeder
{
    public function run(): void
    {
        $base = Carbon::now()->startOfDay();

        $samples = [
            [
                'title' => 'Selasa Sastra: Membedah Bumi Manusia',
                'category' => 'Klub Baca',
                'location' => 'Ruang Baca Utama',
                'description' => 'Diskusi mendalam karya Pramoedya Ananta Toer bersama klub baca. Terbuka untuk seluruh siswa dan guru.',
                'start_at' => $base->copy()->addDays(4)->setTime(15, 30),
                'end_at' => $base->copy()->addDays(4)->setTime(17, 0),
                'capacity' => 30,
                'seats_taken' => 22,
                'thumbnail' => 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1200&auto=format&fit=crop',
            ],
            [
                'title' => 'Diskusi Filsafat: Pengantar Stoikisme',
                'category' => 'Diskusi',
                'location' => 'Ruang Diskusi 2',
                'description' => 'Mengenal dasar-dasar filsafat Stoik dan penerapannya dalam keseharian pelajar.',
                'start_at' => $base->copy()->addDays(11)->setTime(15, 30),
                'end_at' => $base->copy()->addDays(11)->setTime(17, 0),
                'capacity' => 24,
                'seats_taken' => 12,
                'thumbnail' => 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=1200&auto=format&fit=crop',
            ],
            [
                'title' => 'Workshop Literasi Digital Kelas X',
                'category' => 'Workshop',
                'location' => 'Lab Komputer',
                'description' => 'Pelatihan menelusuri sumber daring tepercaya dan mengelola referensi digital.',
                'start_at' => $base->copy()->addDays(15)->setTime(9, 0),
                'end_at' => $base->copy()->addDays(15)->setTime(11, 30),
                'capacity' => 40,
                'seats_taken' => 40,
                'thumbnail' => 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop',
            ],
            [
                'title' => 'Bedah Buku bersama Penulis Tamu',
                'category' => 'Acara',
                'location' => 'Aula Yayasan',
                'description' => 'Sesi bedah buku dan tanya-jawab langsung bersama penulis tamu undangan perpustakaan.',
                'start_at' => $base->copy()->addDays(20)->setTime(14, 0),
                'end_at' => $base->copy()->addDays(20)->setTime(16, 0),
                'capacity' => 80,
                'seats_taken' => 41,
                'thumbnail' => 'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=1200&auto=format&fit=crop',
            ],
            [
                'title' => 'Pelatihan Menulis Kreatif',
                'category' => 'Workshop',
                'location' => 'Ruang Baca Utama',
                'description' => 'Lokakarya menulis cerpen dan esai bersama mentor literasi sekolah.',
                'start_at' => $base->copy()->addDays(26)->setTime(13, 0),
                'end_at' => $base->copy()->addDays(26)->setTime(15, 0),
                'capacity' => 25,
                'seats_taken' => 9,
                'thumbnail' => 'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1200&auto=format&fit=crop',
            ],
            [
                'title' => 'Pameran Koleksi Langka Perpustakaan',
                'category' => 'Pameran',
                'location' => 'Galeri Lantai 2',
                'description' => 'Memamerkan koleksi buku langka dan arsip bersejarah milik perpustakaan sekolah.',
                'start_at' => $base->copy()->addDays(33)->setTime(8, 0),
                'end_at' => $base->copy()->addDays(33)->setTime(15, 0),
                'capacity' => null,
                'seats_taken' => 0,
                'thumbnail' => 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1200&auto=format&fit=crop',
            ],
        ];

        foreach ($samples as $i => $sample) {
            Event::updateOrCreate(
                ['slug' => Str::slug($sample['title'])],
                [
                    'title' => $sample['title'],
                    'description' => $sample['description'],
                    'category' => $sample['category'],
                    'location' => $sample['location'],
                    'start_at' => $sample['start_at'],
                    'end_at' => $sample['end_at'],
                    'capacity' => $sample['capacity'],
                    'seats_taken' => $sample['seats_taken'],
                    'thumbnail' => $sample['thumbnail'],
                    'is_active' => true,
                    'sort_order' => $i,
                ],
            );
        }
    }
}
