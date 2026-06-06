<?php

namespace App\Services;

use App\Interface\EventInterfaceRepositories;

class EventServices
{
    public function __construct(
        protected EventInterfaceRepositories $eventRepository
    ) {}

    /**
     * Daftar acara aktif siap dipakai frontend (tanggal ISO + sisa kursi terhitung).
     *
     * @return array<int, array<string, mixed>>
     */
    public function getEvents(int $limit = 12): array
    {
        return $this->eventRepository
            ->getActiveEvents($limit)
            ->map(fn ($event) => [
                'id' => $event->id,
                'title' => $event->title,
                'slug' => $event->slug,
                'description' => $event->description,
                'category' => $event->category,
                'location' => $event->location,
                'start_at' => optional($event->start_at)->toISOString(),
                'end_at' => optional($event->end_at)->toISOString(),
                'capacity' => $event->capacity,
                'seats_taken' => $event->seats_taken,
                'seats_left' => $event->seats_left,
                'registration_url' => $event->registration_url,
                'thumbnail_url' => $event->thumbnail_url,
            ])
            ->values()
            ->toArray();
    }
}
