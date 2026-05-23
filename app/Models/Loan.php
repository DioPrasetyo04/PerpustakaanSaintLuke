<?php

namespace App\Models;

use App\Enums\LoanStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Support\Facades\DB;

class Loan extends Model
{
    /** @use HasFactory<\Database\Factories\LoanFactory> */
    use HasFactory;

    protected $table = 'loans';

    protected $fillable = [
        'user_id',
        'loan_code',
        'status',
    ];

    protected $casts = [
        'status' => LoanStatus::class,
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function loanDetails(): HasMany
    {
        return $this->hasMany(LoanDetail::class, 'loan_id');
    }

    public function books(): BelongsToMany
    {
        return $this->belongsToMany(Book::class, 'loan_details', 'loan_id', 'book_id');
    }

    public function returnBooks(): HasManyThrough
    {
        return $this->hasManyThrough(
            ReturnBook::class,
            LoanDetail::class,
            'loan_id',
            'loan_user_id',
            'id',
            'id'
        );
    }

    public static function hasActiveLoan(int $user_id, int $book_id): bool
    {
        return self::query()
            ->where('user_id', $user_id)
            ->whereHas('loanDetails', fn($q) => $q->where('book_id', $book_id)->whereDoesntHave('returnBook'))
            ->exists();
    }

    public static function hasUserActiveLoan(int $user_id): bool
    {
        return self::query()
            ->where('user_id', $user_id)
            ->whereHas('loanDetails', fn($q) => $q->whereDoesntHave('returnBook'))
            ->exists();
    }

    public static function getActiveLoan(int $userId): ?self
    {
        return self::query()
            ->where('user_id', $userId)
            ->whereHas('loanDetails', fn($q) => $q->whereDoesntHave('returnBook'))
            ->latest()
            ->first();
    }

    public static function hasActiveLoanBySlug(int $userId, string $slug): bool
    {
        return self::query()
            ->where('user_id', $userId)
            ->whereHas(
                'loanDetails',
                fn($q) => $q
                    ->whereDoesntHave('returnBook')
                    ->whereHas('book', fn($b) => $b->where('slug', $slug))
            )
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
        return Stock::query()->whereHas('book', fn($query) => $query->where('id', $book_id))->increment('damaged', 1);
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

    public function recomputeStatus(): LoanStatus
    {
        $total = $this->loanDetails()->count();
        $returnedCount = $this->loanDetails()->whereHas('returnBook')->count();

        $status = match (true) {
            $total === 0 || $returnedCount === 0 => LoanStatus::LOANED,
            $returnedCount === $total            => LoanStatus::RETURNED,
            default                              => LoanStatus::PARTIAL_RETURNED,
        };

        if ($this->status !== $status) {
            $this->status = $status;
            $this->save();
        }

        return $status;
    }
}
