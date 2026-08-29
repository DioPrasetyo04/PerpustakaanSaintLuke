<?php

namespace Database\Seeders;

use App\Models\Testimonial;
use Illuminate\Database\Seeder;

class TestimonialSeeder extends Seeder
{
    /**
     * Seed testimoni dari anggota perpustakaan menggunakan TestimonialFactory.
     */
    public function run(): void
    {
        Testimonial::factory()->count(6)->create();

        $this->command?->info('TestimonialSeeder: ' . Testimonial::count() . ' testimoni tersedia.');
    }
}
