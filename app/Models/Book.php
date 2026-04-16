<?php

namespace App\Models;

use App\Enums\BookStatus;
use App\Enums\PublishedBooks;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;

class Book extends Model
{
    /** @use HasFactory<\Database\Factories\BookFactory> */
    use HasFactory, SoftDeletes;

    protected $table = 'books';

    protected $fillable = [
        'publisher_id',
        'added_by',
        'language_id',
        'book_code',
        'title',
        'slug',
        'publication_year',
        'isbn',
        'synopsis',
        'number_of_pages',
        'status',
        'cover',
        'price',
        'is_published',
    ];

    protected $casts = [
        'publication_year' => 'date',
        'number_of_pages' => 'integer',
        'price' => 'integer',
        'status' => BookStatus::class,
        'is_published' => PublishedBooks::class
    ];

    public function publisher(): BelongsTo
    {
        return $this->belongsTo(Publisher::class);
    }

    public function addedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'added_by');
    }

    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(Category::class, 'book_of_categories', 'book_id', 'category_id');
    }

    public function assets(): BelongsToMany
    {
        return $this->belongsToMany(Asset::class, 'book_of_assets', 'book_id', 'asset_id');
    }

    public function loan(): HasMany
    {
        return $this->hasMany(Loan::class);
    }

    public function stock(): HasOne
    {
        return $this->hasOne(Stock::class);
    }

    public function language(): BelongsTo
    {
        return $this->belongsTo(Language::class, 'language_id');
    }

    public function authors(): BelongsToMany
    {
        return $this->belongsToMany(Author::class, 'author_of_books', 'book_id', 'author_id');
    }

    public function reviews(): HasMany
    {
        return $this->hasMany(ReviewBook::class);
    }

    public function bookmarks(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'bookmarks', 'book_id', 'user_id');
    }
}
