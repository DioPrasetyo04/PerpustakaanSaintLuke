<?php

namespace App\Services;

use App\Enums\BookCondition;
use App\Enums\DiscountType;
use App\Enums\LoanBookStatus;
use App\Enums\PaymentStatus;
use App\Enums\ReturnBookStatus;
use App\Exceptions\BusinessException;
use App\Http\Resources\BookResource;
use App\Http\Resources\LoanResource;
use App\Http\Resources\ReturnBookResource;
use App\Interface\LoanInterfaceRepositories;
use App\Interface\ReturnBookInterfaceRepositories;
use App\Models\Fine;
use App\Models\FineSettings;
use App\Models\ReturnBook;
use App\Models\ReviewBook;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class ReturnBookService
{

    protected $returnBookService;
    protected $loanService;

    public function __construct(ReturnBookInterfaceRepositories $returnBookRepositories, LoanInterfaceRepositories $loanRepositories)
    {
        $this->returnBookService = $returnBookRepositories;
        $this->loanService = $loanRepositories;
    }

    public function getConfirmationReturnBookUserAuth(string $slug, string $loanCode, int $userId)
    {
        $book = $this->returnBookService->findBookBySlug($slug);

        $loan = $this->loanService->getLoanDetail($userId, $loanCode);
        $loanDetail = $this->resolveLoanDetailForBook($loan, $book->id);

        $loanArray = transformData($loan, LoanResource::class);

        $fineSetting = FineSettings::checkSettings();

        $today = Carbon::now();
        $dueDate = Carbon::parse($loanDetail->due_date);

        $lateDays = 0;
        $lateFee = 0;

        if ($today->gt($dueDate)) {
            $lateDays = $today->diffInDays($dueDate);
            $lateFee = $lateDays * $fineSetting->late_fee_per_day;
        }

        return [
            'book' => transformData($book, BookResource::class),
            'loan' => $loanArray,
            'late_days' => $lateDays,
            'late_fee' => $lateFee,
            'total_fee' => $lateFee,
            'has_review' => ReviewBook::where('loan_user_id', $loanDetail->id)->exists(),
        ];
    }

    public function processReturnBook(array $data, int $userId, string $slug)
    {
        return DB::transaction(function () use ($data, $userId, $slug) {
            $loan = $this->loanService->getLoanDetail($userId, $data['loan_code']);
            $book = $this->returnBookService->findBookBySlug($slug);
            $loanDetail = $this->resolveLoanDetailForBook($loan, $book->id);

            if ($loanDetail->returnBook) {
                throw new BusinessException('return.has_return_book');
            }

            $condition = $data['condition'] ?? BookCondition::GOOD->value;

            $fineSetting = FineSettings::checkSettings();

            $this->validateReturnBook($userId, $loanDetail->book_id);

            $today = Carbon::now();
            $dueDate = Carbon::parse($loanDetail->due_date);

            $lateDays = 0;
            $lateFee = 0;

            if ($today->gt($dueDate)) {
                $lateDays = $today->diffInDays($dueDate);
                $lateFee = $lateDays * $fineSetting->late_fee_per_day;
            }

            $otherFee = 0;

            if ($condition === BookCondition::DAMAGED->value) {
                $otherFee = $fineSetting->damage_discount_type === DiscountType::PERCENTAGE ? ($fineSetting->damage_fee_book * $book->price) / 100 : $fineSetting->damage_fee_book;
            }

            if ($condition === BookCondition::LOST->value) {
                $otherFee = $fineSetting->lost_discount_type === DiscountType::PERCENTAGE ? ($fineSetting->lost_fee_book * $book->price) / 100 :  $fineSetting->lost_fee_book;
            }

            $totalFee = $lateFee + $otherFee;

            $status = $totalFee > 0 ? ReturnBookStatus::COST : ReturnBookStatus::RETURNED;

            $returnBook = $this->returnBookService->createReturnBook([
                'return_book_code' => generateUniqueCode('return_book', ReturnBook::class, 'return_book_code'),
                'loan_user_id' => $loanDetail->id,
                'return_date' => $today,
                'status' => $status
            ]);

            $notes = match ($condition) {
                BookCondition::DAMAGED->value => 'Buku Rusak Saat Dikembalikan',
                BookCondition::LOST->value => 'Buku Hilang Saat Dikembalikan',
                default => 'Buku Dalam Kondisi Baik Saat Dikembalikan'
            };

            $this->returnBookService->createReturnBookCheck([
                'return_book_id' => $returnBook->id,
                'condition' => $condition,
                'notes' => $notes
            ]);

            if ($totalFee > 0) {
                $this->returnBookService->createFinePayment([
                    'return_book_id' => $returnBook->id,
                    'late_fee' => $lateFee,
                    'other_fee' => $otherFee,
                    'total_fee' => $totalFee,
                    'fine_date' => now(),
                    'payment_status' => PaymentStatus::PENDING->value,
                ]);
            }

            $loanDetail->update(['status' => LoanBookStatus::RETURNED]);

            $loan->recomputeStatus();

            return $returnBook;
        });
    }

    private function resolveLoanDetailForBook($loan, int $bookId)
    {
        $loan->loadMissing(['loanDetails.returnBook', 'loanDetails.book']);

        $detail = $loan->loanDetails->firstWhere('book_id', $bookId);

        if (! $detail) {
            throw new BusinessException('return.loan_detail_not_found', 404);
        }

        return $detail;
    }

    public function storeReview(string $returnBookCode, array $data, int $userId): void
    {
        $return = ReturnBook::query()
            ->where('return_book_code', $returnBookCode)
            ->whereHas('loanDetail.loan', fn($q) => $q->where('user_id', $userId))
            ->firstOrFail();

        if (ReviewBook::where('loan_user_id', $return->loan_user_id)->exists()) {
            throw new BusinessException('review.already_exists', 400);
        }

        $this->returnBookService->createReviewBook([
            'loan_user_id'   => $return->loan_user_id,
            'return_book_id' => $return->id,
            'rating'         => $data['rating'],
            'comment'        => $data['comment'] ?? null,
        ]);
    }

    public function getDataReturnBookUserAuth(array $filters, int $perPage, int $page)
    {
        $auth = auth()->user();

        $returns = $this->returnBookService->getReturnBookByUser($auth->id, $filters, $perPage, $page);

        return transformData($returns, ReturnBookResource::class);
    }

    public function getDetailReturnBookUserAuth(string $returnBookCode)
    {
        $auth = auth()->user();

        $return = $this->returnBookService->getReturnBookDetail($auth->id, $returnBookCode);

        return transformData($return, ReturnBookResource::class);
    }

    private function validateReturnBook(int $userId, int $bookId)
    {
        if (!FineSettings::checkSettings()) {
            throw new BusinessException("return.settings_not_configured", 500);
        }

        if (Fine::hasUnpaidFine($userId)) {
            throw new BusinessException("return.has_unpaid_fine");
        }

        if (!ReturnBook::checkUserVerified($userId)) {
            throw new BusinessException("loan.user_not_verified", 403);
        }
    }
}
