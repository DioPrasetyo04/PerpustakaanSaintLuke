<?php

namespace App\Services;

use App\Interface\EventInterfaceRepositories;
use Illuminate\Pagination\LengthAwarePaginator;

class EventServices
{
    public function __construct(
        protected EventInterfaceRepositories $eventRepository
    ) {}

    /**
     * Paginator acara aktif (mentah) untuk halaman publik.
     */
    public function getEventsRaw(int $perPage, int $page): LengthAwarePaginator
    {
        return $this->eventRepository->getActiveEvents($perPage, $page);
    }

    /**
     * Ubah paginator menjadi struktur { data, meta, links } siap pakai frontend
     * (tanggal ISO + sisa kursi terhitung).
     */
    public function transformEvents(LengthAwarePaginator $paginator): array
    {
        return paginateMapped($paginator, fn ($event) => [
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
        ]);
    }
}
