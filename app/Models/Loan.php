<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Facades\DB;

class Loan extends Model
{
    /** @use HasFactory<\Database\Factories\LoanFactory> */
    use HasFactory;

    protected $table = 'loans';

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


    public static function hasActiveLoan(int $user_id, int $book_id): bool
    {
        return self::query()->where('user_id', $user_id)->where('book_id', $book_id)->whereDoesntHave('returnBook')->exists();
    }

    public static function hasUserActiveLoan(int $user_id): bool
    {
        return self::query()->where('user_id', $user_id)->whereDoesntHave('returnBook')->exists();
    }

    public static function hasActiveLoanBySlug(int $userId, string $slug): bool
    {
        return self::query()
            ->where('user_id', $userId)
            ->whereDoesntHave('returnBook')
            ->whereHas('book', fn($q) => $q->where('slug', $slug))
            ->exists();
    }

    public static function substractionStock(int $book_id)
    {
        return Stock::query()->whereHas('book', fn($query) => $query->where('id', $book_id))->where('available', '>', 0)->decrement('available', 1);
    }

    public static function checkStock(int $book_id)
    {
        return Book::query()->where('id', $book_id)->whereHas('stock', fn($query) => $query->where('available', '>', 0))->exists();
    }

    public static function addLoanStock(int $book_id)
    {
        return Stock::query()->whereHas('book', fn($query) => $query->where('id', $book_id))->increment('loan', 1);
    }

    public static function addLostStock(int $book_id)
    {
        return Stock::query()->whereHas('book', fn($query) => $query->where('id', $book_id))->increment('lost', 1);
    }

    public static function addDamageStock(int $book_id)
    {
        return Stock::query()->whereHas('book', fn($query) => $query->where('id', $book_id))->increment('damage', 1);
    }

    public static function rollbacLoanStock(int $bookId)
    {
        return Stock::query()->where('book_id', $bookId)->where('loan', '>', 0)->update([
            'available' => DB::raw('available + 1'),
            'loan' => DB::raw('loan - 1'),
        ]);
    }

    public static function checkUserVerified(int $userId)
    {
        return User::query()
            ->where('id', $userId)
            ->whereNotNull('email_verified_at')
            ->exists();
    }
}
