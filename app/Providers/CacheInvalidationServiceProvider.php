<?php

namespace App\Providers;

use App\Models\Book;
use App\Models\Category;
use App\Models\Event;
use App\Models\Information;
use App\Models\Loan;
use App\Models\LoanDetail;
use App\Models\OrganizationMember;
use App\Models\Publisher;
use App\Models\ReturnBook;
use App\Models\Testimonial;
use App\Models\User;
use App\Support\Cache\CacheTags;
use App\Support\Cache\QueryCache;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\ServiceProvider;

/**
 * Mendengarkan perubahan model lewat Filament/aplikasi lalu mem-flush tag cache
 * (Redis) yang relevan, sehingga data Beranda selalu segar tanpa menunggu TTL.
 *
 * Catatan:
 *  - Visit SENGAJA tidak diobservasi: kunjungan terjadi sangat sering sehingga
 *    flush per-kunjungan akan meniadakan manfaat cache. Counter/chart kunjungan
 *    cukup mengandalkan TTL pendek di HomeRepositories.
 *  - Flush bersifat fail-safe (lihat QueryCache::flush): bila Redis mati, error
 *    hanya dicatat, request tetap berjalan.
 */
class CacheInvalidationServiceProvider extends ServiceProvider
{
    /**
     * Peta model → tag cache yang harus di-flush saat model berubah.
     *
     * Perubahan Buku ikut menyentuh tag CATEGORIES (jumlah buku per kategori)
     * dan CHARTS (grafik agregat).
     *
     * @var array<class-string<Model>, array<int, string>>
     */
    private const MAP = [
        Book::class => [CacheTags::BOOKS, CacheTags::CATEGORIES, CacheTags::CHARTS],
        Category::class => [CacheTags::CATEGORIES, CacheTags::CHARTS],
        Publisher::class => [CacheTags::PUBLISHERS],
        Information::class => [CacheTags::INFORMATIONS],
        Testimonial::class => [CacheTags::TESTIMONIALS],
        Event::class => [CacheTags::EVENTS],
        OrganizationMember::class => [CacheTags::ORGANIZATION],
        User::class => [CacheTags::USERS, CacheTags::CHARTS],
        Loan::class => [CacheTags::LOANS],
        LoanDetail::class => [CacheTags::LOANS],
        ReturnBook::class => [CacheTags::LOANS],
    ];

    public function boot(): void
    {
        foreach (self::MAP as $model => $tags) {
            $flush = static fn () => QueryCache::flush($tags);

            // saved   → create & update
            // deleted → delete (termasuk soft delete) & force delete
            // restored → pulihkan dari soft delete
            $model::saved($flush);
            $model::deleted($flush);

            if (method_exists($model, 'restored')) {
                $model::restored($flush);
            }
        }
    }
}
