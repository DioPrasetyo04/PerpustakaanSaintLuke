<?php

namespace App\Traits;

use App\Enums\BookCondition;
use App\Enums\DiscountType;
use App\Enums\PaymentStatus;
use App\Models\Fine;
use App\Models\FineSettings;
use App\Models\ReturnBookCheck;
use Illuminate\Support\Carbon;

trait HandleReturnBook
{
    protected function handleReturnBookCheck($record): void
    {
        $condition = $record->returnBookCheck?->condition;
        $book = $record->book;
        $loan = $record->loan;

        if (!$condition) return;

        $fineSetting = FineSettings::first();
        if (!$fineSetting) return;

        match ($condition) {
            BookCondition::GOOD => ReturnBookCheck::addReturnStock($book->id),
            BookCondition::DAMAGED => ReturnBookCheck::addDamagedStock($book->id),
            BookCondition::LOST => ReturnBookCheck::addLostStock($book->id),
        };

        $lateFee = 0;
        $otherFee = 0;

        if ($record->return_date > $loan->due_date) {
            $daysLate = $loan->due_date->diffInDays($record->return_date);
            $lateFee = $daysLate * $fineSetting->late_fee_per_day;
        }

        if ($condition === BookCondition::DAMAGED) {
            if ($fineSetting->damage_discount_type === DiscountType::PERCENTAGE) {
                $otherFee = $book->price * ($fineSetting->damage_fee_book / 100);
            } else {
                $otherFee = $fineSetting->damage_fee_book;
            }
        }

        if ($condition === BookCondition::LOST) {
            if ($fineSetting->lost_discount_type === DiscountType::PERCENTAGE) {
                $otherFee = $book->price * ($fineSetting->lost_fee_book / 100);
            } else {
                $otherFee = $fineSetting->lost_fee_book;
            }
        }

        $total = $lateFee + $otherFee;

        if ($total <= 0) return;

        Fine::updateOrCreate(
            ['return_book_id' => $record->id],
            [
                'user_id' => $record->user_id,
                'late_fee' => $lateFee,
                'other_fee' => $otherFee,
                'total_fee' => $total,
                'fine_date' => now(),
                'payment_status' => PaymentStatus::PENDING->value,
            ]
        );
    }
}
