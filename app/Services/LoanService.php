<?php

namespace App\Services;

use App\Interface\LoanInterfaceRepositories;
use App\Models\FineSettings;
use App\Models\Loan;
use Exception;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Support\Facades\DB;

class LoanService
{
    protected $loanService;

    public function __construct(LoanInterfaceRepositories $loanRepositories)
    {
        $this->loanService = $loanRepositories;
    }

    public function getConfirmationLoanUserAuth(string $slug)
    {
        $auth = auth()->user();

        if (!$auth) {
            throw new AuthorizationException("Unauthenticated");
        }

        if (!($auth->hasRole('admin') || $auth->hasRole('pengelola-perpustakaan'))) {
            throw new AuthorizationException("Forbidden");
        }

        $book = $this->loanService->findBookBySlug($slug);

        $duration = FineSettings::query()->value('loan_duration_days') ?? 14;

        return [
            'book' => $book,
            'loan_preview' => [
                'loan_date' => now(),
                'due_date' => now()->addDays($duration),
                'duration' => $duration
            ]
        ];
    }

    public function postDataLoanUserAuth(array $data)
    {
        $auth = auth()->user();

        if (!$auth) {
            throw new AuthorizationException("Unauthenticated");
        }

        if (!($auth->hasRole('admin') || $auth->hasRole('pengelola-perpustakaan'))) {
            throw new AuthorizationException("Forbidden");
        }

        $this->validateLoan($auth->id, $data['book_id']);

        $duration = FineSettings::query()->value('loan_duration_days') ?? 14;

        return DB::transaction(function () use ($auth, $data, $duration) {

            $loan = $this->loanService->createLoan([
                'user_id' => $auth->id,
                'loan_code' => generateUniqueCode('Loan', Loan::class, 'loan_code'),
                'book_id' => $data['book_id'],
                'loan_date' => now(),
                'due_date' => now()->addDays($duration),
            ]);

            Loan::substractionStock($data['book_id']);
            Loan::addLoanStock($data['book_id']);

            return $loan;
        });
    }

    public function getDataLoanUserAuth(array $filters, int $perPage, int $page)
    {
        $auth = auth()->user();

        if (!$auth) {
            throw new AuthorizationException();
        }

        if (!($auth->hasRole('admin') || $auth->hasRole('pengelola-perpustakaan'))) {
            throw new AuthorizationException();
        }

        return $this->loanService->getLoansByUser($auth->id, $filters, $perPage, $page);
    }

    public function getDetailLoanUserAuth(string $loanCode)
    {
        $auth = auth()->user();

        if (!$auth) {
            throw new AuthorizationException();
        }

        if (!($auth->hasRole('admin') || $auth->hasRole('pengelola-perpustakaan'))) {
            throw new AuthorizationException();
        }

        return $this->loanService->getLoanDetail($auth->id, $loanCode);
    }

    private function validateLoan(int $userId, int $bookId)
    {
        if (Loan::hasActiveLoan($userId, $bookId)) {
            throw new Exception("Masih ada pinjaman aktif");
        }

        if (!Loan::checkStock($bookId)) {
            throw new Exception("Stok buku habis");
        }

        if (!Loan::checkUserVerified($userId)) {
            throw new Exception("User belum verifikasi email");
        }

        if (!FineSettings::existsSettings()) {
            throw new Exception("Fine settings belum dibuat");
        }
    }
}
