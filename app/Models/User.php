<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
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

    protected $fillable = [
        'name',
        'username',
        'email',
        'email_verified_at',
        'password',
        'phone',
        'avatar',
        'date_of_birth',
        'address',
    ];

    protected $hidden = [
        'password',
        'two_factor_secret',
        'two_factor_recovery_codes',
        'remember_token',
    ];

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
        return $this->hasMany(Loan::class, 'user_id');
    }

    public function loanDetails(): HasManyThrough
    {
        return $this->hasManyThrough(
            LoanDetail::class,
            Loan::class,
            'user_id',
            'loan_id',
            'id',
            'id'
        );
    }

    public function books(): HasMany
    {
        return $this->hasMany(Book::class, 'added_by');
    }

    public function bookmarks(): BelongsToMany
    {
        return $this->belongsToMany(Book::class, 'bookmarks', 'user_id', 'book_id');
    }

    public function socialmedia(): MorphMany
    {
        return $this->morphMany(SocialMedia::class, 'socialable');
    }
}
