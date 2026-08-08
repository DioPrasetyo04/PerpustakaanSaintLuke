<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class LocationOfBook extends Model
{
    /** @use HasFactory<\Database\Factories\LocationOfBookFactory> */
    use HasFactory;

    protected $fillable = [
        'book_id',
        'location',
    ];

    /**
     * book_id nullable agar data lokasi bisa berdiri sebagai data master
     * (lokasi rak/lantai) tanpa harus terikat ke buku tertentu.
     */
    public function book(): BelongsTo
    {
        return $this->belongsTo(Book::class, 'book_id');
    }

    protected $casts = [
        'book_id'  => 'integer',
        'location' => 'string',
    ];
}
