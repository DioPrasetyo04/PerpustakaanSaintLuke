<?php

namespace App\Services;

use App\Enums\PaymentStatus;
use App\Interface\HistoryInterfaceRepositories;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Storage;

class HistoryService
{
    protected $historyService;

    public function __construct(HistoryInterfaceRepositories $historyRepositories)
    {
        $this->historyService = $historyRepositories;
    }

    public function getBookmarks(array $filters, int $perPage, int $page)
    {
        $userId = auth()->id();

        $paginator = $this->historyService->getBookmarksByUser($userId, $filters, $perPage, $page);

        return $this->paginate($paginator, fn($item) => $this->transformBookmark($item));
    }

    public function getLoans(array $filters, int $perPage, int $page)
    {
        $userId = auth()->id();

        $paginator = $this->historyService->getLoansByUser($userId, $filters, $perPage, $page);

        return $this->paginate($paginator, fn($item) => $this->transformLoan($item));
    }

    public function getReturns(array $filters, int $perPage, int $page)
    {
        $userId = auth()->id();

        $paginator = $this->historyService->getReturnsByUser($userId, $filters, $perPage, $page);

        return $this->paginate($paginator, fn($item) => $this->transformReturn($item));
    }

    public function getFines(array $filters, int $perPage, int $page)
    {
        $userId = auth()->id();

        $paginator = $this->historyService->getFinesByUser($userId, $filters, $perPage, $page);

        return $this->paginate($paginator, fn($item) => $this->transformFine($item));
    }

    public function getStats(): array
    {
        $userId = auth()->id();

        return [
            'bookmarks' => $this->historyService->getBookmarkStats($userId),
            'loans' => $this->historyService->getLoanStats($userId),
            'returns' => $this->historyService->getReturnStats($userId),
            'fines' => $this->historyService->getFineStats($userId),
        ];
    }

    private function paginate(LengthAwarePaginator $paginator, callable $transformer): array
    {
        return [
            'data' => collect($paginator->items())->map($transformer)->values()->toArray(),
            'meta' => [
                'current_page' => $paginator->currentPage(),
                'from' => $paginator->firstItem(),
                'last_page' => $paginator->lastPage(),
                'per_page' => $paginator->perPage(),
                'to' => $paginator->lastItem(),
                'total' => $paginator->total(),
                'has_pages' => $paginator->hasPages(),
            ],
            'links' => [
                'next' => $paginator->nextPageUrl(),
                'prev' => $paginator->previousPageUrl(),
            ],
        ];
    }

    private function transformBookmark($book): array
    {
        $available = $book->stock && $book->stock->available > 0;
        $category = $book->categories->first();

        return [
            'id' => (string) $book->id,
            'book_id' => $book->id,
            'book_title' => $book->title,
            'slug' => $book->slug,
            'author' => $book->authors->pluck('name')->join(', '),
            'category' => $category?->name,
            'cover_url' => $book->cover ? Storage::url($book->cover) : null,
            'date_bookmarked' => $book->date_bookmarked
                ? Carbon::parse($book->date_bookmarked)->toDateString()
                : null,
            'available' => $available,
            'rating' => round((float) ($book->avg_rating ?? 0), 1),
        ];
    }

    private function transformLoan($loan): array
    {
        $detail = $loan->loanDetails->first();
        $book = $detail?->book;

        $today = Carbon::today();
        $dueDate = $detail?->due_date ? Carbon::parse($detail->due_date) : null;
        $loanDate = $detail?->loan_date ? Carbon::parse($detail->loan_date) : null;

        $status = ($dueDate && $today->lte($dueDate)) ? 'active' : 'overdue';

        return [
            'id' => (string) $loan->id,
            'loan_code' => $loan->loan_code,
            'book_title' => $book?->title,
            'slug' => $book?->slug,
            'author' => $book?->authors->pluck('name')->join(', '),
            'cover_url' => $book?->cover ? Storage::url($book->cover) : null,
            'borrow_date' => $loanDate?->toDateString(),
            'due_date' => $dueDate?->toDateString(),
            'status' => $status,
        ];
    }

    private function transformReturn($return): array
    {
        $detail = $return->loanDetail;
        $book = $detail?->book;
        $check = $return->returnBookCheck;

        $returnDate = $return->return_date ? Carbon::parse($return->return_date) : null;
        $dueDate = $detail?->due_date ? Carbon::parse($detail->due_date) : null;
        $loanDate = $detail?->loan_date ? Carbon::parse($detail->loan_date) : null;

        $status = 'on-time';
        if ($returnDate && $dueDate && $returnDate->gt($dueDate)) {
            $status = 'late';
        }

        return [
            'id' => (string) $return->id,
            'return_book_code' => $return->return_book_code,
            'book_title' => $book?->title,
            'slug' => $book?->slug,
            'author' => $book?->authors->pluck('name')->join(', '),
            'cover_url' => $book?->cover ? Storage::url($book->cover) : null,
            'borrow_date' => $loanDate?->toDateString(),
            'return_date' => $returnDate?->toDateString(),
            'due_date' => $dueDate?->toDateString(),
            'condition' => $check?->condition?->value,
            'status' => $status,
        ];
    }

    private function transformFine($fine): array
    {
        $returnBook = $fine->returnBook;
        $detail = $returnBook?->loanDetail;
        $book = $detail?->book;

        $dueDate = $detail?->due_date ? Carbon::parse($detail->due_date) : null;
        $returnDate = $returnBook?->return_date ? Carbon::parse($returnBook->return_date) : null;

        $referenceDate = $returnDate ?? Carbon::today();
        $daysOverdue = 0;
        if ($dueDate && $referenceDate->gt($dueDate)) {
            $daysOverdue = (int) $dueDate->diffInDays($referenceDate);
        }

        $isPaid = $fine->payment_status === PaymentStatus::SUCCESS;

        return [
            'id' => (string) $fine->id,
            'order_id' => $fine->order_id,
            'book_title' => $book?->title,
            'slug' => $book?->slug,
            'author' => $book?->authors->pluck('name')->join(', '),
            'cover_url' => $book?->cover ? Storage::url($book->cover) : null,
            'due_date' => $dueDate?->toDateString(),
            'return_date' => $returnDate?->toDateString(),
            'days_overdue' => $daysOverdue,
            'late_fee' => (float) $fine->late_fee,
            'other_fee' => (float) $fine->other_fee,
            'fine_amount' => (float) $fine->total_fee,
            'status' => $isPaid ? 'paid' : 'unpaid',
            'payment_status' => $fine->payment_status?->value,
        ];
    }
}
