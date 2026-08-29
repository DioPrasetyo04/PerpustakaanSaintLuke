<?php

namespace Database\Seeders;

use App\Models\Publisher;
use Illuminate\Database\Seeder;

class PublisherSeeder extends Seeder
{
    /**
     * Seed penerbit buku menggunakan PublisherFactory.
     */
    public function run(): void
    {
        Publisher::factory()->count(8)->create();

        $this->command?->info('PublisherSeeder: ' . Publisher::count() . ' penerbit tersedia.');
    }
}
