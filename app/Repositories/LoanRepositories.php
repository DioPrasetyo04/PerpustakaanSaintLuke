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
        return Book::query()
            ->select(['id', 'title', 'slug', 'cover'])
            ->where('slug', $slug)
            ->with('authors:id,name,avatar')
            ->withAvg('reviews as avg_rating', 'rating')
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
            ->with('book:id,title,author,cover', 'user:id,name,email,username,avatar')
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
                'user_id',
                'book_id',
                'loan_code',
                'loan_date',
                'due_date',
                'created_at',
                'updated_at'
            ])
            ->with('book:id,title,author,cover', 'user:id,name,email,username,avatar')
            ->where('user_id', $userId)
            ->where('loan_code', $loanCode)
            ->withAvg('book.reviews as avg_rating', 'rating')
            ->firstOrFail();
    }
    // public function getConfirmationLoanUserAuth(string $slug)
    // {
    //     $auth = auth()->user();
    //     if (!$auth) {
    //         throw new AuthorizationException("Unauthenticated");
    //     }
    //     if (!($auth->hasRole('admin') || $auth->hasRole('pengelola-perpustakaan'))) {
    //         throw new AuthorizationException("Forbidden");
    //     }

    //     $book = Book::query()->select([
    //         'title',
    //         'slug',
    //         'cover',
    //     ])
    //         ->where('slug', $slug)
    //         ->with('authors:id,name,avatar')
    //         ->withAvg('reviews as avg_rating', 'rating')
    //         ->firstOrFail();

    //     $duration = FineSettings::query()->value('loan_duration_days') ?? 14;

    //     $loanPreview = [
    //         'loan_date' => now(),
    //         'due_date' => now()->addDays($duration),
    //         'duration' => $duration
    //     ];

    //     return [
    //         'book' => $book,
    //         'loan_preview' => $loanPreview
    //     ];
    // }
    // public function postDataLoanUserAuth(array $data)
    // {
    //     $auth = auth()->user();
    //     if (!$auth) {
    //         throw new AuthorizationException("Unauthenticated");
    //     }
    //     if (!($auth->hasRole('admin') || $auth->hasRole('pengelola-perpustakaan'))) {
    //         throw new AuthorizationException("Forbidden");
    //     }

    //     if (Loan::hasActiveLoan($auth->id, $data['book_id'])) {
    //         throw new Exception("Masih ada pinjaman aktif");
    //     }

    //     if (!Loan::checkStock($data['book_id'])) {
    //         throw new Exception("Stok buku habis");
    //     }

    //     if (!Loan::checkUserVerified($auth->id)) {
    //         throw new Exception("User belum verifikasi email");
    //     }

    //     if (!FineSettings::checkSettings()) {
    //         throw new Exception("Fine settings belum dibuat");
    //     }

    //     $duration = FineSettings::query()->value('loan_duration_days') ?? 14;

    //     return DB::transaction(function () use ($auth, $data, $duration) {
    //         $loan = Loan::create([
    //             'user_id' => $auth->id,
    //             'loan_code' => generateUniqueCode('Loan', Loan::class, 'loan_code'),
    //             'book_id' => $data['book_id'],
    //             'loan_date' => now(),
    //             'due_date' => now()->addDays($duration),
    //             'created_at' => now(),
    //             'updated_at' => now()
    //         ]);

    //         Loan::substractionStock($data['book_id']);
    //         Loan::addLoanStock($data['book_id']);

    //         return $loan;
    //     });
    // }

    // public function getDataLoanUserAuth(array $filters, int $perPage, int $page): LengthAwarePaginator|bool
    // {
    //     $auth = auth()->user();
    //     if (!$auth || !$auth->hasRole('admin') || !$auth->hasRole('pengelola-perpustakaan')) return false;

    //     return Loan::query()->select([
    //         'user_id',
    //         'book_id',
    //         'loan_code',
    //         'loan_date',
    //         'due_date',
    //         'created_at',
    //         'updated_at'
    //     ])
    //         ->with('book:id,title,author,cover', 'user:id,name,email,username,avatar')
    //         ->where('user_id', $auth->id)
    //         ->when($filters['search'] ?? null, function ($query, $search) {
    //             $query->where(function ($query) use ($search) {
    //                 $query->where('loan_code', 'REGEXP', $search)
    //                     ->orWhere('loan_date', 'REGEXP', $search)
    //                     ->orWhere('due_date', 'REGEXP', $search)
    //                     ->orWhereHas('book', fn($q) => $q->where('title', 'REGEXP', $search))
    //                     ->orWhereHas('user', fn($q) => $q->where('name', 'REGEXP', $search));
    //             });
    //         })
    //         ->when(
    //             ($filters['field'] ?? null) && ($filters['direction'] ?? null),
    //             fn($query) => $query->orderBy($filters['field'], $filters['direction'])
    //         )
    //         ->withAvg('book.reviews as avg_rating', 'rating')
    //         ->paginate($perPage, ['*'], 'loans_page', $page);
    // }

    // public function getDetailLoanUserAuth(string $loanCode)
    // {
    //     $auth = auth()->user();
    //     if (!$auth || !$auth->hasRole('admin') || !$auth->hasRole('pengelola-perpustakaan')) return false;

    //     $loanDataDetail = Loan::query()->select([
    //         'user_id',
    //         'book_id',
    //         'loan_code',
    //         'loan_date',
    //         'due_date',
    //         'created_at',
    //         'updated_at'
    //     ])
    //         ->with('book:id,title,author,cover', 'user:id,name,email,username,avatar')
    //         ->where('user_id', $auth->id)
    //         ->where('loan_code', $loanCode)
    //         ->withAvg('book.reviews as avg_rating', 'rating')
    //         ->firstOrFail();

    //     if (!$loanDataDetail) {
    //         return false;
    //     }

    //     return $loanDataDetail;
    // }
}
