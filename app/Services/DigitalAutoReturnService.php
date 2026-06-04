<?php

namespace App\Services;

use App\Enums\BookCondition;
use App\Enums\ReturnBookStatus;
use App\Models\LoanDetail;
use App\Models\ReturnBook;
use App\Models\ReturnBookCheck;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class DigitalAutoReturnService
{
    public function autoReturn(LoanDetail $loanDetail): void
    {
        $today = Carbon::now();

        DB::transaction(function () use ($loanDetail, $today) {
            $returnBook = ReturnBook::create([
                'return_book_code' => generateUniqueCode('return_book', ReturnBook::class, 'return_book_code'),
                'loan_user_id'     => $loanDetail->id,
                'return_date'      => $today,
                'status'           => ReturnBookStatus::RETURNED,
            ]);

            ReturnBookCheck::create([
                'return_book_id' => $returnBook->id,
                'condition'      => BookCondition::GOOD->value,
                'notes'          => 'Auto-return: masa peminjaman digital habis',
            ]);
        });
    }
}
