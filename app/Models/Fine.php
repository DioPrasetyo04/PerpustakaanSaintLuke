<?php

namespace App\Models;

use App\Enums\PaymentStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\User;

class Fine extends Model
{
    /** @use HasFactory<\Database\Factories\FineFactory> */
    use HasFactory;

    protected $table = 'fines';

    protected $fillable = [
        'return_book_id',
        'order_id',
        'late_fee',
        'other_fee',
        'total_fee',
        'fine_date',
        'payment_method',
        'payment_status',
    ];

    protected $casts = [
        'payment_status' => PaymentStatus::class,
        'fine_date' => 'date',
        'late_fee' => 'decimal:2',
        'other_fee' => 'decimal:2',
        'total_fee' => 'decimal:2',
    ];

    public function returnBook(): BelongsTo
    {
        return $this->belongsTo(ReturnBook::class, 'return_book_id');
    }

    public function getUserAttribute(): ?User
    {
        return $this->returnBook?->loanDetail?->loan?->user;
    }

    public static function hasUnpaidFine(int $userId): bool
    {
        return self::query()
            ->whereIn('payment_status', [
                PaymentStatus::PENDING->value,
                PaymentStatus::FAILED->value,
                PaymentStatus::ERROR->value,
            ])
            ->whereHas('returnBook.loanDetail.loan', fn($q) => $q->where('user_id', $userId))
            ->exists();
    }
}
