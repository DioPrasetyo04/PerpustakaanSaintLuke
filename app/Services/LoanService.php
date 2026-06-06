<?php

namespace App\Services;

use App\Enums\BookType;
use App\Enums\LoanType;
use App\Exceptions\BusinessException;
use App\Http\Resources\BookResource;
use App\Http\Resources\FineSettingsResource;
use App\Http\Resources\LoanResource;
use App\Interface\LoanInterfaceRepositories;
use App\Models\Book;
use App\Models\Fine;
use App\Models\FineSettings;
use App\Models\Loan;
use Carbon\Carbon;
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

    /**
     * Alur "Baca Buku": catat peminjaman DIGITAL lalu izinkan akses aset.
     * - Jika sudah ada pinjaman aktif buku ini (fisik/digital) → DITOLAK
     *   (loan.already_reading) karena buku sedang aktif dibaca/dipinjam.
     * - Pinjaman digital di-auto-return saat due_date lewat (lihat EnsureUserHasActiveLoan).
     */
    public function readDigitalBook(string $slug): string
    {
        $auth = auth()->user();
        $book = $this->loanService->findBookBySlug($slug);

        // Sudah punya pinjaman aktif buku ini → tolak (buku sedang aktif dibaca).
        if (Loan::hasActiveLoan($auth->id, $book->id)) {
            throw new BusinessException('loan.already_reading', 409);
        }

        $this->validateDigitalRead($auth->id, $book);

        $duration = FineSettings::query()->value('loan_duration_days') ?? 14;

        DB::transaction(function () use ($auth, $book, $duration) {
            $detailData = [
                'book_id'   => $book->id,
                'loan_date' => now(),
                'due_date'  => now()->addDays($duration),
                'loan_type' => LoanType::DIGITAL->value,
            ];

            $existingLoan = Loan::getActiveLoan($auth->id);

            if ($existingLoan) {
                $this->loanService->addDetailToLoan($existingLoan, $detailData);
            } else {
                $this->loanService->createLoan(
                    [
                        'user_id'   => $auth->id,
                        'loan_code' => generateUniqueCode('Loan', Loan::class, 'loan_code'),
                    ],
                    $detailData
                );
            }
        });

        return $book->slug;
    }

    private function validateDigitalRead(int $userId, Book $book): void
    {
        // RULE 1: Buku harus memiliki format Digital.
        $isDigital = $book->relationLoaded('types')
            && $book->types->contains(fn ($type) => $type->type === BookType::DIGITAL->value);

        if (! $isDigital) {
            throw new BusinessException('loan.not_digital', 422);
        }

        // RULE 2: Tidak boleh ada denda yang belum dibayar.
        if (Fine::hasUnpaidFine($userId)) {
            throw new BusinessException('loan.has_unpaid_fine');
        }

        // RULE 3: Akun harus terverifikasi.
        if (! Loan::checkUserVerified($userId)) {
            throw new BusinessException('loan.user_not_verified', 403);
        }

        // RULE 4: Pengaturan denda/peminjaman harus terkonfigurasi.
        if (! FineSettings::checkSettings()) {
            throw new BusinessException('loan.settings_not_configured', 500);
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
}
