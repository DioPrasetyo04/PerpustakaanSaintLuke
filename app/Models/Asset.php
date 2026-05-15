<?php

namespace App\Models;

use App\Enums\ConvertStatusTypes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Asset extends Model
{
    /** @use HasFactory<\Database\Factories\AssetFactory> */
    use HasFactory;

    protected $table = 'assets';

    protected $fillable = [
        'type',
        'utility_path',
        'pdf_path',
        'status',
    ];

    protected $casts = [
        'status' => ConvertStatusTypes::class,
    ];

    public function books(): BelongsToMany
    {
        return $this->belongsToMany(Book::class, 'book_of_assets', 'asset_id', 'book_id');
    }
}
