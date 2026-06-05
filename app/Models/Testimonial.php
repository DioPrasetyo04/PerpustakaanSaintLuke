<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Testimonial extends Model
{
    use HasFactory;

    protected $table = 'testimonials';

    protected $fillable = [
        'name',
        'slug',
        'description',
        'role',
        'video',
        'thumbnail',
        'is_active',
        'sort_order',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'sort_order' => 'integer',
    ];

    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true);
    }

    /**
     * URL publik video. Mendukung path di disk 'public' maupun URL absolut
     * (mis. data seeder/contoh yang memakai tautan eksternal).
     */
    public function getVideoUrlAttribute(): ?string
    {
        return $this->toPublicUrl($this->video);
    }

    /**
     * URL publik thumbnail/poster video.
     */
    public function getThumbnailUrlAttribute(): ?string
    {
        return $this->toPublicUrl($this->thumbnail);
    }

    /**
     * Kembalikan URL apa adanya bila sudah absolut, selain itu via Storage::url.
     */
    protected function toPublicUrl(?string $value): ?string
    {
        if (! $value) {
            return null;
        }

        return preg_match('#^https?://#i', $value) ? $value : Storage::url($value);
    }
}
