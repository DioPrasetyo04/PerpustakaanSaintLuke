<?php

namespace Database\Seeders;

use App\Enums\UserType;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class MemberUserSeeder extends Seeder
{
    /**
     * Seed anggota perpustakaan (user frontend non-staff) untuk mengisi data
     * peminjaman, kunjungan, bookmark, dan ulasan.
     */
    public function run(): void
    {
        $members = [
            ['name' => 'Budi Santoso', 'username' => 'budi.santoso', 'type' => UserType::SMA->value, 'phone' => '081234567001'],
            ['name' => 'Siti Nurhaliza', 'username' => 'siti.nurhaliza', 'type' => UserType::SMP->value, 'phone' => '081234567002'],
            ['name' => 'Ahmad Fauzi', 'username' => 'ahmad.fauzi', 'type' => UserType::SMK->value, 'phone' => '081234567003'],
            ['name' => 'Dewi Lestari', 'username' => 'dewi.lestari', 'type' => UserType::SMA->value, 'phone' => '081234567004'],
            ['name' => 'Rizky Pratama', 'username' => 'rizky.pratama', 'type' => UserType::SD->value, 'phone' => '081234567005'],
            ['name' => 'Putri Maharani', 'username' => 'putri.maharani', 'type' => UserType::SMP->value, 'phone' => '081234567006'],
        ];

        foreach ($members as $member) {
            User::firstOrCreate(
                ['email' => $member['username'] . '@example.com'],
                [
                    'name' => $member['name'],
                    'username' => $member['username'],
                    'password' => Hash::make('Member@12345'),
                    'phone' => $member['phone'],
                    'type' => $member['type'],
                    'address' => 'Jl. Pendidikan No. ' . random_int(1, 99) . ', Jakarta',
                    'is_approved' => true,
                    'approved_at' => now(),
                    'email_verified_at' => now(),
                ],
            );
        }
    }
}
