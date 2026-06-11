<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Visit;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class VisitSeeder extends Seeder
{
    /**
     * Seed riwayat kunjungan anggota selama beberapa hari terakhir.
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
            // Tiap anggota berkunjung beberapa kali pada hari berbeda.
            $days = collect(range(0, 20))->shuffle()->take(random_int(2, 4));

            foreach ($days as $offset) {
                $visitDate = Carbon::today('Asia/Jakarta')->subDays($offset)->setTime(random_int(8, 15), random_int(0, 59));

                Visit::firstOrCreate(
                    [
                        'user_id' => $member->id,
                        'visit_date' => $visitDate->toDateString() . ' 00:00:00',
                    ],
                    [
                        'name' => $member->name,
                        'address' => $member->address,
                        'visit_date' => $visitDate,
                        'type' => $member->type,
                        'note' => 'Kunjungan membaca & meminjam buku.',
                    ],
                );
            }
        }
    }
}
