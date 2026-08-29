<?php

namespace Database\Seeders;

use App\Models\Type;
use Illuminate\Database\Seeder;

class TypeSeeder extends Seeder
{
    /**
     * Seed tipe/format buku (digital & fisik) menggunakan TypeFactory.
     */
    public function run(): void
    {
        Type::factory()->physical()->create();
        Type::factory()->digital()->create();

        $this->command?->info('TypeSeeder: ' . Type::count() . ' tipe buku tersedia.');
    }
}
