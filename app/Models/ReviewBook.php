<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOneThrough;

class ReviewBook extends Model
{
    /** @use HasFactory<\Database\Factories\ReviewBookFactory> */
    use HasFactory;

    protected $table = 'review_books';

    protected $fillable = [
        'loan_user_id',
        'return_book_id',
        'rating',
        'comment',
    ];

    protected $casts = [
        'rating' => 'decimal:1',
    ];

    public function loanDetail(): BelongsTo
    {
        return $this->belongsTo(LoanDetail::class, 'loan_user_id');
    }

    public function returnBook(): BelongsTo
    {
        return $this->belongsTo(ReturnBook::class, 'return_book_id');
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
}
