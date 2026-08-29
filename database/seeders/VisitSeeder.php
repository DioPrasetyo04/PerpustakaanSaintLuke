<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Visit;
use Illuminate\Database\Seeder;

class VisitSeeder extends Seeder
{
    /**
     * Seed riwayat kunjungan anggota perpustakaan menggunakan VisitFactory.
     * Setiap anggota berkunjung 2–4 kali pada hari berbeda selama 20 hari terakhir.
     *
     * Dependensi: MemberUserSeeder.
     */
    public function run(): void
    {
        $members = User::query()->where('email', 'like', '%@example.com')->get();

        if ($members->isEmpty()) {
            $this->command?->warn('VisitSeeder dilewati: belum ada anggota (jalankan MemberUserSeeder).');
            return;
        }

        foreach ($members as $member) {
            // Tiap anggota berkunjung pada 2-4 hari berbeda (unik per hari)
            $days  = collect(range(0, 20))->shuffle()->take(fake()->numberBetween(2, 4));
            $usedDays = [];

            foreach ($days as $offset) {
                // Satu kunjungan per hari per user
                if (in_array($offset, $usedDays)) {
                    continue;
                }
                $usedDays[] = $offset;

                Visit::factory()->forUser($member)->create([
                    'visit_date' => now('Asia/Jakarta')
                        ->subDays($offset)
                        ->setTime(fake()->numberBetween(8, 15), fake()->randomElement([0, 30])),
                ]);
            }
        }

        $this->command?->info('VisitSeeder: ' . Visit::count() . ' kunjungan dibuat.');
    }
}
