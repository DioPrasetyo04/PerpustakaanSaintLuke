<?php

namespace App\Interface;

use Illuminate\Support\Collection;

interface TestimonialInterfaceRepositories
{
    /**
     * Ambil seluruh testimoni aktif untuk ditampilkan di halaman publik.
     */
    public function getActiveTestimonials(): Collection;
}
