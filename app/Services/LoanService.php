<?php

namespace App\Services;

use App\Enums\LoanType;
use App\Exceptions\BusinessException;
use App\Http\Resources\BookResource;
use App\Http\Resources\FineSettingsResource;
use App\Http\Resources\LoanResource;
use App\Interface\LoanInterfaceRepositories;
use App\Models\Fine;
use App\Models\FineSettings;
use App\Models\Loan;
use App\Models\Stock;
use Carbon\Carbon;
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

        $fineSetting = FineSettings::query()->select([
            'id',
            'late_fee_per_day',
            'damage_discount_type',
            'damage_fee_book',
            'lost_discount_type',
            'lost_fee_book'
        ])->firstOrFail();

        return [
            'book' => BookResource::make($book)->resolve(),
            'fine_settings' => FineSettingsResource::make($fineSetting)->resolve(),
            'loan_preview' => [
                'loan_date' => Carbon::parse(now())->format('d F Y'),
                'due_date' => Carbon::parse(now())->addDays($duration)->format('d F Y'),
                'duration' => $duration
            ]
        ];
    }

    public function postDataLoanUserAuth(array $data): Loan
    {
        $auth = auth()->user();

        $this->validateLoan($auth->id, $data['book_id']);

        $duration = FineSettings::query()->value('loan_duration_days') ?? 14;

        try {
            return DB::transaction(function () use ($auth, $data, $duration) {
                $detailData = [
                    'book_id'   => $data['book_id'],
                    'loan_date' => now(),
                    'due_date'  => now()->addDays($duration),
                    'loan_type' => LoanType::DIGITAL->value,
                ];

                $existingLoan = Loan::getActiveLoan($auth->id);

                if ($existingLoan) {
                    return $this->loanService->addDetailToLoan($existingLoan, $detailData);
                }

                return $this->loanService->createLoan(
                    [
                        'user_id'   => $auth->id,
                        'loan_code' => generateUniqueCode('Loan', Loan::class, 'loan_code'),
                    ],
                    $detailData
                );
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
        // RULE 1: Buku yang sama tidak boleh dipinjam dua kali sebelum dikembalikan
        if (Loan::hasActiveLoan($userId, $bookId)) {
            throw new BusinessException("loan.same_book_active");
        }

        // RULE 2: Tidak boleh meminjam jika masih ada denda yang belum dibayar
        if (Fine::hasUnpaidFine($userId)) {
            throw new BusinessException("loan.has_unpaid_fine");
        }

        // RULE 3: Stok buku harus tersedia
        if (!Loan::checkStock($bookId)) {
            throw new BusinessException("loan.stock_empty");
        }

        // RULE 4: Akun pengguna harus sudah terverifikasi
        if (!Loan::checkUserVerified($userId)) {
            throw new BusinessException("loan.user_not_verified", 403);
        }

        // RULE 5: Pengaturan denda/peminjaman harus sudah dikonfigurasi
        if (!FineSettings::checkSettings()) {
            throw new BusinessException("loan.settings_not_configured", 500);
        }
    }
}
