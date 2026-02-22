<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FineSettings extends Model
{
    /** @use HasFactory<\Database\Factories\FineSettingsFactory> */
    use HasFactory;

    protected $table = 'fine_settings';

    protected $fillable = [
        'late_discount_type',
        'late_fee_per_day',
        'damage_discount_type',
        'damage_fee_book',
        'lost_discount_type',
        'lost_fee_book'
    ];
}
