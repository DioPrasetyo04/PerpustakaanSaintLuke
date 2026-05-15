<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Language extends Model
{
    /** @use HasFactory<\Database\Factories\LanguageFactory> */
    use HasFactory;

    protected $table = 'languages';

    protected $fillable = [
        'code',
        'language',
        'photo',
    ];

    public function books(): HasMany
    {
        return $this->hasMany(Book::class, 'language_id');
    }
}
