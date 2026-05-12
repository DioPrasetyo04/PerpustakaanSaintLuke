<?php

namespace App\Repositories;

use App\Enums\PaymentStatus;
use App\Interface\HistoryInterfaceRepositories;
use App\Models\Book;
use App\Models\Fine;
use App\Models\Loan;
use App\Models\ReturnBook;

class HistoryRepositories implements HistoryInterfaceRepositories
{
    public function getBookmarksByUser(int $userId, array $filters, int $perPage, int $page)
    {
        $search = $filters['search'] ?? null;
        $status = $filters['status'] ?? null;

        return Book::query()
            ->select([
                'books.id',
                'books.title',
                'books.slug',
                'books.cover',
            ])
            ->join('bookmarks', 'bookmarks.book_id', '=', 'books.id')
            ->where('bookmarks.user_id', $userId)
            ->addSelect('bookmarks.created_at as date_bookmarked')
            ->with([
                'authors:id,name,username,avatar',
                'categories:id,name,slug,icon',
                'stock:id,book_id,available',
            ])
            ->withAvg('reviews as avg_rating', 'rating')
            ->when($search, function ($query, $value) {
                $query->where(function ($q) use ($value) {
                    $q->where('books.title', 'LIKE', "%{$value}%")
                        ->orWhereHas('authors', fn($a) => $a->where('name', 'LIKE', "%{$value}%"));
                });
            })
            ->when($status === 'available', function ($query) {
                $query->whereHas('stock', fn($q) => $q->where('available', '>', 0));
            })
            ->when($status === 'borrowed', function ($query) {
                $query->whereDoesntHave('stock', fn($q) => $q->where('available', '>', 0));
            })
            ->orderByDesc('bookmarks.created_at')
            ->paginate($perPage, ['*'], 'bookmarks_page', $page)
            ->withQueryString();
    }

    public function getLoansByUser(int $userId, array $filters, int $perPage, int $page)
    {
        $search = $filters['search'] ?? null;
        $status = $filters['status'] ?? null;

        return Loan::query()
            ->select([
                'loans.id',
                'loans.user_id',
                'loans.book_id',
                'loans.loan_code',
                'loans.loan_date',
                'loans.due_date',
                'loans.created_at',
            ])
            ->with([
                'book:id,title,slug,cover',
                'book.authors:id,name,username,avatar',
            ])
            ->where('loans.user_id', $userId)
            ->whereDoesntHave('returnBook')
            ->when($search, function ($query, $value) {
                $query->where(function ($q) use ($value) {
                    $q->where('loans.loan_code', 'LIKE', "%{$value}%")
                        ->orWhereHas('book', fn($b) => $b->where('title', 'LIKE', "%{$value}%"))
                        ->orWhereHas('book.authors', fn($a) => $a->where('name', 'LIKE', "%{$value}%"));
                });
            })
            ->when($status === 'active', function ($query) {
                $query->whereDate('loans.due_date', '>=', now()->toDateString());
            })
            ->when($status === 'overdue', function ($query) {
                $query->whereDate('loans.due_date', '<', now()->toDateString());
            })
            ->orderByDesc('loans.loan_date')
            ->paginate($perPage, ['*'], 'loans_page', $page)
            ->withQueryString();
    }

    public function getReturnsByUser(int $userId, array $filters, int $perPage, int $page)
    {
        $search = $filters['search'] ?? null;
        $status = $filters['status'] ?? null;

        return ReturnBook::query()
            ->select([
                'return_books.id',
                'return_books.return_book_code',
                'return_books.loan_id',
                'return_books.book_id',
                'return_books.user_id',
                'return_books.return_date',
                'return_books.status',
                'return_books.created_at',
            ])
            ->with([
                'book:id,title,slug,cover',
                'book.authors:id,name,username,avatar',
                'loan:id,loan_code,loan_date,due_date',
                'returnBookCheck:id,return_book_id,condition,notes',
            ])
            ->where('return_books.user_id', $userId)
            ->when($search, function ($query, $value) {
                $query->where(function ($q) use ($value) {
                    $q->where('return_books.return_book_code', 'LIKE', "%{$value}%")
                        ->orWhereHas('book', fn($b) => $b->where('title', 'LIKE', "%{$value}%"))
                        ->orWhereHas('book.authors', fn($a) => $a->where('name', 'LIKE', "%{$value}%"));
                });
            })
            ->when($status === 'on-time', function ($query) {
                $query->whereHas('loan', function ($q) {
                    $q->whereColumn('return_books.return_date', '<=', 'loans.due_date');
                });
            })
            ->when($status === 'late', function ($query) {
                $query->whereHas('loan', function ($q) {
                    $q->whereColumn('return_books.return_date', '>', 'loans.due_date');
                });
            })
            ->orderByDesc('return_books.return_date')
            ->paginate($perPage, ['*'], 'returns_page', $page)
            ->withQueryString();
    }

    public function getFinesByUser(int $userId, array $filters, int $perPage, int $page)
    {
        $search = $filters['search'] ?? null;
        $status = $filters['status'] ?? null;

        return Fine::query()
            ->select([
                'fines.id',
                'fines.return_book_id',
                'fines.user_id',
                'fines.late_fee',
                'fines.other_fee',
                'fines.total_fee',
                'fines.fine_date',
                'fines.payment_method',
                'fines.payment_status',
                'fines.order_id',
                'fines.created_at',
            ])
            ->with([
                'returnBook:id,return_book_code,loan_id,book_id,return_date',
                'returnBook.book:id,title,slug,cover',
                'returnBook.book.authors:id,name,username,avatar',
                'returnBook.loan:id,loan_code,loan_date,due_date',
            ])
            ->where('fines.user_id', $userId)
            ->when($search, function ($query, $value) {
                $query->where(function ($q) use ($value) {
                    $q->where('fines.order_id', 'LIKE', "%{$value}%")
                        ->orWhereHas('returnBook.book', fn($b) => $b->where('title', 'LIKE', "%{$value}%"))
                        ->orWhereHas('returnBook.book.authors', fn($a) => $a->where('name', 'LIKE', "%{$value}%"));
                });
            })
            ->when($status === 'paid', function ($query) {
                $query->where('fines.payment_status', PaymentStatus::SUCCESS->value);
            })
            ->when($status === 'unpaid', function ($query) {
                $query->whereIn('fines.payment_status', [
                    PaymentStatus::PENDING->value,
                    PaymentStatus::FAILED->value,
                    PaymentStatus::ERROR->value,
                ]);
            })
            ->orderByDesc('fines.fine_date')
            ->paginate($perPage, ['*'], 'fines_page', $page)
            ->withQueryString();
    }
}
