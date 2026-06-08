<?php

namespace App\Repositories;

use App\Interface\TestimonialInterfaceRepositories;
use App\Models\Testimonial;
use App\Support\Cache\CacheTags;
use App\Support\Cache\QueryCache;
use Illuminate\Pagination\LengthAwarePaginator;

class TestimonialRepositories implements TestimonialInterfaceRepositories
{
    public function getActiveTestimonials(int $perPage, int $page): LengthAwarePaginator
    {
        return QueryCache::remember(
            "testimonials:list:p{$page}:l{$perPage}",
            [CacheTags::TESTIMONIALS],
            fn (): LengthAwarePaginator => Testimonial::query()
                ->active()
                ->orderBy('sort_order')
                ->orderByDesc('id')
                ->paginate(
                    $perPage,
                    [
                        'id',
                        'name',
                        'slug',
                        'role',
                        'description',
                        'video',
                        'thumbnail',
                    ],
                    'testimonials_page',
                    $page
                )
        );
    }
}
