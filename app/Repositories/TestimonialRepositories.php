<?php

namespace App\Repositories;

use App\Interface\TestimonialInterfaceRepositories;
use App\Models\Testimonial;
use Illuminate\Support\Collection;

class TestimonialRepositories implements TestimonialInterfaceRepositories
{
    public function getActiveTestimonials(): Collection
    {
        return Testimonial::query()
            ->active()
            ->orderBy('sort_order')
            ->orderByDesc('id')
            ->get([
                'id',
                'name',
                'slug',
                'role',
                'description',
                'video',
                'thumbnail',
            ]);
    }
}
