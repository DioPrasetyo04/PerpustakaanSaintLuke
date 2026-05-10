<?php

namespace App\Repositories;

use App\Enums\ReturnBookStatus;
use App\Interface\DashboardInterfaceRepositories;
use App\Models\Fine;
use App\Models\Loan;
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
        $getAllCountBorrowingBook = Loan::query()->where('user_id', $authUser->id)->count();
        $getAllCountHasActiveLoan = Loan::query()->where('user_id', $authUser->id)->whereDoesntHave('returnBook')->count();
        $getAllCountDeadlineDueDateBook = Loan::query()->where('user_id', $authUser->id)->whereDoesntHave('returnBook')->whereDate('due_date', '>=', $now)->whereDate('due_date', '<=', $now->copy()->addDays(3));
        $getAllCountFinePayment = Loan::query()->where('user_id', $authUser->id)->whereHas('returnBook')->whereHas('fine')->count();
        return compact('getAllCountBorrowingBook', 'getAllCountHasActiveLoan', 'getAllCountReturnBook', 'getAllCountFinePayment');
    }

    public function getUserAuthCountBorrowingWeek()
    {
        $authUser = auth()->user();

        $startDate = now()->subDays(6)->startOfDay();
        $endDate = now()->endOfDay();

        $results = Loan::query()->selectRaw('DATE(loan_date) as loan_date, COUNT(*) as total')->where('user_id', $authUser->id)->whereBetween('loan_date', [$startDate, $endDate])->groupBy(DB::raw('DATE(loan_date)'))->orderBy('loan_date')->get();

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
            ->selectRaw('DATE(fine_date) as fine_date, COUNT(*) as total')
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
        $loans = Loan::query()->with(['book', 'book.publisher', 'book.language', 'book.authors'])->where('user_id', $authUser->id)->withAvg('book.reviews as avg_rating', 'rating')->paginate($perPage, ['*'], 'loans_page', $page);

        $loans->getCollection()->transform(function ($loan) {
            $daysLeft = now()->diffInDays($loan->die_date, false);

            $loan->days_left = $daysLeft;

            $loan->deadline_status = match (true) {
                $daysLeft < 0 => 'Overdue',
                $daysLeft <= 3 => 'danger',
                $daysLeft <= 7 => 'warning',
                default => 'safe'
            };

            return $loan;
        });

        return $loans;
    }
    public function getUserAuthAllReturnBook(array $filters, int $perPage, int $page): LengthAwarePaginator
    {
        $authUser = auth()->user();
        $returnBooks = ReturnBook::query()->with(['book', 'loan', 'fine', 'book.publisher', 'book.language', 'book.authors'])->where('user_id', $authUser->id)->withAvg('book.reviews as avg_rating', 'rating')->whereNot('status', ReturnBookStatus::CHECKED)->paginate($perPage, ['*'], 'return_books_page', $page);
        $returnBooks->getCollection()->transform(function ($returnBook) {
            $isFine = $returnBook->status === ReturnBookStatus::COST;

            $returnBook->return_status_label = $isFine ? 'Denda Saat Dikembalikan' : 'Dikembalikan Tepat Waktu';

            $returnBook->return_status_color = $isFine ? 'danger' : 'safe';

            $returnBook->has_fine = $isFine;

            $returnBook->fine_amount = $returnBook->fine?->total_fee;
            $returnBook->payment_status = $returnBook->fine?->payment_status;

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
