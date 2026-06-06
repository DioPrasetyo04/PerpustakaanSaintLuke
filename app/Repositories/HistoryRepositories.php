<?php

namespace App\Repositories;

use App\Enums\PaymentStatus;
use App\Interface\HistoryInterfaceRepositories;
use App\Models\Book;
use App\Models\Category;
use App\Models\Fine;
use App\Models\Loan;
use App\Models\ReturnBook;
use Illuminate\Support\Carbon;

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
                'loans.loan_code',
                'loans.status',
                'loans.created_at',
            ])
            ->with([
                'loanDetails:id,loan_id,book_id,loan_date,due_date,status',
                'loanDetails.book:id,title,slug,cover',
                'loanDetails.book.authors:id,name,username,avatar',
            ])
            ->where('loans.user_id', $userId)
            ->whereHas('loanDetails', fn($q) => $q->whereDoesntHave('returnBook'))
            ->when($search, function ($query, $value) {
                $query->where(function ($q) use ($value) {
                    $q->where('loans.loan_code', 'LIKE', "%{$value}%")
                        ->orWhereHas('loanDetails.book', fn($b) => $b->where('title', 'LIKE', "%{$value}%"))
                        ->orWhereHas('loanDetails.book.authors', fn($a) => $a->where('name', 'LIKE', "%{$value}%"));
                });
            })
            ->when($status === 'active', function ($query) {
                $query->whereHas('loanDetails', fn($q) => $q
                    ->whereDoesntHave('returnBook')
                    ->whereDate('due_date', '>=', now()->toDateString()));
            })
            ->when($status === 'overdue', function ($query) {
                $query->whereHas('loanDetails', fn($q) => $q
                    ->whereDoesntHave('returnBook')
                    ->whereDate('due_date', '<', now()->toDateString()));
            })
            ->orderByDesc('loans.created_at')
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
                'return_books.loan_user_id',
                'return_books.return_date',
                'return_books.status',
                'return_books.created_at',
            ])
            ->with([
                'loanDetail:id,loan_id,book_id,loan_date,due_date',
                'loanDetail.book:id,title,slug,cover',
                'loanDetail.book.authors:id,name,username,avatar',
                'loanDetail.loan:id,loan_code,user_id',
                'returnBookCheck:id,return_book_id,condition,notes',
            ])
            ->whereHas('loanDetail.loan', fn($q) => $q->where('user_id', $userId))
            ->when($search, function ($query, $value) {
                $query->where(function ($q) use ($value) {
                    $q->where('return_books.return_book_code', 'LIKE', "%{$value}%")
                        ->orWhereHas('loanDetail.book', fn($b) => $b->where('title', 'LIKE', "%{$value}%"))
                        ->orWhereHas('loanDetail.book.authors', fn($a) => $a->where('name', 'LIKE', "%{$value}%"));
                });
            })
            ->when($status === 'on-time', function ($query) {
                $query->whereHas('loanDetail', function ($q) {
                    $q->whereColumn('return_books.return_date', '<=', 'loan_details.due_date');
                });
            })
            ->when($status === 'late', function ($query) {
                $query->whereHas('loanDetail', function ($q) {
                    $q->whereColumn('return_books.return_date', '>', 'loan_details.due_date');
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
                'returnBook:id,return_book_code,loan_user_id,return_date',
                'returnBook.loanDetail:id,loan_id,book_id,loan_date,due_date',
                'returnBook.loanDetail.book:id,title,slug,cover',
                'returnBook.loanDetail.book.authors:id,name,username,avatar',
                'returnBook.loanDetail.loan:id,loan_code,user_id',
            ])
            ->whereHas('returnBook.loanDetail.loan', fn($q) => $q->where('user_id', $userId))
            ->when($search, function ($query, $value) {
                $query->where(function ($q) use ($value) {
                    $q->where('fines.order_id', 'LIKE', "%{$value}%")
                        ->orWhereHas('returnBook.loanDetail.book', fn($b) => $b->where('title', 'LIKE', "%{$value}%"))
                        ->orWhereHas('returnBook.loanDetail.book.authors', fn($a) => $a->where('name', 'LIKE', "%{$value}%"));
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

    public function getBookmarkStats(int $userId): array
    {
        $base = Book::query()
            ->join('bookmarks', 'bookmarks.book_id', '=', 'books.id')
            ->where('bookmarks.user_id', $userId);

        $total = (clone $base)->count();

        $available = (clone $base)
            ->whereHas('stock', fn($q) => $q->where('available', '>', 0))
            ->count();

        $avgRating = (clone $base)
            ->withAvg('reviews as avg_rating', 'rating')
            ->get()
            ->avg('avg_rating');

        $byCategory = Category::query()
            ->select('categories.name')
            ->selectRaw('COUNT(bookmarks.id) as total')
            ->join('book_of_categories', 'book_of_categories.category_id', '=', 'categories.id')
            ->join('bookmarks', function ($join) use ($userId) {
                $join->on('bookmarks.book_id', '=', 'book_of_categories.book_id')
                    ->where('bookmarks.user_id', '=', $userId);
            })
            ->groupBy('categories.id', 'categories.name')
            ->orderByDesc('total')
            ->limit(6)
            ->get();

        return [
            'total' => $total,
            'available' => $available,
            'borrowed' => $total - $available,
            'avg_rating' => round((float) $avgRating, 1),
            'by_category' => $byCategory
                ->map(fn($c) => ['label' => $c->name, 'total' => (int) $c->total])
                ->values()
                ->toArray(),
        ];
    }

    public function getLoanStats(int $userId): array
    {
        $base = Loan::query()
            ->where('loans.user_id', $userId)
            ->whereHas('loanDetails', fn($q) => $q->whereDoesntHave('returnBook'));

        $total = (clone $base)->count();

        $active = (clone $base)
            ->whereHas('loanDetails', fn($q) => $q
                ->whereDoesntHave('returnBook')
                ->whereDate('due_date', '>=', now()->toDateString()))
            ->count();

        $overdue = (clone $base)
            ->whereHas('loanDetails', fn($q) => $q
                ->whereDoesntHave('returnBook')
                ->whereDate('due_date', '<', now()->toDateString()))
            ->count();

        $trend = $this->monthlyTrend(
            Loan::query()->where('user_id', $userId),
            'loans.created_at',
        );

        return [
            'total' => $total,
            'active' => $active,
            'overdue' => $overdue,
            'trend' => $trend,
        ];
    }

    public function getReturnStats(int $userId): array
    {
        $base = ReturnBook::query()
            ->whereHas('loanDetail.loan', fn($q) => $q->where('user_id', $userId));

        $total = (clone $base)->count();

        $late = (clone $base)
            ->whereHas('loanDetail', fn($q) => $q
                ->whereColumn('return_books.return_date', '>', 'loan_details.due_date'))
            ->count();

        $trend = $this->monthlyTrend(
            ReturnBook::query()
                ->whereHas('loanDetail.loan', fn($q) => $q->where('user_id', $userId)),
            'return_books.return_date',
        );

        return [
            'total' => $total,
            'on_time' => $total - $late,
            'late' => $late,
            'trend' => $trend,
        ];
    }

    public function getFineStats(int $userId): array
    {
        $base = Fine::query()
            ->whereHas('returnBook.loanDetail.loan', fn($q) => $q->where('user_id', $userId));

        $total = (clone $base)->count();
        $totalAmount = (float) (clone $base)->sum('total_fee');
        $paidAmount = (float) (clone $base)
            ->where('payment_status', PaymentStatus::SUCCESS->value)
            ->sum('total_fee');

        $unpaidCount = (clone $base)
            ->whereIn('payment_status', [
                PaymentStatus::PENDING->value,
                PaymentStatus::FAILED->value,
                PaymentStatus::ERROR->value,
            ])
            ->count();

        $trend = $this->monthlyTrend(
            Fine::query()
                ->whereHas('returnBook.loanDetail.loan', fn($q) => $q->where('user_id', $userId))
                ->where('payment_status', PaymentStatus::SUCCESS->value),
            'fines.fine_date',
            'fines.total_fee',
        );

        return [
            'total' => $total,
            'total_amount' => $totalAmount,
            'paid_amount' => $paidAmount,
            'unpaid_amount' => max(0, $totalAmount - $paidAmount),
            'unpaid_count' => $unpaidCount,
            'trend' => $trend,
        ];
    }

    /**
     * Build a 6-month trend ending on the current month.
     * When $sumColumn is given the values are summed, otherwise rows are counted.
     */
    private function monthlyTrend($query, string $column, ?string $sumColumn = null): array
    {
        $start = Carbon::now()->startOfMonth()->subMonths(5);

        $aggregate = $sumColumn
            ? "COALESCE(SUM({$sumColumn}), 0) as total"
            : 'COUNT(*) as total';

        $rows = $query
            ->where($column, '>=', $start)
            ->selectRaw("DATE_FORMAT({$column}, '%Y-%m') as ym")
            ->selectRaw($aggregate)
            ->groupBy('ym')
            ->pluck('total', 'ym');

        $result = [];
        for ($i = 0; $i < 6; $i++) {
            $month = (clone $start)->addMonths($i);
            $result[] = [
                'label' => $month->format('M'),
                'total' => (float) ($rows[$month->format('Y-m')] ?? 0),
            ];
        }

        return $result;
    }
}
