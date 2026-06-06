<?php

namespace App\Interface;

use Illuminate\Support\Collection;

interface EventInterfaceRepositories
{
    /**
     * Ambil seluruh acara aktif (mendatang lebih dulu) untuk halaman publik.
     */
    public function getActiveEvents(int $limit = 12): Collection;
}
