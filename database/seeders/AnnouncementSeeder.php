<?php

namespace Database\Seeders;

use App\Enums\Days;
use App\Models\Announcement;
use Illuminate\Database\Seeder;

class AnnouncementSeeder extends Seeder
{
    /**
     * Seed pengumuman jadwal perpustakaan (7 hari) menggunakan AnnouncementFactory.
     * Kolom 'days' memiliki unique constraint sehingga 1 baris per hari.
     */
    public function run(): void
    {
        // Buat 7 pengumuman (satu per hari dalam seminggu)
        Announcement::factory()->count(7)->create();

        $this->command?->info('AnnouncementSeeder: ' . Announcement::count() . ' pengumuman tersedia.');
    }
}
