<?php

namespace Database\Seeders;

use App\Enums\DiscountType;
use App\Models\FineSettings;
use Illuminate\Database\Seeder;

class FineSettingsSeeder extends Seeder
{
    /**
     * Seed pengaturan denda (hanya 1 baris konfigurasi).
     */
    public function run(): void
    {
        FineSettings::updateOrCreate(
            ['id' => 1],
            [
                'late_fee_per_day' => 1000,                          // Rp 1.000 / hari keterlambatan
                'damage_discount_type' => DiscountType::PERCENTAGE->value,
                'damage_fee_book' => 50,                             // 50% dari harga buku bila rusak
                'lost_discount_type' => DiscountType::PERCENTAGE->value,
                'lost_fee_book' => 100,                              // 100% dari harga buku bila hilang
                'loan_duration_days' => 14,                          // masa pinjam default 14 hari
            ],
        );
    }
}
