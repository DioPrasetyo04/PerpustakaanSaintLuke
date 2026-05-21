<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        $email = 'admin@perpustakaan-saint-luke.id';

        $admin = User::firstOrCreate(
            ['email' => $email],
            [
                'name' => 'Super Admin',
                'username' => 'superadmin',
                'email' => $email,
                'password' => Hash::make('Admin@12345'),
                'is_approved' => true,
                'approved_at' => now(),
                'email_verified_at' => now(),
            ]
        );

        $admin->syncRoles(['admin']);

        $this->command->info('Admin user: ' . $email . ' | password: Admin@12345');
    }
}
