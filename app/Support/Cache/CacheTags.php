<?php

namespace App\Support\Cache;

/**
 * Daftar tag cache (Redis) untuk data Beranda/publik.
 *
 * Tiap entitas punya tag sendiri sehingga saat data diubah lewat Filament,
 * hanya cache yang relevan yang di-flush (lihat CacheInvalidationServiceProvider).
 */
final class CacheTags
{
    public const BOOKS = 'books';

    public const CATEGORIES = 'categories';

    public const PUBLISHERS = 'publishers';

    public const INFORMATIONS = 'informations';

    public const TESTIMONIALS = 'testimonials';

    public const EVENTS = 'events';

    public const ORGANIZATION = 'organization';

    public const VISITS = 'visits';

    public const USERS = 'users';

    public const LOANS = 'loans';

    public const CHARTS = 'charts';
}
