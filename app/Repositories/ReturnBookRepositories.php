<?php

namespace App\Repositories;

use App\Interface\ReturnBookInterfaceRepositories;
use App\Models\Book;
use App\Models\Fine;
use App\Models\ReturnBook;
use App\Models\ReturnBookCheck;
use App\Models\ReviewBook;

class ReturnBookRepositories implements ReturnBookInterfaceRepositories
{
    public function findBookBySlug(string $slug)
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
            'is_published',
            'price'
        ])
            ->with(['publisher:id,name,logo,slug', 'categories:id,name,icon,slug', 'authors:id,name,avatar', 'language:id,language,photo', 'stock:id,book_id,total,available,loan,damaged,lost'])
            ->withCount('stock')
            ->withAvg('reviews as avg_rating', 'rating')
            ->where('slug', $slug)
            ->firstOrFail();
    }

    public function createReturnBook(array $data)
    {
        return ReturnBook::create($data);
    }

    public function createReturnBookCheck(array $data)
    {
        return ReturnBookCheck::create($data);
    }

    public function createFinePayment(array $data)
    {
        return Fine::create($data);
    }

    public function getReturnBookByUser(int $userId, array $filters, int $perPage, int $page)
    {
        return ReturnBook::query()
            ->select([
                'return_book_code',
                'loan_id',
                'book_id',
                'user_id',
                'return_date',
                'status',
            ])
            ->with(['loan:id,loan_code,loan_date,due_date', 'book:id,title,cover,publication_year,synopsis', 'book.authors:id,name,username,avatar', 'user:id,name,email,username,avatar'])
            ->where('user_id', $userId)
            ->when($filters['search'] ?? null, function ($query, $search) {
                $query->where(function ($query) use ($search) {
                    $query->where('return_book_code', 'REGEXP', $search)
                        ->orWhere('return_date', 'REGEXP', $search)
                        ->orWhere('status', 'REGEXP', $search)
                        ->orWhereHas('book', fn($q) => $q->where('title', 'REGEXP', $search))
                        ->orWhereHas('book.authors', fn($q) => $q->where('name', 'REGEXP', $search))
                        ->orWhereHas('user', fn($q) => $q->where('name', 'REGEXP', $search));
                });
            })
            ->when(
                ($filters['field'] ?? null) && ($filters['direction'] ?? null),
                fn($query) => $query->orderBy($filters['field'], $filters['direction'])
            )
            ->withAvg('book.reviews as avg_rating', 'rating')
            ->paginate($perPage, ['*'], 'returns_page', $page);
    }

    public function getReturnBookDetail(int $userId, string $returnBookCode)
    {
        return ReturnBook::query()
            ->select([
                'return_book_code',
                'loan_id',
                'book_id',
                'user_id',
                'return_date',
                'status',
            ])
            ->with(['loan:id,loan_code,loan_date,due_date', 'book:id,title,cover,publication_year,synopsis', 'book.authors:id,name,username,avatar', 'user:id,name,email,username,avatar'])
            ->where('user_id', $userId)
            ->where('return_book_code', $returnBookCode)
            ->withAvg('book.reviews as avg_rating', 'rating')
            ->firstOrFail();
    }

    public function createReviewBook(array $data)
    {
        return ReviewBook::create($data);
    }
}
