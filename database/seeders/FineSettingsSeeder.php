<?php

namespace Database\Seeders;

use App\Models\FineSettings;
use Illuminate\Database\Seeder;

class FineSettingsSeeder extends Seeder
{
    /**
     * Seed pengaturan denda (hanya 1 baris konfigurasi) menggunakan FineSettingsFactory.
     */
    public function run(): void
    {
        // updateOrCreate agar idempotent — aman dijalankan berulang
        FineSettings::updateOrCreate(
            ['id' => 1],
            FineSettings::factory()->definition()
        );

        $this->command?->info('FineSettingsSeeder: konfigurasi denda tersedia.');
    }
}
