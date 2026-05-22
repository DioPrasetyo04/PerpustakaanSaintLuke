<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Visit extends Model
{
    use HasFactory;

    protected $table = 'visits';

    protected $fillable = [
        'user_id',
        'name',
        'address',
        'visit_date',
        'type',
        'type_other',
        'needs',
        'note',
    ];

    protected $casts = [
        'visit_date' => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function getTypeLabelAttribute(): string
    {
        if ($this->type === 'other') {
            return $this->type_other ?: 'Lainnya';
        }
        return (string) ($this->type ?: '-');
    }

    /**
     * Apakah kunjungan untuk pengunjung ini sudah tercatat HARI INI (1 pengunjung 1x/hari).
     * - Pengguna terdaftar dicek berdasarkan user_id.
     * - Tamu (tanpa user_id) dicek berdasarkan nama (case-insensitive).
     * $ignoreId untuk mengabaikan record saat ini (mis. ketika sedang diedit).
     */
    public static function recordedToday(?int $userId, ?string $name = null, ?int $ignoreId = null): bool
    {
        $today = Carbon::today('Asia/Jakarta')->toDateString();

        $query = static::query()
            ->whereDate('visit_date', $today)
            ->when($ignoreId, fn($q) => $q->whereKeyNot($ignoreId));

        if ($userId) {
            return $query->where('user_id', $userId)->exists();
        }

        if (filled($name)) {
            return $query
                ->whereNull('user_id')
                ->whereRaw('LOWER(name) = ?', [mb_strtolower(trim($name))])
                ->exists();
        }

        return false;
    }
}
