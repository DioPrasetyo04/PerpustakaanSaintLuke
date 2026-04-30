<?php

namespace App\Models;

use App\Enums\DiscountType;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FineSettings extends Model
{
    /** @use HasFactory<\Database\Factories\FineSettingsFactory> */
    use HasFactory;

    protected $table = 'fine_settings';

    protected $fillable = [
        'late_fee_per_day',
        'damage_discount_type',
        'damage_fee_book',
        'lost_discount_type',
        'lost_fee_book',
        'loan_duration_days'
    ];

    protected function casts(): array
    {
        return [
            // 'late_discount_type' => DiscountType::class,
            'damage_discount_type' => DiscountType::class,
            'lost_discount_type' => DiscountType::class,
            'loan_duration_days' => 'integer'
        ];
    }

    public static function checkSettings()
    {
        return self::query()->firstOrFail();
    }
}
