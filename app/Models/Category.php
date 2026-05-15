<?php

namespace App\Models;

use App\Traits\OptimizesImages;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Category extends Model
{
    /** @use HasFactory<\Database\Factories\CategoryFactory> */
    use HasFactory, SoftDeletes, OptimizesImages;

    protected $table = 'categories';

    protected $fillable = [
        'name',
        'slug',
        'icon',
        'photo',
        'description',
        'is_active',
    ];

    public function books(): BelongsToMany
    {
        return $this->belongsToMany(Book::class, 'book_of_categories', 'category_id', 'book_id');
    }

    public function informations(): HasMany
    {
        return $this->hasMany(Information::class, 'category_id');
    }

    protected $casts = [
        'is_active' => 'boolean'
    ];

    protected static function booted()
    {
        static::saved(function ($model) {
            $model->optimizeImage($model->icon, 500000);
            $model->optimizeImage($model->photo, 2000000);
        });
    }
}
