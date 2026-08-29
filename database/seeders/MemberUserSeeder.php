<?php

namespace Database\Seeders;

use App\Enums\UserType;
use App\Models\User;
use Illuminate\Database\Seeder;

class MemberUserSeeder extends Seeder
{
    /**
     * Seed anggota perpustakaan (user frontend non-staff) menggunakan UserFactory.
     * Email berformat <username>@example.com agar seeder lain (VisitSeeder,
     * LoanFlowSeeder, BookmarkSeeder) dapat menemukannya.
     *
     * Password default: Member@12345
     */
    public function run(): void
    {
        User::factory()->count(6)->asMember()->create();

        $this->command?->info('MemberUserSeeder: ' . User::where('email', 'like', '%@example.com')->count() . ' anggota tersedia.');
    }
}
