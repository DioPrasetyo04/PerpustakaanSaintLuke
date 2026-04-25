<?php

namespace App\Repositories;

use App\Enums\BookStatus;
use App\Interface\ResourceInterfaceRepositories;
use App\Models\Book;
use Illuminate\Pagination\LengthAwarePaginator;

class ResourceRepositories implements ResourceInterfaceRepositories
{
    public function getAllData(array $filters, int $perPage, int $page): LengthAwarePaginator
    {
        return Book::query()->select([
            'id',
            'publisher_id',
            'added_by',
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
            ->with(['publisher:id,name,logo,slug', 'categories:id,name,icon,slug', 'authors:id,name,avatar', 'language:language,photo', 'reviews.user'])
            ->withAvg('reviews as avg_rating', 'rating')
            ->when(
                ($filters['field'] ?? null) && ($filters['direction'] ?? null),
                fn($query) => $query->orderBy($filters['field'], $filters['direction'])
            )
            ->when($filters['search'] ?? null, function ($query, $search) {
                $query->where(function ($query) use ($search) {
                    $query->where('title', 'like', "%{$search}%")
                        ->orWhere('slug', 'like', "%{$search}%")
                        ->orWhereHas('publisher', fn($q) => $q->where('name', 'like', "%{$search}%"))
                        ->orWhereHas('authors', fn($q) => $q->where('name', 'like', "%{$search}%"))
                        ->orWhereHas('categories', fn($q) => $q->where('name', 'like', "%{$search}%"));
                });
            })
            ->when($filters['categories'] ?? null, function ($query, $categories) {
                $query->whereHas('categories', function ($q) use ($categories) {
                    $q->whereIn('name', (array) $categories);
                });
            })
            ->when($filters['authors'] ?? null, function ($query, $authors) {
                $query->whereHas('authors', function ($q) use ($authors) {
                    $q->whereIn('name', (array) $authors);
                });
            })
            ->when($filters['publisher'] ?? null, function ($query, $publishers) {
                $query->whereHas('publisher', function ($q) use ($publishers) {
                    $q->whereIn('name', (array) $publishers);
                });
            })
            ->when($filters['availability'] ?? null, function ($query, $availability) {
                switch ($availability) {
                    case 'available':
                        $query->where('status', BookStatus::AVAILABLE->value);
                        break;

                    case 'borrowed':
                        $query->where('status', BookStatus::LOAN->value);
                        break;

                    case 'unavailable':
                        $query->where('status', BookStatus::UNAVAILABLE->value);
                        break;

                    case 'lost':
                        $query->where('status', BookStatus::LOST->value);
                        break;

                    case 'damaged':
                        $query->where('status', BookStatus::DAMAGED->value);
                        break;
                }
            })
            ->paginate($perPage, ['*'], 'resources_page', $page);
    }
}
