<?php

namespace App\Services;

use App\Http\Resources\LoanResource;
use App\Http\Resources\ReturnBookResource;
use App\Interface\DashboardInterfaceRepositories;
use App\Models\Category;
use Illuminate\Pagination\LengthAwarePaginator;

class DashboardService
{
    protected DashboardInterfaceRepositories $dashboardRepository;

    public function __construct(DashboardInterfaceRepositories $dashboardRepository)
    {
        $this->dashboardRepository = $dashboardRepository;
    }

    // ================= STATS =================

    public function getStats(): array
    {
        $counts = $this->dashboardRepository->getAllCountInformations();

        return [
            'currentlyBorrowed' => $counts['getAllCountHasActiveLoan'],
            'booksRead'         => $counts['getAllCountReturnBook'],
            'dueSoon'           => $counts['getAllCountDeadlineDueDateBook'],
            'totalFines'        => $counts['totalFineNominal'],
            'fineCount'         => $counts['getAllCountFinePayment'],
        ];
    }

    // ================= CHARTS =================

    public function getCharts(): array
    {
        return [
            'borrowing'   => $this->dashboardRepository->getUserAuthCountBorrowingWeek(),
            'returning'   => $this->dashboardRepository->getUserAuthCountReturningWeek(),
            'finePayment' => $this->dashboardRepository->getUserAuthCountFinePaymentWeek(),
        ];
    }

    // ================= PAGINATED LISTS =================

    public function getLoansRaw(array $filters, int $perPage, int $page): LengthAwarePaginator
    {
        return $this->dashboardRepository->getUserAuthAllLoanBook($filters, $perPage, $page);
    }

    public function getReturnBooksRaw(array $filters, int $perPage, int $page): LengthAwarePaginator
    {
        return $this->dashboardRepository->getUserAuthAllReturnBook($filters, $perPage, $page);
    }

    // ================= TRANSFORM =================

    public function transformLoans(LengthAwarePaginator $paginator): array
    {
        return paginateResource($paginator, LoanResource::class);
    }

    public function transformReturnBooks(LengthAwarePaginator $paginator): array
    {
        return paginateResource($paginator, ReturnBookResource::class);
    }

    // ================= CATEGORIES =================

    public function getCategories(): array
    {
        return Category::query()->orderBy('name')->pluck('name')->toArray();
    }
}
