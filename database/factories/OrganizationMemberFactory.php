<?php

namespace Database\Factories;

use App\Models\OrganizationMember;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\OrganizationMember>
 */
class OrganizationMemberFactory extends Factory
{
    protected $model = OrganizationMember::class;

    private static array $members = [
        ['name' => 'Bapak Yohanes Pramono, S.Si., M.Pd.', 'role' => 'Kepala Perpustakaan',       'specialization' => 'Manajemen Perpustakaan & Literasi', 'is_featured' => true],
        ['name' => 'Ibu Margareta Dewi, S.I.Pust.',        'role' => 'Pustakawan Senior',         'specialization' => 'Katalogisasi & Koleksi',            'is_featured' => false],
        ['name' => 'Dr. Hendra Wijaya',                    'role' => 'Spesialis Literasi Digital', 'specialization' => 'Sumber Daring & Riset',            'is_featured' => false],
        ['name' => 'Bapak Wahyu Setiawan, S.Pd.',          'role' => 'Koordinator Klub Baca',     'specialization' => 'Program Literasi Siswa',            'is_featured' => false],
        ['name' => 'Ibu Rina Halim',                       'role' => 'Layanan Sirkulasi & Anggota','specialization' => 'Peminjaman & Keanggotaan',         'is_featured' => false],
        ['name' => 'Ibu Sari Kusuma, S.Hum.',              'role' => 'Layanan Referensi',         'specialization' => 'Bimbingan Pemustaka',               'is_featured' => false],
        ['name' => 'Bapak Adi Nugroho',                    'role' => 'Staf Teknis & Pengolahan',  'specialization' => 'Pemeliharaan Koleksi',              'is_featured' => false],
    ];

    private static int $index = 0;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $data = self::$members[self::$index % count(self::$members)];
        self::$index++;

        return [
            'name'           => $data['name'],
            'role'           => $data['role'],
            'specialization' => $data['specialization'],
            'photo'          => null,
            'is_featured'    => $data['is_featured'],
            'is_active'      => true,
            'sort_order'     => self::$index - 1,
        ];
    }
}
