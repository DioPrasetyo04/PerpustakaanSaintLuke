<?php

namespace App\Repositories;

use App\Enums\PublishedBooks;
use App\Interface\BookInterfaceRepositories;
use App\Models\Book;
use App\Models\ReviewBook;
use Illuminate\Pagination\LengthAwarePaginator;

class BookRepositories implements BookInterfaceRepositories
{

    public function getDetailBook(string $slug)
    {
        return Book::query()->select([
            'id',
            'publisher_id',
            'language_id',
            'book_code',
            'title',
            'slug',
            'publication_year',
            'isbn',
            'synopsis',
            'number_of_pages',
            'status',
            'cover',
            'is_published'
        ])
            ->with(['publisher:id,name,logo,slug', 'categories:id,name,icon,slug', 'authors:id,name,avatar', 'language:id,language,photo', 'stock:id,book_id,total,available,loan,damaged,lost'])
            ->withCount('stock')
            ->withAvg('reviews as avg_rating', 'rating')
            ->where('slug', $slug)
            ->firstOrFail();
    }

    public function getRecomendedBook(int $perPage, int $page): LengthAwarePaginator
    {
        return Book::query()->select([
            'id',
            'publisher_id',
            'language_id',
            'book_code',
            'title',
            'slug',
            'publication_year',
            'isbn',
            'synopsis',
            'number_of_pages',
            'status',
            'cover',
            'price',
            'is_published'
        ])
            ->with([
                'publisher:id,name,logo,slug',
                'categories:id,name,icon,slug',
                'authors:id,name,username,avatar',
                'language:id,language,photo',
            ])
            ->withAvg('reviews as avg_rating', 'rating')
            ->whereHas('loan')
            ->whereHas('reviews', fn($review) => $review->where('rating', '>=', 3.5))
            ->where('is_published', PublishedBooks::PUBLISH->value)
            ->orderByDesc('avg_rating')
            ->orderByDesc('id')
            ->without('reviews')
            ->paginate($perPage, ['*'], 'recommended_books_page', $page);
    }

    public function getReviewBook(array $filters, string $slug, int $perPage, int $page): LengthAwarePaginator
    {
        return ReviewBook::query()->select([
            'id',
            'user_id',
            'rating',
            'comment',
            'created_at'
        ])
            ->whereHas('book', fn($q) => $q->where('slug', $slug))
            ->with([
                'user:id,name,email,username,avatar'
            ])
            ->when(
                ($filters['field'] ?? null) && ($filters['direction'] ?? null),
                fn($query) => $query->orderBy($filters['field'], $filters['direction'])
            )
            ->orderByDesc('id')
            ->paginate($perPage, ['*'], 'review_books_page', $page);
    }
}
