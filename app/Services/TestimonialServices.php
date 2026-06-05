<?php

namespace App\Services;

use App\Interface\TestimonialInterfaceRepositories;

class TestimonialServices
{
    public function __construct(
        protected TestimonialInterfaceRepositories $testimonialRepository
    ) {}

    /**
     * Daftar testimoni aktif (siap dipakai frontend, dengan URL video/poster publik).
     *
     * @return array<int, array<string, mixed>>
     */
    public function getTestimonials(): array
    {
        return $this->testimonialRepository
            ->getActiveTestimonials()
            ->map(fn ($testimonial) => [
                'id' => $testimonial->id,
                'name' => $testimonial->name,
                'slug' => $testimonial->slug,
                'role' => $testimonial->role,
                'description' => $testimonial->description,
                'video_url' => $testimonial->video_url,
                'thumbnail_url' => $testimonial->thumbnail_url,
            ])
            ->values()
            ->toArray();
    }
}
