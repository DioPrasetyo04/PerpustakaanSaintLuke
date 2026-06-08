<?php

namespace App\Support\Cache;

use Closure;
use Illuminate\Cache\TaggedCache;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Throwable;

/**
 * Pembungkus cache berbasis Redis + tag untuk query read-heavy (Beranda dsb).
 *
 * Karakteristik:
 *  - Memakai store "redis" SECARA EKSPLISIT, tanpa mengubah CACHE_STORE global,
 *    sehingga session/queue/lock tetap aman bila Redis bermasalah.
 *  - Tag-based invalidation: flush per-entitas saat data berubah.
 *  - Fail-safe: bila Redis mati / belum terpasang, otomatis fallback ke query
 *    langsung sehingga situs tetap hidup (hanya kehilangan akselerasi cache).
 */
final class QueryCache
{
    /** Nama store cache yang dipakai (lihat config/cache.php). */
    public const STORE = 'redis';

    /** TTL default: 10 menit. */
    public const TTL = 600;

    /** Prefix logis agar key mudah dikenali di Redis. */
    private const PREFIX = 'home';

    /**
     * Ambil dari cache bila ada, jika tidak jalankan $callback lalu simpan.
     *
     * @template T
     *
     * @param  array<int, string>  $tags
     * @param  Closure(): T  $callback
     * @return T
     */
    public static function remember(string $key, array $tags, Closure $callback, ?int $ttl = null): mixed
    {
        $ttl ??= self::TTL;

        try {
            return self::tagged($tags)->remember(self::key($key), $ttl, $callback);
        } catch (Throwable $e) {
            // Redis tidak tersedia → jangan jatuhkan request, jalankan query langsung.
            Log::warning('[QueryCache] fallback ke query langsung: '.$e->getMessage());

            return $callback();
        }
    }

    /**
     * Hapus seluruh cache yang memiliki salah satu tag berikut.
     *
     * @param  array<int, string>  $tags
     */
    public static function flush(array $tags): void
    {
        try {
            self::tagged($tags)->flush();
        } catch (Throwable $e) {
            Log::warning('[QueryCache] gagal flush tags ['.implode(',', $tags).']: '.$e->getMessage());
        }
    }

    /**
     * List dianggap "default" (aman di-cache) bila tanpa pencarian & tanpa
     * sort kustom. Pencarian/sort bebas tidak di-cache agar key tak meledak.
     *
     * @param  array<string, mixed>  $filters
     */
    public static function isDefaultList(array $filters): bool
    {
        return empty($filters['search'])
            && empty($filters['field'])
            && empty($filters['direction']);
    }

    /**
     * @param  array<int, string>  $tags
     */
    private static function tagged(array $tags): TaggedCache
    {
        return Cache::store(self::STORE)->tags($tags);
    }

    private static function key(string $key): string
    {
        return self::PREFIX.':'.$key;
    }
}
