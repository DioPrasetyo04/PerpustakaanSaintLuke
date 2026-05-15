<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Type extends Model
{
    protected $table = 'types';

    protected $fillable = [
        'type',
        'icon',
    ];

    public function books(): BelongsToMany
    {
        return $this->belongsToMany(Book::class, 'book_of_types', 'type_id', 'book_id');
    }
}
