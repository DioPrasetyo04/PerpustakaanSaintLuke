<?php

namespace Database\Seeders;

use App\Enums\LoanBookStatus;
use App\Enums\ReturnBookStatus;
use App\Models\LoanDetail;
use App\Models\ReturnBook;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class ReturnBookSeeder extends Seeder
{
    /**
     * Seed pengembalian buku untuk sebagian peminjaman (≈60%).
     * Sisanya dibiarkan masih dipinjam. Dependensi: LoanFlowSeeder.
     *
     * Pemilihan deterministik (berdasarkan id) agar idempotent saat di-run ulang.
     */
    public function run(): void
    {
        $details = LoanDetail::query()->with('loan')->get();
        if ($details->isEmpty()) {
            $this->command?->warn('ReturnBookSeeder dilewati: belum ada peminjaman (jalankan LoanFlowSeeder).');
            return;
        }

        $today = Carbon::today();
        $returned = 0;

        foreach ($details as $detail) {
            // ~60% dikembalikan (id % 5 < 3), stabil antar-run.
            if (($detail->id % 5) >= 3) {
                continue;
            }

            $loanDate = Carbon::parse($detail->loan_date);
            $dueDate = Carbon::parse($detail->due_date);

            // id % 5 == 0 → terlambat (kena denda), selain itu tepat waktu.
            $isLate = ($detail->id % 5) === 0;

            if ($isLate) {
                $returnDate = $dueDate->copy()->addDays(random_int(1, 5));
                if ($returnDate->greaterThan($today)) {
                    $returnDate = $today->copy();
                }
                $status = ReturnBookStatus::COST->value;
            } else {
                $returnDate = $dueDate->copy()->subDays(random_int(0, 3));
                if ($returnDate->lessThan($loanDate)) {
                    $returnDate = $loanDate->copy();
                }
                $status = ReturnBookStatus::RETURNED->value;
            }

            ReturnBook::firstOrCreate(
                ['loan_user_id' => $detail->id],
                [
                    'return_book_code' => 'RB-' . str_pad((string) $detail->id, 5, '0', STR_PAD_LEFT),
                    'return_date' => $returnDate,
                    'status' => $status,
                ],
            );

            $detail->update(['status' => LoanBookStatus::RETURNED->value]);
            $returned++;
        }

        // Sinkronkan status tiap Loan (loaned / partial returned / returned).
        $details->pluck('loan')->filter()->unique('id')->each->recomputeStatus();

        $this->command?->info("ReturnBookSeeder: {$returned} buku dikembalikan.");
    }
}
