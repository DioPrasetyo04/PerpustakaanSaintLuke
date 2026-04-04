<?php

namespace App\Models;

use Filament\Notifications\Notification;
use Filament\Support\Exceptions\Halt;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Stock extends Model
{
    /** @use HasFactory<\Database\Factories\StockFactory> */
    use HasFactory;

    protected $table = 'stocks';

    protected $fillable = [
        'book_id',
        'total',
        'available',
        'loan',
        'lost',
        'damaged'
    ];

    protected static function booted()
    {
        static::saving(function ($stock) {

            $total = (int) $stock->total;
            $available = (int) $stock->available;
            $loan = (int) $stock->loan;
            $lost = (int) $stock->lost;
            $damaged = (int) $stock->damaged;

            $sum = $available + $loan + $lost + $damaged;

            if ($sum !== $total) {

                Notification::make()
                    ->title('Stock tidak valid')
                    ->body("Total buku harus {$sum}, bukan {$total}, karena available {$available} + loan {$loan} + lost {$lost} + damage {$damaged} = {$sum}")
                    ->danger()
                    ->persistent()
                    ->send();

                throw new Halt();
            }
        });
    }

    public function book(): BelongsTo
    {
        return $this->belongsTo(Book::class, 'book_id');
    }
}
