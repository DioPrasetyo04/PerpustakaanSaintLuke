<?php

namespace App\Models;

use App\Enums\ReturnBookStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasOneThrough;

class ReturnBook extends Model
{
    /** @use HasFactory<\Database\Factories\ReturnBookFactory> */
    use HasFactory;

    protected $table = 'return_books';

    protected $fillable = [
        'return_book_code',
        'loan_user_id',
        'return_date',
        'status',
    ];

    protected $casts = [
        'return_date' => 'date',
        'status' => ReturnBookStatus::class,
    ];

    public function loanDetail(): BelongsTo
    {
        return $this->belongsTo(LoanDetail::class, 'loan_user_id');
    }

    public function loan(): HasOneThrough
    {
        return $this->hasOneThrough(
            Loan::class,
            LoanDetail::class,
            'id',
            'id',
            'loan_user_id',
            'loan_id'
        );
    }

    public function book(): HasOneThrough
    {
        return $this->hasOneThrough(
            Book::class,
            LoanDetail::class,
            'id',
            'id',
            'loan_user_id',
            'book_id'
        );
    }

    public function fine(): HasOne
    {
        return $this->hasOne(Fine::class, 'return_book_id');
    }

    public function returnBookCheck(): HasOne
    {
        return $this->hasOne(ReturnBookCheck::class, 'return_book_id');
    }

    public function getUserAttribute(): ?User
    {
        $loan = $this->relationLoaded('loan') ? $this->loan : $this->loan()->first();
        if ($loan) {
            return $loan->relationLoaded('user') ? $loan->user : $loan->user()->first();
        }
        return $this->loanDetail?->loan?->user;
    }

    public function review(): HasOne
    {
        return $this->hasOne(ReviewBook::class, 'return_book_id');
    }

    public static function checkUserVerified(int $userId)
    {
        return User::query()
            ->where('id', $userId)
            ->whereNotNull('email_verified_at')
            ->exists();
    }
}
