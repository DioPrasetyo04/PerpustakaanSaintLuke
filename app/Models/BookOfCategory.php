<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class BookOfCategory extends Model
{
    /** @use HasFactory<\Database\Factories\BookOfCategoryFactory> */
    use HasFactory;

    protected $table = 'book_of_categories';

    protected $fillable = [
        'book_id',
        'category_id',
    ];

    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(Category::class, 'categories', 'category_id', 'id');
    }

    public function books(): BelongsToMany
    {
        return $this->belongsToMany(Book::class, 'books', 'book_id', 'id');
    }
}
