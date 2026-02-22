<?php

namespace App\Models;

use App\Enums\BookCondition;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ReturnBookCheck extends Model
{
    /** @use HasFactory<\Database\Factories\ReturnBookChecksFactory> */
    use HasFactory;

    protected $fillable = [
        'return_book_id',
        'condition',
        'notes'
    ];

    protected $casts = [
        'condition' => BookCondition::class
    ];

    public function returnBook(): BelongsTo
    {
        return $this->belongsTo(ReturnBook::class, 'return_book_id');
    }
}
