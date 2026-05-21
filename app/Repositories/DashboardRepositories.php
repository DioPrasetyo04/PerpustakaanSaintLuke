<?php

namespace App\Repositories;

use App\Enums\ReturnBookStatus;
use App\Interface\DashboardInterfaceRepositories;
use App\Models\Author;
use App\Models\Fine;
use App\Models\Loan;
use App\Models\LoanDetail;
use App\Models\ReturnBook;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class DashboardRepositories implements DashboardInterfaceRepositories
{
    public function getAllCountInformations()
    {
        $authUser = auth()->user();
        $now = Carbon::now();

        $getAllCountBorrowingBook = Loan::query()
            ->where('user_id', $authUser->id)
            ->withCount('loanDetails')
            ->get()
            ->sum('loan_details_count');

        $getAllCountHasActiveLoan = LoanDetail::query()
            ->whereHas('loan', fn($q) => $q->where('user_id', $authUser->id))
            ->whereDoesntHave('returnBook')
            ->count();

        $getAllCountDeadlineDueDateBook = LoanDetail::query()
            ->whereHas('loan', fn($q) => $q->where('user_id', $authUser->id))
            ->whereDoesntHave('returnBook')
            ->whereDate('due_date', '>=', $now)
            ->whereDate('due_date', '<=', $now->copy()->addDays(3))
            ->count();

        $getAllCountReturnBook = ReturnBook::query()
            ->whereHas('loanDetail.loan', fn($q) => $q->where('user_id', $authUser->id))
            ->count();

        $getAllCountFinePayment = ReturnBook::query()
            ->whereHas('loanDetail.loan', fn($q) => $q->where('user_id', $authUser->id))
            ->has('fine')
            ->count();

        $totalFineNominal = (int) Fine::query()
            ->whereHas('returnBook.loanDetail.loan', fn($q) => $q->where('user_id', $authUser->id))
            ->sum('total_fee');

        return compact('getAllCountBorrowingBook', 'getAllCountHasActiveLoan', 'getAllCountDeadlineDueDateBook', 'getAllCountReturnBook', 'getAllCountFinePayment', 'totalFineNominal');
    }

    public function getUserAuthCountBorrowingWeek()
    {
        $authUser = auth()->user();

        $startDate = now()->subDays(6)->startOfDay();
        $endDate = now()->endOfDay();

        $results = LoanDetail::query()
            ->selectRaw('DATE(loan_details.loan_date) as loan_date, COUNT(*) as total')
            ->whereHas('loan', fn($q) => $q->where('user_id', $authUser->id))
            ->whereBetween('loan_details.loan_date', [$startDate, $endDate])
            ->groupBy(DB::raw('DATE(loan_details.loan_date)'))
            ->orderBy('loan_date')
            ->get();

        return $this->formatWeeklyChartData($results, 'loan_date');
    }

    public function getUserAuthCountReturningWeek()
    {
        $authUser = auth()->user();

        $startDate = now()->subDays(6)->startOfDay();
        $endDate = now()->endOfDay();

        $results = ReturnBook::query()
            ->selectRaw('DATE(return_date) as return_date, COUNT(*) as total')
            ->where('user_id', $authUser->id)
            ->whereBetween('return_date', [$startDate, $endDate])
            ->groupBy(DB::raw('DATE(return_date)'))
            ->orderBy('return_date')
            ->get();

        return $this->formatWeeklyChartData($results, 'return_date');
    }

    public function getUserAuthCountFinePaymentWeek()
    {
        $authUser = auth()->user();

        $startDate = now()->subDays(6)->startOfDay();
        $endDate = now()->endOfDay();

        $results = Fine::query()
            ->selectRaw('DATE(fine_date) as fine_date, SUM(total_fee) as total')
            ->where('user_id', $authUser->id)
            ->whereBetween('fine_date', [$startDate, $endDate])
            ->groupBy(DB::raw('DATE(fine_date)'))
            ->orderBy('fine_date')
            ->get();

        return $this->formatWeeklyChartData($results, 'fine_date');
    }

    public function getUserAuthAllLoanBook(array $filters, int $perPage, int $page): LengthAwarePaginator
    {
        $authUser = auth()->user();

        $query = LoanDetail::query()
            ->select('loan_details.*')
            ->with([
                'book' => fn($q) => $q->withAvg('reviews', 'rating'),
                'book.publisher',
                'book.language',
                'book.authors',
                'book.categories',
                'loan:id,loan_code,user_id',
            ])
            ->whereHas('loan', fn($q) => $q->where('user_id', $authUser->id))
            ->whereDoesntHave('returnBook');

        // Category filter
        if (!empty($filters['category']) && $filters['category'] !== 'All Categories') {
            $query->whereHas('book.categories', function ($q) use ($filters) {
                $q->where('name', $filters['category']);
            });
        }

        // Status filter
        if (!empty($filters['status']) && $filters['status'] !== 'All Status') {
            $now = Carbon::now();
            if ($filters['status'] === 'Due Soon') {
                $query->whereDate('loan_details.due_date', '>=', $now)
                    ->whereDate('loan_details.due_date', '<=', $now->copy()->addDays(7));
            } elseif ($filters['status'] === 'Overdue') {
                $query->whereDate('loan_details.due_date', '<', $now);
            } elseif ($filters['status'] === 'On Time') {
                $query->whereDate('loan_details.due_date', '>', $now->copy()->addDays(7));
            }
        }

        // Date range filter
        if (!empty($filters['dateRange']) && $filters['dateRange'] !== 'All Time') {
            $now = Carbon::now();
            if ($filters['dateRange'] === 'Last 7 Days') {
                $query->where('loan_details.loan_date', '>=', $now->copy()->subDays(7));
            } elseif ($filters['dateRange'] === 'Last 30 Days') {
                $query->where('loan_details.loan_date', '>=', $now->copy()->subDays(30));
            } elseif ($filters['dateRange'] === 'Last 3 Months') {
                $query->where('loan_details.loan_date', '>=', $now->copy()->subMonths(3));
            }
        }

        // Sorting
        $sortBy = $filters['sortBy'] ?? 'Due Date';
        if ($sortBy === 'Title') {
            $query->leftJoin('books', 'loan_details.book_id', '=', 'books.id')
                ->orderBy('books.title', 'asc')
                ->select('loan_details.*');
        } elseif ($sortBy === 'Author') {
            $query->addSelect([
                'first_author_name' => Author::select('name')
                    ->join('author_of_books', 'authors.id', '=', 'author_of_books.author_id')
                    ->whereColumn('author_of_books.book_id', 'loan_details.book_id')
                    ->limit(1)
            ])->orderBy('first_author_name', 'asc');
        } elseif ($sortBy === 'Borrow Date') {
            $query->orderBy('loan_details.loan_date', 'desc');
        } else {
            $query->orderBy('loan_details.due_date', 'asc');
        }

        $loans = $query->paginate($perPage, ['*'], 'loans_page', $page);

        $loans->getCollection()->transform(function ($detail) {
            $daysLeft = now()->diffInDays($detail->due_date, false);

            $detail->days_left = $daysLeft;

            $detail->deadline_status = match (true) {
                $daysLeft < 0 => 'Overdue',
                $daysLeft <= 3 => 'danger',
                $daysLeft <= 7 => 'warning',
                default => 'safe'
            };

            $detail->loan_code = $detail->loan?->loan_code;

            return $detail;
        });

        return $loans;
    }
    public function getUserAuthAllReturnBook(array $filters, int $perPage, int $page): LengthAwarePaginator
    {
        $authUser = auth()->user();
        $query = ReturnBook::query()
            ->select('return_books.*')
            ->with([
                'loanDetail:id,loan_id,book_id,loan_date,due_date',
                'loanDetail.book' => fn($q) => $q->withAvg('reviews', 'rating'),
                'loanDetail.book.publisher',
                'loanDetail.book.language',
                'loanDetail.book.authors',
                'loanDetail.book.categories',
                'loanDetail.loan:id,loan_code,user_id',
                'fine',
            ])
            ->whereHas('loanDetail.loan', fn($q) => $q->where('user_id', $authUser->id))
            ->whereNot('return_books.status', ReturnBookStatus::CHECKED);

        // Category filter
        if (!empty($filters['category']) && $filters['category'] !== 'All Categories') {
            $query->whereHas('loanDetail.book.categories', function ($q) use ($filters) {
                $q->where('name', $filters['category']);
            });
        }

        // Date range filter
        if (!empty($filters['dateRange']) && $filters['dateRange'] !== 'All Time') {
            $now = Carbon::now();
            if ($filters['dateRange'] === 'Last 7 Days') {
                $query->where('return_books.return_date', '>=', $now->copy()->subDays(7));
            } elseif ($filters['dateRange'] === 'Last 30 Days') {
                $query->where('return_books.return_date', '>=', $now->copy()->subDays(30));
            } elseif ($filters['dateRange'] === 'Last 3 Months') {
                $query->where('return_books.return_date', '>=', $now->copy()->subMonths(3));
            }
        }

        // Sorting
        $sortBy = $filters['sortBy'] ?? 'Due Date';
        if ($sortBy === 'Title') {
            $query->leftJoin('loan_details', 'return_books.loan_user_id', '=', 'loan_details.id')
                ->leftJoin('books', 'loan_details.book_id', '=', 'books.id')
                ->orderBy('books.title', 'asc')
                ->select('return_books.*');
        } elseif ($sortBy === 'Author') {
            $query->leftJoin('loan_details as ld_author', 'return_books.loan_user_id', '=', 'ld_author.id')
                ->addSelect([
                    'first_author_name' => Author::select('name')
                        ->join('author_of_books', 'authors.id', '=', 'author_of_books.author_id')
                        ->whereColumn('author_of_books.book_id', 'ld_author.book_id')
                        ->limit(1)
                ])->orderBy('first_author_name', 'asc');
        } elseif ($sortBy === 'Borrow Date') {
            $query->leftJoin('loan_details as ld_borrow', 'return_books.loan_user_id', '=', 'ld_borrow.id')
                ->orderBy('ld_borrow.loan_date', 'desc')
                ->select('return_books.*');
        } else {
            $query->orderBy('return_books.return_date', 'desc');
        }

        $returnBooks = $query->paginate($perPage, ['*'], 'return_books_page', $page);
        $returnBooks->getCollection()->transform(function ($returnBook) {
            $isFine = $returnBook->status === ReturnBookStatus::COST;

            $returnBook->return_status_label = $isFine ? 'Denda Saat Dikembalikan' : 'Dikembalikan Tepat Waktu';

            $returnBook->return_status_color = $isFine ? 'danger' : 'safe';

            $returnBook->has_fine = $isFine;

            $returnBook->fine_amount = $returnBook->fine?->total_fee;
            $returnBook->payment_status = $returnBook->fine?->payment_status;

            // 🔥 Flatten ke top-level supaya frontend tetap kompatibel
            $detail = $returnBook->loanDetail;
            $returnBook->book = $detail?->book;
            $returnBook->loan = $detail ? [
                'id' => $detail->loan?->id,
                'loan_code' => $detail->loan?->loan_code,
                'loan_date' => $detail->loan_date,
                'due_date' => $detail->due_date,
            ] : null;

            return $returnBook;
        });
        return $returnBooks;
    }

    private function formatWeeklyChartData(Collection $results, string $dateColumn): array
    {
        $days = collect(range(6, 0))->map(function ($day) {
            return Carbon::now()->subDays($day);
        });

        return $days->map(function ($date) use ($results, $dateColumn) {
            $found = $results->first(function ($item) use ($date, $dateColumn) {
                return Carbon::parse($item->{$dateColumn})->isSameDay($date);
            });

            return [
                'day' => $date->format('D'),
                'total' => $found ? $found->total : 0,
            ];
        })->values()->toArray();
    }
}
