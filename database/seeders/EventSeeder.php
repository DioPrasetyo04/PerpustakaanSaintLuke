<?php

namespace Database\Seeders;

use App\Models\Event;
use Illuminate\Database\Seeder;

class EventSeeder extends Seeder
{
    /**
     * Seed acara perpustakaan menggunakan EventFactory.
     * Data event mencakup judul, kategori, lokasi, kapasitas, dll.
     */
    public function run(): void
    {
        Event::factory()->count(6)->create();
        // Tambah beberapa event masa lalu untuk data historis
        Event::factory()->count(3)->past()->create();

        $this->command?->info('EventSeeder: ' . Event::count() . ' acara tersedia.');
    }
}
