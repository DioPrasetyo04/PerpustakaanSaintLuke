<?php

namespace Database\Seeders;

use App\Models\OrganizationMember;
use Illuminate\Database\Seeder;

class OrganizationMemberSeeder extends Seeder
{
    /**
     * Seed anggota organisasi/staf perpustakaan menggunakan OrganizationMemberFactory.
     * Terdiri dari 7 posisi standar perpustakaan sekolah.
     */
    public function run(): void
    {
        OrganizationMember::factory()->count(7)->create();

        $this->command?->info('OrganizationMemberSeeder: ' . OrganizationMember::count() . ' staf tersedia.');
    }
}
