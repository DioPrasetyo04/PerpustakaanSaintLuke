<?php


namespace App\Interface;

use Illuminate\Pagination\LengthAwarePaginator;

interface DashboardInterfaceRepositories
{
    public function getAllCountInformations();

    public function getUserAuthCountBorrowingWeek();

    public function getUserAuthCountReturningWeek();

    public function getUserAuthCountFinePaymentWeek();

    public function getUserAuthAllLoanBook(array $filters, int $perPage, int $page): LengthAwarePaginator;
    public function getUserAuthAllReturnBook(array $filters, int $perPage, int $page): LengthAwarePaginator;
}
