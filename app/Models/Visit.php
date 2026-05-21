<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Visit extends Model
{
    use HasFactory;

    protected $table = 'visits';

    protected $fillable = [
        'user_id',
        'visit_date',
        'type',
        'type_other',
        'note',
    ];

    protected $casts = [
        'visit_date' => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function getTypeLabelAttribute(): string
    {
        if ($this->type === 'other') {
            return $this->type_other ?: 'Lainnya';
        }
        return (string) ($this->type ?: '-');
    }
}
