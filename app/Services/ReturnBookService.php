<?php

use App\Enums\BookCondition;
use App\Enums\DiscountType;
use App\Enums\PaymentStatus;
use App\Enums\ReturnBookStatus;
use App\Http\Resources\LoanResource;
use App\Http\Resources\ReturnBookResource;
use App\Interface\LoanInterfaceRepositories;
use App\Interface\ReturnBookInterfaceRepositories;
use App\Models\Fine;
use App\Models\FineSettings;
use App\Models\ReturnBook;
use App\Models\ReturnBookCheck;
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

        $loan = transformData($loan, LoanResource::class);

        $fineSetting = FineSettings::checkSettings();

        $today = Carbon::now();
        $dueDate = Carbon::parse($loan->due_date);

        $lateDays = 0;
        $lateFee = 0;

        if ($today->gt($dueDate)) {
            $lateDays = $today->diffInDays($dueDate);
            $lateFee = $lateDays * $fineSetting->late_fee_per_day;
        }

        return [
            'book' => $book,
            'loan' => $loan,
            'late_days' => $lateDays,
            'late_fee' => $lateFee,
            'total_fee' => $lateFee,
        ];
    }

    public function processReturnBook(array $data, int $userId, string $slug)
    {
        return DB::transaction(function () use ($data, $userId, $slug) {
            $loan = $this->loanService->getLoanDetail($userId, $data['loan_code']);
            $book = $this->returnBookService->findBookBySlug($slug);
            $fineSetting = FineSettings::checkSettings();

            $today = Carbon::now();
            $dueDate = Carbon::parse($loan->due_date);

            $lateDays = 0;
            $lateFee = 0;

            if ($today->gt($dueDate)) {
                $lateDays = $today->diffInDays($dueDate);
                $lateFee = $lateDays * $fineSetting->late_fee_per_day;
            }

            $otherFee = 0;

            if ($data['condition'] === BookCondition::DAMAGED->value) {
                if ($fineSetting->damage_discount_type === DiscountType::PERCENTAGE->value) {
                    $otherFee = ($fineSetting->damage_fee_book * $book->price) / 100;
                } else {
                    $otherFee = $fineSetting->damage_fee_book;
                }
            }

            if ($data['condition'] === BookCondition::LOST->value) {
                if ($fineSetting->lost_discount_type === DiscountType::PERCENTAGE->value) {
                    $otherFee = ($fineSetting->lost_fee_book * $book->price) / 100;
                } else {
                    $otherFee = $fineSetting->lost_fee_book;
                }
            }

            $totalFee = $lateFee + $otherFee;

            $status = $totalFee > 0 ? ReturnBookStatus::COST->value : ReturnBookStatus::RETURNED->value;

            $returnBook = $this->returnBookService->createReturnBook([
                'return_book_code' => generateUniqueCode('return_book', ReturnBook::class, $data['return_book_code']),
                'loan_id' => $loan->id,
                'book_id' => $loan->book_id,
                'user_id' => $userId,
                'return_date' => $today,
                'status' => $status
            ]);

            $notes = '';

            if ($data['condition'] === BookCondition::DAMAGED->value) {
                $notes = 'Buku Dikembalikan Dalam Keadaan Rusak';
            }

            if ($data['condition'] === BookCondition::LOST->value) {
                $notes = 'Buku Dikembalikan Dalam Keadaan Hilang';
            }

            $notes = 'Buku Dikembalikan dalam keadaan aman dan baik';

            $this->returnBookService->createReturnBookCheck([
                'return_book_id' => $returnBook->id,
                'condition' => $data['condition'],
                'notes' => $notes
            ]);

            match ($data['condition']) {
                BookCondition::GOOD->value => ReturnBookCheck::addReturnStock($loan->book_id),
                BookCondition::DAMAGED->value => ReturnBookCheck::addDamagedStock($loan->book_id),
                BookCondition::LOST->value => ReturnBookCheck::addLostStock($loan->book_id),
            };

            if ($totalFee > 0) {
                $this->returnBookService->createFinePayment([
                    'return_book_id' => $returnBook->id,
                    'user_id' => $userId,
                    'late_fee' => $lateFee,
                    'total_fee' => $totalFee,
                    'fine_date' => now(),
                    'payment_status' => PaymentStatus::PENDING->value,
                ]);
            }
            return $returnBook;
        });
    }

    public function createReviewBook(array $data)
    {
        $this->returnBookService->createReviewBook([
            'user_id' => $data['user_id'],
            'book_id' => $data['book_id'],
            'rating' => $data['rating'],
            'comment' => $data['comment'] ?? null,
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
}
