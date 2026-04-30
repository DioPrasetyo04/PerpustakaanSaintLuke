<?php

namespace App\Repositories;

use App\Interface\LoanInterfaceRepositories;
use App\Models\Book;
use App\Models\FineSettings;
use App\Models\Loan;
use Exception;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
use Override;

class LoanRepositories implements LoanInterfaceRepositories
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

    public function createLoan(array $data)
    {
        return Loan::create($data);
    }

    public function getLoansByUser(int $userId, array $filters, int $perPage, int $page)
    {
        return Loan::query()
            ->select([
                'user_id',
                'book_id',
                'loan_code',
                'loan_date',
                'due_date',
                'created_at',
                'updated_at'
            ])
            ->with(['book:id,title,author,cover', 'book.authors:id,name,username,avatar', 'user:id,name,email,username,avatar'])
            ->where('user_id', $userId)
            ->when($filters['search'] ?? null, function ($query, $search) {
                $query->where(function ($query) use ($search) {
                    $query->where('loan_code', 'REGEXP', $search)
                        ->orWhere('loan_date', 'REGEXP', $search)
                        ->orWhere('due_date', 'REGEXP', $search)
                        ->orWhereHas('book', fn($q) => $q->where('title', 'REGEXP', $search))
                        ->orWhereHas('user', fn($q) => $q->where('name', 'REGEXP', $search));
                });
            })
            ->when(
                ($filters['field'] ?? null) && ($filters['direction'] ?? null),
                fn($query) => $query->orderBy($filters['field'], $filters['direction'])
            )
            ->withAvg('book.reviews as avg_rating', 'rating')
            ->paginate($perPage, ['*'], 'loans_page', $page);
    }
    public function getLoanDetail(int $userId, string $loanCode)
    {
        return Loan::query()
            ->select([
                'id',
                'user_id',
                'book_id',
                'loan_code',
                'loan_date',
                'due_date',
                'created_at',
                'updated_at'
            ])
            ->with(['book:id,title,author,cover', 'book.authors:id,name,username,avatar', 'user:id,name,email,username,avatar'])
            ->where('user_id', $userId)
            ->where('loan_code', $loanCode)
            ->withAvg('book.reviews as avg_rating', 'rating')
            ->firstOrFail();
    }
}
