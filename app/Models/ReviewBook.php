<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ReviewBook extends Model
{
    /** @use HasFactory<\Database\Factories\ReviewBookFactory> */
    use HasFactory;

    protected $table = 'review_books';

    protected $fillable = [
        'book_id',
        'user_id',
        'return_book_id',
        'rating',
        'comment',
    ];

    public function book(): BelongsTo
    {
        return $this->belongsTo(Book::class, 'book_id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }


    public function returnBook(): BelongsTo
    {
        return $this->belongsTo(ReturnBook::class, 'return_book_id');
    }
}
