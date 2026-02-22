<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Loan extends Model
{
    /** @use HasFactory<\Database\Factories\LoanFactory> */
    use HasFactory;

    protected $table = 'laoans';

    protected $fillable = [
        'user_id',
        'book_id',
        'loan_code',
        'loan_date',
        'due_date',
    ];

    protected $casts = [
        'loan_date' => 'date',
        'due_date' => 'date'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function book(): BelongsTo
    {
        return $this->belongsTo(Book::class, 'book_id');
    }

    public function returnBook(): HasOne
    {
        return $this->hasOne(ReturnBook::class, 'loan_id');
    }
}
