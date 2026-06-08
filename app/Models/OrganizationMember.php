<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class OrganizationMember extends Model
{
    use HasFactory;

    protected $table = 'organization_members';

    protected $fillable = [
        'name',
        'role',
        'specialization',
        'photo',
        'is_featured',
        'is_active',
        'sort_order',
    ];

    protected $casts = [
        'is_featured' => 'boolean',
        'is_active' => 'boolean',
        'sort_order' => 'integer',
    ];

    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true);
    }

    /**
     * URL publik foto anggota. Mendukung path di disk 'public' maupun URL absolut
     * (mis. data seeder/contoh yang memakai tautan eksternal).
     */
    public function getPhotoUrlAttribute(): ?string
    {
        if (! $this->photo) {
            return null;
        }

        return preg_match('#^https?://#i', $this->photo)
            ? $this->photo
            : Storage::url($this->photo);
    }
}
