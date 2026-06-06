<?php

namespace App\Repositories;

use App\Interface\EventInterfaceRepositories;
use App\Models\Event;
use Illuminate\Support\Collection;

class EventRepositories implements EventInterfaceRepositories
{
    public function getActiveEvents(int $limit = 12): Collection
    {
        return Event::query()
            ->active()
            ->orderByRaw('start_at >= NOW() DESC') // acara mendatang lebih dulu
            ->orderBy('sort_order')
            ->orderBy('start_at')
            ->limit($limit)
            ->get([
                'id',
                'title',
                'slug',
                'description',
                'category',
                'location',
                'start_at',
                'end_at',
                'capacity',
                'seats_taken',
                'registration_url',
                'thumbnail',
            ]);
    }
}
