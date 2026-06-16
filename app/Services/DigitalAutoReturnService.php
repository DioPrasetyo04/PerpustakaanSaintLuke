<?php

namespace App\Services;

use App\Enums\BookCondition;
use App\Enums\LoanBookStatus;
use App\Enums\ReturnBookStatus;
use App\Models\LoanDetail;
use App\Models\ReturnBook;
use App\Models\ReturnBookCheck;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class DigitalAutoReturnService
{
    /**
     * Tutup akses buku digital dengan mencatat pengembalian.
     *
     * Akses baca buku digital di gerbang lewat keberadaan return_book pada
     * loan_detail (lihat EnsureUserHasActiveLoan). Begitu return_book dibuat,
     * pengguna otomatis tidak bisa mengakses aset buku lagi sampai meminjam
     * kembali. Stok TIDAK disentuh karena peminjaman digital memang tidak
     * mengurangi stok saat dibuat (lihat LoanService::readDigitalBook).
     *
     * @param  string  $note  Catatan pengecekan; default untuk auto-return
     *                        karena masa pinjam habis.
     */
    public function autoReturn(
        LoanDetail $loanDetail,
        string $note = 'Auto-return: masa peminjaman digital habis'
    ): void {
        // Idempotent: jika sudah pernah dikembalikan, jangan buat ganda.
        if ($loanDetail->returnBook()->exists()) {
            return;
        }

        $today = Carbon::now();

        DB::transaction(function () use ($loanDetail, $today, $note) {
            $returnBook = ReturnBook::create([
                'return_book_code' => generateUniqueCode('return_book', ReturnBook::class, 'return_book_code'),
                'loan_user_id'     => $loanDetail->id,
                'return_date'      => $today,
                'status'           => ReturnBookStatus::RETURNED,
            ]);

            ReturnBookCheck::create([
                'return_book_id' => $returnBook->id,
                'condition'      => BookCondition::GOOD->value,
                'notes'          => $note,
            ]);

            $loanDetail->update(['status' => LoanBookStatus::RETURNED]);
        });
    }
}
