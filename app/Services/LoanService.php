<?php

namespace App\Services;

use App\Exceptions\BusinessException;
use App\Http\Resources\BookResource;
use App\Http\Resources\LoanResource;
use App\Interface\LoanInterfaceRepositories;
use App\Models\Fine;
use App\Models\FineSettings;
use App\Models\Loan;
use Exception;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Throwable;

class LoanService
{
    protected $loanService;

    public function __construct(LoanInterfaceRepositories $loanRepositories)
    {
        $this->loanService = $loanRepositories;
    }

    public function getConfirmationLoanUserAuth(string $slug)
    {
        $book = $this->loanService->findBookBySlug($slug);

        $duration = FineSettings::query()->value('loan_duration_days') ?? 14;

        return [
            'book' => transformData($book, BookResource::class),
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

        $this->validateLoan($auth->id, $data['book_id']);

        $duration = FineSettings::query()->value('loan_duration_days') ?? 14;

        try {
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
        } catch (Throwable $th) {
            throw $th;
        }
    }

    public function getDataLoanUserAuth(array $filters, int $perPage, int $page)
    {
        $auth = auth()->user();

        $loans = $this->loanService->getLoansByUser($auth->id, $filters, $perPage, $page);

        return transformData($loans, LoanResource::class);
    }

    public function getDetailLoanUserAuth(string $loanCode)
    {
        $auth = auth()->user();

        $loan = $this->loanService->getLoanDetail($auth->id, $loanCode);

        return transformData($loan, LoanResource::class);
    }
    private function validateLoan(int $userId, int $bookId)
    {
        // 🔥 RULE 1 (WAJIB DULU)
        if (Loan::hasUserActiveLoan($userId)) {
            throw new BusinessException("loan.only_one_active", 400, ['limit' => 1]);
        }

        // 🔥 RULE 2 (OPTIONAL SEBENARNYA)
        if (Loan::hasActiveLoan($userId, $bookId)) {
            throw new BusinessException("loan.same_book_active");
        }

        // 🔥 RULE 3 (DENDA)
        if (Fine::hasUnpaidFine($userId)) {
            throw new BusinessException("loan.has_unpaid_fine");
        }

        // 🔥 RULE 4 (STOK)
        if (!Loan::checkStock($bookId)) {
            throw new BusinessException("loan.stock_empty");
        }

        // 🔥 RULE 5 (VERIFIED)
        if (!Loan::checkUserVerified($userId)) {
            throw new BusinessException("loan.user_not_verified", 403);
        }

        // 🔥 RULE 6 (SETTING)
        if (!FineSettings::checkSettings()) {
            throw new BusinessException("loan.settings_not_configured", 500);
        }
    }
}
