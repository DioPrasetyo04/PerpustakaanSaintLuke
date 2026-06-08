<?php

namespace App\Interface;

use Illuminate\Pagination\LengthAwarePaginator;

interface TestimonialInterfaceRepositories
{
    /**
     * Ambil testimoni aktif untuk halaman publik, terpaginasi.
     */
    public function getActiveTestimonials(int $perPage, int $page): LengthAwarePaginator;
}
