<?php

namespace App\Traits;

use App\Enums\BookCondition;
use App\Enums\DiscountType;
use App\Enums\PaymentStatus;
use App\Models\Fine;
use App\Models\FineSettings;
use App\Models\ReturnBookCheck;
use Illuminate\Support\Facades\DB;

trait HandleReturnBook
{
    protected function handleReturnBookCheck($record, $oldCondition = null): void
    {
        DB::transaction(function () use ($record, $oldCondition) {

            $fineSetting = FineSettings::first();

            $record->refresh()->load([
                'book',
                'loan'
            ]);

            $condition = ReturnBookCheck::where('return_book_id', $record->id)
                ->first()?->condition;

            if (!$condition) {
                return;
            }

            $book = $record->book;
            $loan = $record->loan;

            /*
            |--------------------------------------------------------------------------
            | rollback old condition
            |--------------------------------------------------------------------------
            */
            if ($oldCondition && $oldCondition !== $condition) {

                match ($oldCondition) {
                    BookCondition::GOOD => DB::table('stocks')
                        ->where('book_id', $book->id)
                        ->update([
                            'available' => DB::raw('GREATEST(available - 1,0)'),
                            'loan' => DB::raw('loan + 1'),
                        ]),

                    BookCondition::DAMAGED => DB::table('stocks')
                        ->where('book_id', $book->id)
                        ->update([
                            'damaged' => DB::raw('GREATEST(damaged - 1,0)'),
                            'loan' => DB::raw('loan + 1'),
                        ]),

                    BookCondition::LOST => DB::table('stocks')
                        ->where('book_id', $book->id)
                        ->update([
                            'lost' => DB::raw('GREATEST(lost - 1,0)'),
                            'loan' => DB::raw('loan + 1'),
                        ]),
                };
            }

            /*
            |--------------------------------------------------------------------------
            | apply new condition
            |--------------------------------------------------------------------------
            */
            match ($condition) {
                BookCondition::GOOD => ReturnBookCheck::addReturnStock($book->id),
                BookCondition::DAMAGED => ReturnBookCheck::addDamagedStock($book->id),
                BookCondition::LOST => ReturnBookCheck::addLostStock($book->id),
            };

            /*
            |--------------------------------------------------------------------------
            | GOOD → DELETE FINE
            |--------------------------------------------------------------------------
            */
            if ($condition === BookCondition::GOOD) {
                Fine::where('return_book_id', $record->id)->delete();
                return;
            }

            $lateFee = 0;
            $otherFee = 0;

            if ($record->return_date > $loan->due_date) {
                $daysLate = $loan->due_date->diffInDays($record->return_date);
                $lateFee = $daysLate * $fineSetting->late_fee_per_day;
            }

            if ($condition === BookCondition::DAMAGED) {
                $otherFee = $fineSetting->damage_discount_type === DiscountType::PERCENTAGE
                    ? $book->price * ($fineSetting->damage_fee_book / 100)
                    : $fineSetting->damage_fee_book;
            }

            if ($condition === BookCondition::LOST) {
                $otherFee = $fineSetting->lost_discount_type === DiscountType::PERCENTAGE
                    ? $book->price * ($fineSetting->lost_fee_book / 100)
                    : $fineSetting->lost_fee_book;
            }

            $total = $lateFee + $otherFee;

            Fine::updateOrCreate(
                ['return_book_id' => $record->id],
                [
                    'user_id' => $record->user_id,
                    'late_fee' => $lateFee,
                    'other_fee' => $otherFee,
                    'total_fee' => $total,
                    'fine_date' => now(),
                    'payment_status' => PaymentStatus::PENDING,
                ]
            );
        });
    }
}
