<?php

namespace Database\Seeders;

use App\Models\OnlineResource;
use Illuminate\Database\Seeder;

class OnlineResourceSeeder extends Seeder
{
    /**
     * Seed sumber daya daring (tautan eksternal) menggunakan OnlineResourceFactory.
     */
    public function run(): void
    {
        OnlineResource::factory()->count(8)->create();

        $this->command?->info('OnlineResourceSeeder: ' . OnlineResource::count() . ' sumber daya tersedia.');
    }
}
