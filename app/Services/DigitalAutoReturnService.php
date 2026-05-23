<?php

namespace App\Services;

use App\Enums\BookCondition;
use App\Enums\PaymentStatus;
use App\Enums\ReturnBookStatus;
use App\Models\Fine;
use App\Models\FineSettings;
use App\Models\LoanDetail;
use App\Models\ReturnBook;
use App\Models\ReturnBookCheck;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class DigitalAutoReturnService
{
    public function autoReturn(LoanDetail $loanDetail): void
    {
        $fineSetting = FineSettings::checkSettings();
        $today = Carbon::now();
        $dueDate = Carbon::parse($loanDetail->due_date);

        $lateDays = $today->gt($dueDate) ? $today->diffInDays($dueDate) : 0;
        $lateFee = $lateDays * ($fineSetting?->late_fee_per_day ?? 0);
        $status = $lateFee > 0 ? ReturnBookStatus::COST : ReturnBookStatus::RETURNED;

        DB::transaction(function () use ($loanDetail, $lateFee, $status, $today) {
            $returnBook = ReturnBook::create([
                'return_book_code' => generateUniqueCode('return_book', ReturnBook::class, 'return_book_code'),
                'loan_user_id'     => $loanDetail->id,
                'return_date'      => $today,
                'status'           => $status,
            ]);

            ReturnBookCheck::create([
                'return_book_id' => $returnBook->id,
                'condition'      => BookCondition::GOOD->value,
                'notes'          => 'Auto-return: masa peminjaman habis',
            ]);

            if ($lateFee > 0) {
                Fine::create([
                    'return_book_id' => $returnBook->id,
                    'late_fee'       => $lateFee,
                    'other_fee'      => 0,
                    'total_fee'      => $lateFee,
                    'fine_date'      => $today,
                    'payment_status' => PaymentStatus::PENDING->value,
                ]);
            }
        });
    }
}
