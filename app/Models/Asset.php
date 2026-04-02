<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Asset extends Model
{
    /** @use HasFactory<\Database\Factories\AssetFactory> */
    use HasFactory;

    protected $table = 'assets';

    protected $fillable = [
        'book_id',
        'type',
        'utility_path'
    ];

    public function books(): BelongsToMany
    {
        return $this->belongsToMany(Book::class, 'book_of_assets', 'asset_id', 'book_id');
    }
}
