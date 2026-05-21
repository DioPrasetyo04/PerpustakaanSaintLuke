<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class StaffUsersSeeder extends Seeder
{
    public function run(): void
    {
        $writer = User::firstOrCreate(
            ['email' => 'writer@perpustakaan-saint-luke.id'],
            [
                'name'              => 'Staff Penulis',
                'username'          => 'writer',
                'password'          => Hash::make('Writer@12345'),
                'is_approved'       => true,
                'approved_at'       => now(),
                'email_verified_at' => now(),
            ]
        );
        $writer->syncRoles(['writer']);

        $manager = User::firstOrCreate(
            ['email' => 'manager@perpustakaan-saint-luke.id'],
            [
                'name'              => 'Staff Manager',
                'username'          => 'manager',
                'password'          => Hash::make('Manager@12345'),
                'is_approved'       => true,
                'approved_at'       => now(),
                'email_verified_at' => now(),
            ]
        );
        $manager->syncRoles(['manager']);

        $this->command->info('✅ Staff users seeded:');
        $this->command->info('   writer  → writer@perpustakaan-saint-luke.id  (pass: Writer@12345)');
        $this->command->info('   manager → manager@perpustakaan-saint-luke.id (pass: Manager@12345)');
    }
}
