<?php

namespace App\Models;

use App\Enums\ReturnBookStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class ReturnBook extends Model
{
    /** @use HasFactory<\Database\Factories\ReturnBookFactory> */
    use HasFactory;

    protected $table = 'return_books';

    protected $fillable = [
        'return_book_code',
        'loan_id',
        'book_id',
        'user_id',
        'return_date',
        'status',
    ];

    protected $casts = [
        'return_date' => 'date',
        'status' => ReturnBookStatus::class,
    ];

    public static function checkUserVerified(int $userId)
    {
        return User::query()
            ->where('id', $userId)
            ->whereNotNull('email_verified_at')
            ->exists();
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function loan(): BelongsTo
    {
        return $this->belongsTo(Loan::class, 'loan_id');
    }

    public function book(): BelongsTo
    {
        return $this->belongsTo(Book::class, 'book_id');
    }

    public function fine(): HasOne
    {
        return $this->hasOne(Fine::class);
    }


    public function returnBookCheck(): HasOne
    {
        return $this->hasOne(ReturnBookCheck::class);
    }

    public function review(): HasOne
    {
        return $this->hasOne(ReviewBook::class);
    }
}
