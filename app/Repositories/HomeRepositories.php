<?php

namespace App\Repositories;

use App\Enums\BookStatus;
use App\Enums\PublishedBooks;
use App\Interface\HomeInterfaceRepositories;
use App\Models\Book;
use App\Models\Category;
use App\Models\Information;
use App\Models\LoanDetail;
use App\Models\Publisher;
use App\Models\User;
use App\Models\Visit;
use App\Support\Cache\CacheTags;
use App\Support\Cache\QueryCache;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

class HomeRepositories implements HomeInterfaceRepositories
{
    public function getAllBooksHomePage(array $filters, int $perPage, int $page): LengthAwarePaginator
    {
        $build = fn (): LengthAwarePaginator => Book::query()
            ->select([
                'id',
                'publisher_id',
                'language_id',
                'book_code',
                'title',
                'slug',
                'status',
                'cover',
                'is_published',
            ])
            ->with([
                'publisher:id,name,slug,logo',
                'categories:id,name,slug,icon',
                'authors:id,name,username,avatar', // cukup ini
                'language:id,language,photo', // cukup ini
                'types:id,type',
            ])
            ->withAvg('reviews as avg_rating', 'rating')
            ->when(
                ($filters['field'] ?? null) && ($filters['direction'] ?? null),
                fn($query) => $query->orderBy($filters['field'], $filters['direction'])
            )

            // SEARCH
            ->when($filters['search'] ?? null, function ($query, $search) {
                $query->where(function ($query) use ($search) {
                    $query->where('title', 'REGEXP', $search)
                        ->orWhere('slug', 'REGEXP', $search)
                        ->orWhere('book_code', 'REGEXP', $search)
                        ->orWhereHas('publisher', fn($q) => $q->where('name', 'REGEXP', $search))
                        ->orWhereHas('authors', fn($q) => $q->where('name', 'REGEXP', $search))
                        ->orWhereHas('categories', fn($q) => $q->where('name', 'REGEXP', $search));
                });
            })

            ->where('is_published', PublishedBooks::PUBLISH->value)
            ->where('status', BookStatus::AVAILABLE->value)

            ->paginate($perPage, ['*'], 'book_page', $page);

        // Hanya cache halaman default (tanpa search/sort kustom).
        if (! QueryCache::isDefaultList($filters)) {
            return $build();
        }

        return QueryCache::remember("books:list:p{$page}:l{$perPage}", [CacheTags::BOOKS], $build);
    }

    public function getTrendingBooks(int $limit = 12): Collection
    {
        return QueryCache::remember("books:trending:{$limit}", [CacheTags::BOOKS], fn (): Collection => Book::query()
            ->select([
                'id',
                'publisher_id',
                'language_id',
                'book_code',
                'title',
                'slug',
                'status',
                'cover',
                'is_published',
                'synopsis',
                'publication_year',
            ])
            ->with([
                'publisher:id,name,slug,logo',
                'categories:id,name,slug,icon',
                'authors:id,name,username,avatar',
                'language:id,language,photo',
                'types:id,type',
            ])
            ->withAvg('reviews as avg_rating', 'rating')
            ->where('is_published', PublishedBooks::PUBLISH->value)
            ->where('status', BookStatus::AVAILABLE->value)
            // Rating tertinggi dulu (tanpa rating dianggap 0/terakhir),
            // bila rating sama urutkan berdasarkan abjad judul.
            ->orderByRaw('COALESCE(avg_rating, 0) DESC')
            ->orderBy('title')
            ->limit($limit)
            ->get());
    }

    public function getSpotlightBook(): ?Book
    {
        return QueryCache::remember('books:spotlight', [CacheTags::BOOKS], fn (): ?Book => Book::query()
            ->select([
                'id',
                'publisher_id',
                'language_id',
                'title',
                'slug',
                'status',
                'cover',
                'synopsis',
                'publication_year',
                'is_published',
                'is_spotlight',
            ])
            ->with([
                'authors:id,name,username,avatar',
                'categories:id,name,slug,icon',
                'types:id,type',
            ])
            ->withAvg('reviews as avg_rating', 'rating')
            ->where('is_published', PublishedBooks::PUBLISH->value)
            ->where('status', BookStatus::AVAILABLE->value)
            // Buku yang ditandai spotlight didahulukan; bila tidak ada,
            // fallback ke rating tertinggi lalu terbaru.
            ->orderByDesc('is_spotlight')
            ->orderByRaw('COALESCE(avg_rating, 0) DESC')
            ->orderByDesc('id')
            ->first());
    }

    public function getAllCategoriesHomePage(array $filters, int $perPage, int $page): LengthAwarePaginator
    {
        $build = fn (): LengthAwarePaginator => Category::query()
            ->select([
                'id',
                'name',
                'slug',
                'icon',
                'photo',
                'description',
                'is_active'
            ])
            ->withCount([
                'books as count_of_books' => function ($q) {
                    $q->where('is_published', PublishedBooks::PUBLISH->value)
                        ->where('status', BookStatus::AVAILABLE->value);
                }
            ])
            ->when(
                ($filters['field'] ?? null) && ($filters['direction'] ?? null),
                fn($query) => $query->orderBy($filters['field'], $filters['direction'])
            )
            ->when($filters['search'] ?? null, function ($query, $search) {
                $query->where(function ($query) use ($search) {
                    $query->where('name', 'REGEXP', $search)
                        ->orWhere('slug', 'REGEXP', $search)
                        ->orWhere('description', 'REGEXP', $search);
                });
            })
            ->where('is_active', true)
            ->paginate($perPage, ['*'], 'category_page', $page);

        if (! QueryCache::isDefaultList($filters)) {
            return $build();
        }

        return QueryCache::remember("categories:list:p{$page}:l{$perPage}", [CacheTags::CATEGORIES], $build);
    }

    public function getAllInformationsHomePage(array $filters, int $perPage, int $page): LengthAwarePaginator
    {
        $build = fn (): LengthAwarePaginator => Information::query()
            ->select([
                'id',
                'image',
                'name',
                'description',
                'slug',
                'category_id',
                'created_at'
            ])
            ->with('category:id,name,icon,slug')
            ->when(
                ($filters['field'] ?? null) && ($filters['direction'] ?? null),
                fn($query) => $query->orderBy($filters['field'], $filters['direction'])
            )
            ->when($filters['search'] ?? null, function ($query, $search) {
                $query->where(function ($query) use ($search) {
                    $query->where('name', 'REGEXP', $search)
                        ->orWhere('slug', 'REGEXP', $search)
                        ->orWhere('description', 'REGEXP', $search)
                        ->orWhereHas('category', fn($q) => $q->where('name', 'REGEXP', $search));
                });
            })
            ->paginate($perPage, ['*'], 'information_page', $page);

        if (! QueryCache::isDefaultList($filters)) {
            return $build();
        }

        return QueryCache::remember("informations:list:p{$page}:l{$perPage}", [CacheTags::INFORMATIONS], $build);
    }

    public function getLiveLoanActivities(int $limit = 16): array
    {
        // TTL pendek (60 dtk) karena bersifat "live", tetap mengurangi beban DB.
        return QueryCache::remember("loans:live:{$limit}", [CacheTags::LOANS], fn (): array => LoanDetail::query()
            ->select(['id', 'loan_id', 'book_id', 'loan_date', 'status'])
            ->with([
                'book:id,title,slug,cover',
                'loan:id,user_id',
                'loan.user:id,name',
            ])
            ->whereHas('book')
            ->whereHas('loan.user')
            ->orderByDesc('loan_date')
            ->orderByDesc('id')
            ->limit($limit)
            ->get()
            ->map(function (LoanDetail $detail) {
                // Privasi: hanya nama depan yang ditampilkan di ticker publik.
                $fullName = $detail->loan?->user?->name ?? 'Anggota';
                $firstName = trim(explode(' ', trim($fullName))[0]) ?: 'Anggota';

                return [
                    'id' => $detail->id,
                    'name' => $firstName,
                    'status' => $detail->status?->value ?? 'borrowed',
                    'title' => $detail->book?->title,
                    'slug' => $detail->book?->slug,
                    'cover' => $detail->book?->cover,
                    'date' => optional($detail->loan_date)->toISOString(),
                ];
            })
            ->filter(fn ($activity) => ! empty($activity['title']))
            ->values()
            ->toArray(), 60);
    }

    public function getFeaturedPublishers(int $perPage, int $page): LengthAwarePaginator
    {
        return QueryCache::remember("publishers:list:p{$page}:l{$perPage}", [CacheTags::PUBLISHERS], fn (): LengthAwarePaginator => Publisher::query()
            ->select(['id', 'name', 'slug', 'address', 'logo'])
            ->where('is_active', true)
            ->withCount(['books as books_count' => function ($q) {
                $q->where('is_published', PublishedBooks::PUBLISH->value);
            }])
            ->orderByDesc('books_count')
            ->orderBy('name')
            ->paginate($perPage, ['*'], 'publishers_page', $page));
    }

    public function getCountOfAllBooks(): int
    {
        return QueryCache::remember('counts:books', [CacheTags::BOOKS], fn (): int => Book::query()->where('is_published', PublishedBooks::PUBLISH->value)->count(), 300);
    }

    public function getCountOfAllVisitors(): int
    {
        return QueryCache::remember('counts:visitors', [CacheTags::VISITS], fn (): int => Visit::query()->count(), 300);
    }

    public function getCountOfAllUserVerified(): int
    {
        return QueryCache::remember('counts:users', [CacheTags::USERS], fn (): int => User::query()->whereNotNull('email_verified_at')->count(), 300);
    }

    public function getVisitChart(): array
    {
        // Chart agregat 12 bulan: berat namun berubah lambat → TTL 30 menit.
        return QueryCache::remember('charts:visits', [CacheTags::VISITS, CacheTags::CHARTS], function (): array {
            $data = Visit::query()
                ->selectRaw('DATE_FORMAT(visit_date, "%Y-%m") as ym, COUNT(*) as total')
                ->groupBy('ym')
                ->pluck('total', 'ym')
                ->toArray();

            return formatLast12Months($data, 'visits');
        }, 1800);
    }

    public function getBookChart(): array
    {
        return QueryCache::remember('charts:books', [CacheTags::BOOKS, CacheTags::CHARTS], function (): array {
            $data = Book::query()
                ->selectRaw('DATE_FORMAT(created_at, "%Y-%m") as ym, COUNT(*) as total')
                ->where('is_published', PublishedBooks::PUBLISH->value)
                ->groupBy('ym')
                ->pluck('total', 'ym')
                ->toArray();

            return formatLast12Months($data, 'books');
        }, 1800);
    }

    public function getCategoryPieChart(): array
    {
        return QueryCache::remember('charts:categories', [CacheTags::CATEGORIES, CacheTags::CHARTS], function (): array {
            $data = Category::query()
                ->withCount([
                    'books as total' => function ($q) {
                        $q->where('is_published', PublishedBooks::PUBLISH->value);
                    }
                ])->get(['name']);
            $total = $data->sum('total');
            if ($total === 0) {
                return [];
            }

            return $data
                ->filter(fn($item) => $item->total > 0)
                ->map(fn($item) => [
                    'name' => $item->name,
                    'value' => round(($item->total / $total) * 100)
                ])->values()->toArray();
        }, 1800);
    }

    public function getMemberChart(): array
    {
        return QueryCache::remember('charts:members', [CacheTags::USERS, CacheTags::CHARTS], function (): array {
            $data = User::query()->whereNotNull('email_verified_at')->whereHas('roles', function ($q) {
                $q->whereNotIn('name', ['Admin', 'Pengelola Perpustakaan']);
            })
                ->selectRaw("DATE_FORMAT(created_at, '%Y-%m') as ym, COUNT(*) as total")
                ->groupBy('ym')
                ->pluck('total', 'ym')
                ->toArray();

            return formatLast12Months($data, 'members');
        }, 1800);
    }
}
