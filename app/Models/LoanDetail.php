<?php

namespace App\Models;

use App\Enums\LoanBookStatus;
use App\Enums\LoanType;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasOneThrough;

class LoanDetail extends Model
{
    use HasFactory;

    protected $table = 'loan_details';

    public $timestamps = false;

    protected $fillable = [
        'loan_id',
        'book_id',
        'loan_date',
        'due_date',
        'status',
        'loan_type',
    ];

    protected $casts = [
        'loan_date' => 'date',
        'due_date' => 'date',
        'status' => LoanBookStatus::class,
        'loan_type' => LoanType::class,
    ];

    /**
     * Kecualikan detail peminjaman bertipe digital. Data tetap tersimpan di
     * database, hanya tidak ikut ditampilkan/diproses (laporan & tabel).
     * Nilai null diperlakukan sebagai fisik.
     */
    public function scopeExcludeDigital($query)
    {
        return $query->where(function ($q) {
            $q->where('loan_type', '!=', LoanType::DIGITAL->value)
                ->orWhereNull('loan_type');
        });
    }

    public function loan(): BelongsTo
    {
        return $this->belongsTo(Loan::class, 'loan_id');
    }

    public function book(): BelongsTo
    {
        return $this->belongsTo(Book::class, 'book_id');
    }

    public function returnBook(): HasOne
    {
        return $this->hasOne(ReturnBook::class, 'loan_user_id');
    }

    public function review(): HasOne
    {
        return $this->hasOne(ReviewBook::class, 'loan_user_id');
    }

    public function user(): HasOneThrough
    {
        return $this->hasOneThrough(
            User::class,
            Loan::class,
            'id',
            'id',
            'loan_id',
            'user_id'
        );
    }
}
