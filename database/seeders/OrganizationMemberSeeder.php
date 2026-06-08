<?php

namespace Database\Seeders;

use App\Models\OrganizationMember;
use Illuminate\Database\Seeder;

class OrganizationMemberSeeder extends Seeder
{
    public function run(): void
    {
        // Foto contoh portrait dari Unsplash (gratis untuk demo). Di produksi,
        // staf mengunggah foto sendiri lewat panel Filament.
        $members = [
            [
                'name' => 'Bapak Yohanes Pramono, S.Si., M.Pd.',
                'role' => 'Kepala Perpustakaan',
                'specialization' => 'Manajemen Perpustakaan & Literasi',
                'photo' => 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop',
                'is_featured' => true,
            ],
            [
                'name' => 'Ibu Margareta Dewi, S.I.Pust.',
                'role' => 'Pustakawan Senior',
                'specialization' => 'Katalogisasi & Koleksi',
                'photo' => 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=800&auto=format&fit=crop',
                'is_featured' => false,
            ],
            [
                'name' => 'Dr. Hendra Wijaya',
                'role' => 'Spesialis Literasi Digital',
                'specialization' => 'Sumber Daring & Riset',
                'photo' => 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=800&auto=format&fit=crop',
                'is_featured' => false,
            ],
            [
                'name' => 'Bapak Wahyu Setiawan, S.Pd.',
                'role' => 'Koordinator Klub Baca',
                'specialization' => 'Program Literasi Siswa',
                'photo' => 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop',
                'is_featured' => false,
            ],
            [
                'name' => 'Ibu Rina Halim',
                'role' => 'Layanan Sirkulasi & Anggota',
                'specialization' => 'Peminjaman & Keanggotaan',
                'photo' => 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop',
                'is_featured' => false,
            ],
            [
                'name' => 'Ibu Sari Kusuma, S.Hum.',
                'role' => 'Layanan Referensi',
                'specialization' => 'Bimbingan Pemustaka',
                'photo' => 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop',
                'is_featured' => false,
            ],
            [
                'name' => 'Bapak Adi Nugroho',
                'role' => 'Staf Teknis & Pengolahan',
                'specialization' => 'Pemeliharaan Koleksi',
                'photo' => 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop',
                'is_featured' => false,
            ],
        ];

        foreach ($members as $i => $member) {
            OrganizationMember::updateOrCreate(
                ['name' => $member['name']],
                [
                    'role' => $member['role'],
                    'specialization' => $member['specialization'],
                    'photo' => $member['photo'],
                    'is_featured' => $member['is_featured'],
                    'is_active' => true,
                    'sort_order' => $i,
                ],
            );
        }
    }
}
