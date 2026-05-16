<?php

namespace App\Models;

use App\Enums\UserGender;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Spatie\Permission\Traits\HasRoles;

class Author extends Model
{
    /** @use HasFactory<\Database\Factories\AuthorsFactory> */
    use HasFactory, HasRoles;

    protected $table = 'authors';

    protected $guard_name = 'web';

    protected $fillable = [
        'name',
        'username',
        'phone',
        'gender',
        'date_of_birth',
        'nationality',
        'avatar',
        'bio',
        'verified_at'
    ];

    protected $cast = [
        'gender' => UserGender::class,
    ];

    public function books(): BelongsToMany
    {
        return $this->belongsToMany(Book::class, 'author_of_books', 'author_id', 'book_id');
    }

    public function socialmedia(): MorphMany
    {
        return $this->morphMany(SocialMedia::class, 'socialable');
    }
}
