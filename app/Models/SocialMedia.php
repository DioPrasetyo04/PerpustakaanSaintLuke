<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class SocialMedia extends Model
{
    /** @use HasFactory<\Database\Factories\SocialMediaFactory> */
    use HasFactory;

    protected $table = 'social_media';

    protected $fillable = [
        'platform',
        'url',
        'label',
        'username',
    ];

    public function socialable(): MorphTo
    {
        return $this->morphTo();
    }
}
