<?php

namespace App\Services;

use App\Interface\TestimonialInterfaceRepositories;
use Illuminate\Pagination\LengthAwarePaginator;

class TestimonialServices
{
    public function __construct(
        protected TestimonialInterfaceRepositories $testimonialRepository
    ) {}

    /**
     * Paginator testimoni aktif (mentah) untuk halaman publik.
     */
    public function getTestimonialsRaw(int $perPage, int $page): LengthAwarePaginator
    {
        return $this->testimonialRepository->getActiveTestimonials($perPage, $page);
    }

    /**
     * Ubah paginator menjadi struktur { data, meta, links } siap pakai frontend
     * (dengan URL video/poster publik).
     */
    public function transformTestimonials(LengthAwarePaginator $paginator): array
    {
        return paginateMapped($paginator, fn ($testimonial) => [
            'id' => $testimonial->id,
            'name' => $testimonial->name,
            'slug' => $testimonial->slug,
            'role' => $testimonial->role,
            'description' => $testimonial->description,
            'video_url' => $testimonial->video_url,
            'thumbnail_url' => $testimonial->thumbnail_url,
        ]);
    }
}
