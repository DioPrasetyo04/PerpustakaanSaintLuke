<?php

namespace App\Repositories;

use App\Interface\ResourceInterfaceRepositories;
use App\Models\Book;
use Illuminate\Pagination\LengthAwarePaginator;

class ResourceRepositories implements ResourceInterfaceRepositories
{
    public function getAllData(array $filters, int $perPage, int $page): LengthAwarePaginator
    {
        return Book::query()->select([
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
            ->with(['publisher', 'categories', 'authors', 'reviews'])
            ->when(
                ($filters['field'] ?? null) && ($filters['direction'] ?? null),
                fn($query) => $query->orderBy($filters['field'], $filters['direction'])
            )
            ->when($filters['search'] ?? null, function ($query, $search) {
                $query->where(function ($query) use ($search) {
                    $query->where('title', 'REGEXP', $search)
                        ->orWhere('slug', 'REGEXP', $search)
                        ->orWhereHas('publisher', fn($q) => $q->where('name', 'REGEXP', $search))
                        ->orWhereHas('authors', fn($q) => $q->where('name', 'REGEXP', $search))
                        ->orWhereHas('categories', fn($q) => $q->where('name', 'REGEXP', $search));
                });
            })->paginate($perPage, ['*'], 'resources_page', $page);
    }
}
