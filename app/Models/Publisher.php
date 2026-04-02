<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Publisher extends Model
{
    /** @use HasFactory<\Database\Factories\PublisherFactory> */
    use HasFactory, SoftDeletes;

    protected $table = 'publishers';

    protected $fillable = [
        'name',
        'slug',
        'address',
        'email',
        'phone',
        'logo',
        'is_active',
    ];

    public function books(): HasMany
    {
        return $this->hasMany(Book::class);
    }

    public function socialmedia(): MorphMany
    {
        return $this->morphMany(SocialMedia::class, 'socialable');
    }
}
