<?php

namespace App\Repositories;

use App\Enums\BookStatus;
use App\Enums\PublishedBooks;
use App\Interface\CatalogInterfaceRepositories;
use App\Models\Author;
use App\Models\Book;
use App\Models\Category;
use App\Models\Publisher;
use Illuminate\Pagination\LengthAwarePaginator;

class CatalogRepositories implements CatalogInterfaceRepositories
{
    public function getAllBooks(array $filters, int $perPage, int $page): LengthAwarePaginator
    {
        return Book::query()
            ->select([
                'id',
                'publisher_id',
                'language_id',
                'title',
                'slug',
                'status',
                'cover',
                'is_published',
            ])->with([
                'publisher:id,name,logo',
                'categories:id,name,icon',
                'authors:id,name,username,avatar', // cukup ini
                'language:id,language,photo', // cukup ini
            ])->when(
                ($filters['field'] ?? null) && ($filters['direction'] ?? null),
                fn($query) => $query->orderBy($filters['field'], $filters['direction'])
            )->when($filters['search'] ?? null, function ($query, $search) {
                $query->where(function ($query) use ($search) {
                    $query->where('title', 'REGEXP', $search)
                        ->orWhere('slug', 'REGEXP', $search)
                        ->orWhereHas('publisher', fn($q) => $q->where('name', 'REGEXP', $search))
                        ->orWhereHas('authors', fn($q) => $q->where('name', 'REGEXP', $search))
                        ->orWhereHas('categories', fn($q) => $q->where('name', 'REGEXP', $search));
                });
            })
            ->where('is_published', PublishedBooks::PUBLISH->value)
            ->where('status', BookStatus::AVAILABLE->value)
            ->paginate($perPage, ['*'], 'books_page', $page);
    }
    public function getAllCategories(array $filters, int $perPage, int $page): LengthAwarePaginator
    {
        return Category::query()
            ->select(['id', 'name', 'slug', 'icon'])
            ->withCount('books as count_of_books')
            ->when(
                ($filters['field'] ?? null) && ($filters['direction'] ?? null),
                fn($query) => $query->orderBy($filters['field'], $filters['direction'])
            )->when($filters['search'] ?? null, function ($query, $search) {
                $query->where(function ($query) use ($search) {
                    $query->where('name', 'REGEXP', $search)
                        ->orWhere('slug', 'REGEXP', $search);
                });
            })
            ->paginate($perPage, ['*'], 'categories_page', $page);
    }
    public function getAllAuthors(array $filters, int $perPage, int $page): LengthAwarePaginator
    {
        return Author::query()->select(['id', 'name', 'username', 'avatar'])->withCount('books as count_of_books')
            ->when(
                ($filters['field'] ?? null) && ($filters['direction'] ?? null),
                fn($query) => $query->orderBy($filters['field'], $filters['direction'])
            )->when($filters['search'] ?? null, function ($query, $search) {
                $query->where(function ($query) use ($search) {
                    $query->where('name', 'REGEXP', $search)
                        ->orWhere('username', 'REGEXP', $search);
                });
            })
            ->paginate($perPage, ['*'], 'authors_page', $page);
    }
    public function getAllPublishers(array $filters, int $perPage, int $page): LengthAwarePaginator
    {
        return Publisher::query()->select(['id', 'name', 'address', 'slug', 'logo'])->withCount('books as count_of_books')
            ->when(
                ($filters['field'] ?? null) && ($filters['direction'] ?? null),
                fn($query) => $query->orderBy($filters['field'], $filters['direction'])
            )->when($filters['search'] ?? null, function ($query, $search) {
                $query->where(function ($query) use ($search) {
                    $query->where('name', 'REGEXP', $search)
                        ->orWhere('slug', 'REGEXP', $search);
                });
            })
            ->paginate($perPage, ['*'], 'publishers_page', $page);
    }

    public function getBooksByCategory(
        string $categorySlug,
        array $filters,
        int $perPage,
        int $page
    ): LengthAwarePaginator {

        return Book::query()
            ->select([
                'id',
                'publisher_id',
                'language_id',
                'title',
                'slug',
                'status',
                'cover',
                'is_published',
            ])
            ->with([
                'publisher:id,name,logo',
                'categories:id,name,slug,icon',
                'authors:id,name,username',
                'language:id,language,photo',
            ])
            ->where('is_published', PublishedBooks::PUBLISH->value)
            ->where('status', BookStatus::AVAILABLE->value)

            ->whereHas('categories', function ($q) use ($categorySlug) {
                $q->where('slug', $categorySlug);
            })

            ->when($filters['search'] ?? null, function ($query, $search) {
                $query->where(function ($query) use ($search) {
                    $query->where('title', 'REGEXP', $search)
                        ->orWhere('slug', 'REGEXP', $search)
                        ->orWhere('status', 'LIKE', "%{$search}%")
                        ->orWhereHas('publisher', function ($q) use ($search) {
                            $q->where('name', 'REGEXP', $search);
                        })
                        ->orWhereHas('categories', function ($q) use ($search) {
                            $q->where('name', 'REGEXP', $search);
                        })
                        ->orWhereHas('authors', function ($q) use ($search) {
                            $q->where('name', 'REGEXP', $search);
                        })
                        ->orWhereHas('language', function ($q) use ($search) {
                            $q->where('language', 'REGEXP', $search);
                        });
                });
            })

            ->paginate($perPage, ['*'], 'category_books_page', $page);
    }

    public function getBooksByAuthor(string $authorUsername, array $filters, int $perPage, int $page): LengthAwarePaginator
    {
        return Book::query()
            ->select([
                'id',
                'publisher_id',
                'language_id',
                'title',
                'slug',
                'status',
                'cover',
                'is_published',
            ])
            ->with([
                'publisher:id,name,logo',
                'categories:id,name,slug,icon',
                'authors:id,name,username,avatar',
                'language:id,language,photo',
            ])
            ->where('is_published', PublishedBooks::PUBLISH->value)
            ->where('status', BookStatus::AVAILABLE->value)

            ->whereHas('authors', function ($q) use ($authorUsername) {
                $q->where('username', $authorUsername);
            })

            ->when($filters['search'] ?? null, function ($query, $search) {
                $query->where(function ($query) use ($search) {
                    $query->where('title', 'REGEXP', $search)
                        ->orWhere('slug', 'REGEXP', $search)
                        ->orWhere('status', 'REGEXP', $search)
                        ->orWhereHas('publisher', function ($q) use ($search) {
                            $q->where('name', 'REGEXP', $search);
                        })
                        ->orWhereHas('categories', function ($q) use ($search) {
                            $q->where('name', 'REGEXP', $search);
                        })
                        ->orWhereHas('authors', function ($q) use ($search) {
                            $q->where('name', 'REGEXP', $search);
                        })
                        ->orWhereHas('language', function ($q) use ($search) {
                            $q->where('language', 'REGEXP', $search);
                        });
                });
            })

            ->paginate($perPage, ['*'], 'author_books_page', $page);
    }
    public function getBooksByPublisher(string $publisherSlug, array $filters, int $perPage, int $page): LengthAwarePaginator
    {
        return Book::query()
            ->select([
                'id',
                'publisher_id',
                'language_id',
                'title',
                'slug',
                'status',
                'cover',
                'is_published',
            ])
            ->with([
                'publisher:id,name,slug,logo',
                'categories:id,name,slug,icon',
                'authors:id,name,username,avatar',
                'language:id,language,photo',
            ])
            ->where('is_published', PublishedBooks::PUBLISH->value)
            ->where('status', BookStatus::AVAILABLE->value)

            ->whereHas('publisher', function ($q) use ($publisherSlug) {
                $q->where('slug', $publisherSlug);
            })

            ->when($filters['search'] ?? null, function ($query, $search) {
                $query->where(function ($query) use ($search) {
                    $query->where('title', 'REGEXP', $search)
                        ->orWhere('slug', 'REGEXP', $search)
                        ->orWhere('status', 'REGEXP', $search)
                        ->orWhereHas('publisher', function ($q) use ($search) {
                            $q->where('name', 'REGEXP', $search);
                        })
                        ->orWhereHas('categories', function ($q) use ($search) {
                            $q->where('name', 'REGEXP', $search);
                        })
                        ->orWhereHas('authors', function ($q) use ($search) {
                            $q->where('name', 'REGEXP', $search);
                        })
                        ->orWhereHas('language', function ($q) use ($search) {
                            $q->where('language', 'REGEXP', $search);
                        });
                });
            })

            ->paginate($perPage, ['*'], 'publisher_books_page', $page);
    }
}
