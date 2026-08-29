<?php

namespace Database\Seeders;

use App\Models\Information;
use Illuminate\Database\Seeder;

class InformationSeeder extends Seeder
{
    /**
     * Seed artikel/informasi perpustakaan menggunakan InformationFactory.
     *
     * Dependensi: CategorySeeder.
     */
    public function run(): void
    {
        Information::factory()->count(12)->create();

        $this->command?->info('InformationSeeder: ' . Information::count() . ' informasi tersedia.');
    }
}
