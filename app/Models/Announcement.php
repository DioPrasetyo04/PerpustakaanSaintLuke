<?php

namespace App\Models;

use App\Enums\Days;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Announcement extends Model
{
    /** @use HasFactory<\Database\Factories\AnnouncementFactory> */
    use HasFactory, SoftDeletes;

    protected $table = 'announcements';

    protected $fillable = [
        'days',
        'title',
        'description',
        'photo',
        'open_time',
        'close_time',
        'is_active',
    ];

    protected $casts = [
        'days'      => Days::class,
        'is_active' => 'boolean',
    ];
}
