<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable implements MustVerifyEmail
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, TwoFactorAuthenticatable, HasRoles, SoftDeletes;

    protected $table = 'users';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'username',
        'email',
        'email_verified_at',
        'password',
        'phone',
        'avatar',
        'date_of_birth',
        'address'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'two_factor_secret',
        'two_factor_recovery_codes',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'two_factor_confirmed_at' => 'datetime',
        ];
    }

    public function loans(): HasMany
    {
        return $this->hasMany(Loan::class);
    }

    public function returnBooks(): HasMany
    {
        return $this->hasMany(ReturnBook::class);
    }

    public function fines(): HasMany
    {
        return $this->hasMany(Fine::class);
    }

    public function books(): HasMany
    {
        return $this->hasMany(Book::class, 'added_by');
    }

    public function socialmedia(): MorphMany
    {
        return $this->morphMany(SocialMedia::class, 'socialable');
    }

    public function reviews(): HasMany
    {
        return $this->hasMany(ReviewBook::class);
    }

    public function bookmarks(): BelongsToMany
    {
        return $this->belongsToMany(Book::class, 'bookmarks', 'user_id', 'book_id');
    }
}
