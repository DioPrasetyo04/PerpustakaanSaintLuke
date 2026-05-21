<?php

namespace App\Repositories;

use App\Interface\LoanInterfaceRepositories;
use App\Models\Book;
use App\Models\Loan;
use Illuminate\Support\Facades\DB;


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

    public function createLoan(array $loanData, array $detailData)
    {
        return DB::transaction(function () use ($loanData, $detailData) {
            $loan = Loan::create($loanData);
            $loan->loanDetails()->create($detailData);

            return $loan->load('loanDetails.book');
        });
    }

    public function getLoansByUser(int $userId, array $filters, int $perPage, int $page)
    {
        return Loan::query()
            ->select(['id', 'user_id', 'loan_code', 'status', 'created_at', 'updated_at'])
            ->with([
                'loanDetails:id,loan_id,book_id,loan_date,due_date,status',
                'loanDetails.book:id,title,cover,slug',
                'loanDetails.book.authors:id,name,username,avatar',
                'user:id,name,email,username,avatar',
            ])
            ->where('user_id', $userId)
            ->when($filters['search'] ?? null, function ($query, $search) {
                $query->where(function ($query) use ($search) {
                    $query->where('loan_code', 'REGEXP', $search)
                        ->orWhereHas('loanDetails', fn($q) => $q
                            ->where('loan_date', 'REGEXP', $search)
                            ->orWhere('due_date', 'REGEXP', $search))
                        ->orWhereHas('loanDetails.book', fn($q) => $q->where('title', 'REGEXP', $search))
                        ->orWhereHas('user', fn($q) => $q->where('name', 'REGEXP', $search));
                });
            })
            ->when(
                ($filters['field'] ?? null) && ($filters['direction'] ?? null),
                fn($query) => $query->orderBy($filters['field'], $filters['direction'])
            )
            ->paginate($perPage, ['*'], 'loans_page', $page);
    }
    public function getLoanDetail(int $userId, string $loanCode)
    {
        return Loan::query()
            ->select(['id', 'user_id', 'loan_code', 'status', 'created_at', 'updated_at'])
            ->with([
                'loanDetails:id,loan_id,book_id,loan_date,due_date,status',
                'loanDetails.book:id,title,cover,slug',
                'loanDetails.book.authors:id,name,username,avatar',
                'user:id,name,email,username,avatar',
            ])
            ->where('user_id', $userId)
            ->where('loan_code', $loanCode)
            ->firstOrFail();
    }
}
