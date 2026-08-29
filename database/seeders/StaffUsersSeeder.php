<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class StaffUsersSeeder extends Seeder
{
    /**
     * Seed user staff (writer & manager) menggunakan UserFactory.
     */
    public function run(): void
    {
        $writer = User::where('email', 'writer@perpustakaan-saint-luke.id')->first();
        if (! $writer) {
            $writer = User::factory()->staffWriter()->create();
        }
        $writer->syncRoles(['writer']);

        $manager = User::where('email', 'manager@perpustakaan-saint-luke.id')->first();
        if (! $manager) {
            $manager = User::factory()->staffManager()->create();
        }
        $manager->syncRoles(['manager']);

        $this->command?->info('✅ Staff users seeded:');
        $this->command?->info('   writer  → writer@perpustakaan-saint-luke.id  (pass: Writer@12345)');
        $this->command?->info('   manager → manager@perpustakaan-saint-luke.id (pass: Manager@12345)');
    }
}
