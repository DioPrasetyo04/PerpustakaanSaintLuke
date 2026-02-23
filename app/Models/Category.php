<?php

namespace App\Models;

use App\Traits\OptimizesImages;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
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

    public function Books(): HasMany
    {
        return $this->hasMany(BookOfCategory::class);
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
