<?php

namespace App\Interface;

use App\Models\Loan;
use Illuminate\Pagination\LengthAwarePaginator;

interface LoanInterfaceRepositories
{
    public function findBookBySlug(string $slug);
    public function createLoan(array $loanData, array $detailData): Loan;
    public function addDetailToLoan(Loan $loan, array $detailData): Loan;
    public function getLoansByUser(int $userId, array $filters, int $perPage, int $page);
    public function getLoanDetail(int $userId, string $loanCode);
}
