<?php

namespace App\Interface;

use Illuminate\Pagination\LengthAwarePaginator;

interface EventInterfaceRepositories
{
    /**
     * Ambil acara aktif (mendatang lebih dulu) untuk halaman publik, terpaginasi.
     */
    public function getActiveEvents(int $perPage, int $page): LengthAwarePaginator;
}
