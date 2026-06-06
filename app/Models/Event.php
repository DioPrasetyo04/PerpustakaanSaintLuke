<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Event extends Model
{
    use HasFactory;

    protected $table = 'events';

    protected $fillable = [
        'title',
        'slug',
        'description',
        'category',
        'location',
        'start_at',
        'end_at',
        'capacity',
        'seats_taken',
        'registration_url',
        'thumbnail',
        'is_active',
        'sort_order',
    ];

    protected $casts = [
        'start_at' => 'datetime',
        'end_at' => 'datetime',
        'capacity' => 'integer',
        'seats_taken' => 'integer',
        'is_active' => 'boolean',
        'sort_order' => 'integer',
    ];

    /** Acara aktif untuk ditampilkan di halaman publik. */
    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true);
    }

    /** Acara yang belum lewat (selesai/atau mulai di masa depan). */
    public function scopeUpcoming(Builder $query): Builder
    {
        return $query->where(function (Builder $q) {
            $q->whereNull('end_at')
                ->where('start_at', '>=', now()->startOfDay())
                ->orWhere('end_at', '>=', now());
        });
    }

    /** Sisa kursi; null bila kapasitas tidak dibatasi. */
    public function getSeatsLeftAttribute(): ?int
    {
        if ($this->capacity === null) {
            return null;
        }

        return max(0, $this->capacity - $this->seats_taken);
    }

    /** URL publik poster acara. Mendukung path disk 'public' maupun URL absolut. */
    public function getThumbnailUrlAttribute(): ?string
    {
        if (! $this->thumbnail) {
            return null;
        }

        return preg_match('#^https?://#i', $this->thumbnail)
            ? $this->thumbnail
            : Storage::url($this->thumbnail);
    }
}
