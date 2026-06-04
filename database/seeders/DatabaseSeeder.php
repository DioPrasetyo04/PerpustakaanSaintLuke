<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RolePermissionSeeder::class,
            StaffUsersSeeder::class,
            // LoanSeeder::class, // Aktifkan saat testing fitur reminder/auto-return; jalankan via: php artisan db:seed --class=LoanSeeder
        ]);
    }
}
