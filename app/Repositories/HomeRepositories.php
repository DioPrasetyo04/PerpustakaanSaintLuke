<?php

namespace App\Repositories;

use App\Enums\BookStatus;
use App\Enums\PublishedBooks;
use App\Enums\ReturnBookStatus;
use App\Interface\HomeInterfaceRepositories;
use App\Models\Author;
use App\Models\Book;
use App\Models\Category;
use App\Models\Information;
use App\Models\Loan;
use App\Models\User;
use Illuminate\Pagination\LengthAwarePaginator;

class HomeRepositories implements HomeInterfaceRepositories
{
    public function getAllBooksHomePage(array $filters, int $perPage, int $page): LengthAwarePaginator
    {
        return Book::query()
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
            ])
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
    }

    public function getAllCategoriesHomePage(array $filters, int $perPage, int $page): LengthAwarePaginator
    {
        return Category::query()
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
    }

    public function getAllInformationsHomePage(array $filters, int $perPage, int $page): LengthAwarePaginator
    {
        return Information::query()
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
    }

    public function getCountOfAllBooks(): int
    {
        return Book::query()->where('is_published', PublishedBooks::PUBLISH->value)->count();
    }

    public function getCountOfAllAuthors(): int
    {
        return Author::query()->whereNotNull('verified_at')->count();
    }

    public function getCountOfAllUserVerified(): int
    {
        return User::query()->whereNotNull('email_verified_at')->count();
    }

    public function getBorrowChart(): array
    {
        $data = Loan::query()
            ->join('return_books', 'return_books.loan_id', '=', 'loans.id')
            ->where('return_books.status', ReturnBookStatus::RETURNED->value)
            ->selectRaw('DATE_FORMAT(return_books.return_date, "%Y-%m") as ym, COUNT(*) as total')
            ->groupBy('ym')
            ->pluck('total', 'ym')
            ->toArray();

        return formatLast12Months($data, 'loans');
    }

    public function getBookChart(): array
    {
        $data = Book::query()
            ->selectRaw('DATE_FORMAT(created_at, "%Y-%m") as ym, COUNT(*) as total')
            ->where('is_published', PublishedBooks::PUBLISH->value)
            ->groupBy('ym')
            ->pluck('total', 'ym')
            ->toArray();
        return formatLast12Months($data, 'books');
    }

    public function getCategoryPieChart(): array
    {
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
    }

    public function getMemberChart(): array
    {
        $data = User::query()->whereNotNull('email_verified_at')->whereHas('roles', function ($q) {
            $q->whereNotIn('name', ['Admin', 'Pengelola Perpustakaan']);
        })
            ->selectRaw("DATE_FORMAT(created_at, '%Y-%m') as ym, COUNT(*) as total")
            ->groupBy('ym')
            ->pluck('total', 'ym')
            ->toArray();
        return formatLast12Months($data, 'members');
    }
}
