<?php

namespace App\Models;

use App\Enums\PaymentStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Fine extends Model
{
    /** @use HasFactory<\Database\Factories\FineFactory> */
    use HasFactory;

    protected $table = 'fines';

    protected $fillable = [
        'return_book_id',
        'user_id',
        'late_fee',
        'other_fee',
        'total_fee',
        'fine_date',
        'payment_method',
        'payment_status',
        'order_id',
    ];

    protected $casts = [
        'payment_status' => PaymentStatus::class,
        'fine_date' => 'date'
    ];

    public function returnBook(): BelongsTo
    {
        return $this->belongsTo(ReturnBook::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
