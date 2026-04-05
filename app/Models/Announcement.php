<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Announcement extends Model
{
    /** @use HasFactory<\Database\Factories\AnnouncementFactory> */
    use HasFactory, SoftDeletes;

    protected $table = 'announcements';

    protected $fillable = [
        'photo',
        'message',
        'url',
        'is_active',
    ];
}
