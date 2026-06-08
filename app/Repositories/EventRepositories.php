<?php

namespace App\Repositories;

use App\Interface\EventInterfaceRepositories;
use App\Models\Event;
use App\Support\Cache\CacheTags;
use App\Support\Cache\QueryCache;
use Illuminate\Pagination\LengthAwarePaginator;

class EventRepositories implements EventInterfaceRepositories
{
    public function getActiveEvents(int $perPage, int $page): LengthAwarePaginator
    {
        // TTL pendek (5 mnt) karena seats_taken/kuota bisa berubah; tetap
        // memangkas beban DB untuk kunjungan beruntun ke Beranda.
        return QueryCache::remember(
            "events:list:p{$page}:l{$perPage}",
            [CacheTags::EVENTS],
            fn (): LengthAwarePaginator => Event::query()
                ->active()
                ->orderByRaw('start_at >= NOW() DESC') // acara mendatang lebih dulu
                ->orderBy('sort_order')
                ->orderBy('start_at')
                ->paginate(
                    $perPage,
                    [
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
                    ],
                    'events_page',
                    $page
                ),
            300
        );
    }
}
