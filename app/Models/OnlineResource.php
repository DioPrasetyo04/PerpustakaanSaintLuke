<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OnlineResource extends Model
{
    use HasFactory;

    protected $table = 'online_resources';

    protected $fillable = [
        'title',
        'slug',
        'type',
        'format',
        'tag',
        'description',
        'url',
        'palette',
        'is_active',
        'sort_order',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'palette' => 'integer',
        'sort_order' => 'integer',
    ];

    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true);
    }
}
