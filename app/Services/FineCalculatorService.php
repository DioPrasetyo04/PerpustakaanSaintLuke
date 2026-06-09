<?php

namespace App\Services;

use App\Enums\BookCondition;
use App\Enums\DiscountType;
use App\Enums\PaymentStatus;
use App\Enums\ReturnBookStatus;
use App\Models\Book;
use App\Models\Fine;
use App\Models\FineSettings;
use App\Models\ReturnBook;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

/**
 * Sumber kebenaran tunggal untuk perhitungan denda pengembalian buku.
 *
 * Dipakai saat membuat/mengubah pengembalian (Create/Edit ReturnBooks) maupun
 * saat data buku berubah (mis. harga buku baru diisi) agar nominal denda yang
 * sudah ada ikut diperbarui dan tetap konsisten dengan pengaturan denda terkini.
 */
class FineCalculatorService
{
    /**
     * Hitung komponen denda dari nilai mentah.
     *
     * @return array{condition:string, late_fee:float, other_fee:float, total_fee:float, should_have_fine:bool}
     */
    public static function calculateRaw(
        string $condition,
        Carbon|string|null $returnDate,
        Carbon|string|null $dueDate,
        float $bookPrice,
        ?FineSettings $fineSetting = null,
    ): array {
        $fineSetting ??= FineSettings::first();

        $returnDate = $returnDate ? Carbon::parse($returnDate) : now();
        $dueDate = $dueDate ? Carbon::parse($dueDate) : null;

        $lateFee = 0.0;
        $otherFee = 0.0;

        if ($fineSetting && $dueDate && $returnDate->gt($dueDate)) {
            $lateDays = (int) $dueDate->diffInDays($returnDate);
            $lateFee = $lateDays * (float) $fineSetting->late_fee_per_day;
        }

        if ($fineSetting && $condition === BookCondition::DAMAGED->value) {
            $otherFee = static::resolveType($fineSetting->damage_discount_type) === DiscountType::PERCENTAGE
                ? ((float) $fineSetting->damage_fee_book * $bookPrice) / 100
                : (float) $fineSetting->damage_fee_book;
        }

        if ($fineSetting && $condition === BookCondition::LOST->value) {
            $otherFee = static::resolveType($fineSetting->lost_discount_type) === DiscountType::PERCENTAGE
                ? ((float) $fineSetting->lost_fee_book * $bookPrice) / 100
                : (float) $fineSetting->lost_fee_book;
        }

        // Buku rusak / hilang selalu dianggap denda meskipun nominalnya 0,
        // agar tetap tercatat di fitur denda untuk ditindaklanjuti admin.
        $isDamagedOrLost = in_array($condition, [
            BookCondition::DAMAGED->value,
            BookCondition::LOST->value,
        ], true);

        $totalFee = $lateFee + $otherFee;

        return [
            'condition' => $condition,
            'late_fee' => $lateFee,
            'other_fee' => $otherFee,
            'total_fee' => $totalFee,
            'should_have_fine' => $totalFee > 0 || $isDamagedOrLost,
        ];
    }

    /**
     * Hitung denda untuk sebuah ReturnBook berdasarkan relasinya.
     *
     * @return array{condition:string, late_fee:float, other_fee:float, total_fee:float, should_have_fine:bool}
     */
    public static function calculate(ReturnBook $returnBook, ?FineSettings $fineSetting = null): array
    {
        $loanDetail = $returnBook->loanDetail;
        $book = $loanDetail?->book;

        $condition = $returnBook->returnBookCheck?->condition?->value
            ?? BookCondition::GOOD->value;

        return static::calculateRaw(
            $condition,
            $returnBook->return_date,
            $loanDetail?->due_date,
            (float) ($book?->price ?? 0),
            $fineSetting,
        );
    }

    /**
     * Sinkronkan ulang denda yang BELUM lunas untuk semua pengembalian buku
     * tertentu. Dipanggil ketika harga buku berubah agar nominal denda lama
     * ikut diperbarui. Denda yang sudah dibayar (SUCCESS) tidak diutak-atik.
     */
    public static function recalculateUnpaidForBook(Book $book): int
    {
        $fineSetting = FineSettings::first();
        if (! $fineSetting) {
            return 0;
        }

        $returnBooks = ReturnBook::query()
            ->whereHas('loanDetail', fn($q) => $q->where('book_id', $book->id))
            ->whereHas('fine', fn($q) => $q->where('payment_status', '!=', PaymentStatus::SUCCESS->value))
            ->with(['loanDetail', 'returnBookCheck', 'fine'])
            ->get();

        $updated = 0;

        DB::transaction(function () use ($returnBooks, $book, $fineSetting, &$updated) {
            foreach ($returnBooks as $returnBook) {
                $fine = $returnBook->fine;
                if (! $fine || $fine->payment_status === PaymentStatus::SUCCESS) {
                    continue;
                }

                // Pastikan perhitungan memakai harga buku yang baru disimpan.
                $returnBook->loanDetail?->setRelation('book', $book);

                $calc = static::calculate($returnBook, $fineSetting);

                if ($calc['should_have_fine']) {
                    $fine->update([
                        'late_fee' => $calc['late_fee'],
                        'other_fee' => $calc['other_fee'],
                        'total_fee' => $calc['total_fee'],
                    ]);

                    if ($returnBook->status !== ReturnBookStatus::COST) {
                        $returnBook->update(['status' => ReturnBookStatus::COST]);
                    }
                } else {
                    $fine->delete();
                    $returnBook->update(['status' => ReturnBookStatus::RETURNED]);
                }

                $updated++;
            }
        });

        return $updated;
    }

    private static function resolveType($type): ?DiscountType
    {
        return $type instanceof DiscountType
            ? $type
            : DiscountType::tryFrom((string) $type);
    }
}
