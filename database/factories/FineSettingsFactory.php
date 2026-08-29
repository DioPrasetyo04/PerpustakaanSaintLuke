<?php

namespace Database\Factories;

use App\Models\FineSettings;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\FineSettings>
 */
class FineSettingsFactory extends Factory
{
    protected $model = FineSettings::class;

    /**
     * Define the model's default state.
     *
     * Satu baris konfigurasi denda untuk seluruh sistem perpustakaan.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'late_fee_per_day'     => 1000,       // Rp 1.000 / hari
            'damage_discount_type' => 'percentage',
            'damage_fee_book'      => 50,          // 50% harga buku
            'lost_discount_type'   => 'percentage',
            'lost_fee_book'        => 100,         // 100% harga buku
            'loan_duration_days'   => 14,          // 14 hari masa pinjam
        ];
    }
}
