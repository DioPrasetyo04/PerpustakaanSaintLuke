<?php

namespace Database\Seeders;

use App\Models\Type;
use Illuminate\Database\Seeder;

class TypeSeeder extends Seeder
{
    /**
     * Seed tipe/format buku (digital & fisik). Dipakai relasi book_of_types.
     */
    public function run(): void
    {
        foreach (['digital', 'fisik'] as $type) {
            Type::updateOrCreate(['type' => $type], ['type' => $type]);
        }
    }
}
