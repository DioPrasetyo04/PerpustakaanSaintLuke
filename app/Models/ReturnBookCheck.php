<?php

namespace App\Models;

use App\Enums\BookCondition;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\DB;

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

    public static function addReturnStock(int $book_id)
    {
        return Stock::query()->where('book_id', $book_id)->where('loan', '>', 0)->update([
            'available' => DB::raw('available + 1'),
            'loan' => DB::raw('loan - 1'),
        ]);
    }

    public static function addDamagedStock(int $book_id)
    {
        return Stock::query()->where('book_id', $book_id)->where('loan', '>', 0)->update([
            'loan' => DB::raw('loan - 1'),
            'damaged' => DB::raw('damaged + 1'),
        ]);
    }

    public static function addLostStock(int $book_id)
    {
        return Stock::query()->where('book_id', $book_id)->where('loan', '>', 0)->update([
            'loan' => DB::raw('loan - 1'),
            'lost' => DB::raw('lost + 1'),
        ]);
    }
}
