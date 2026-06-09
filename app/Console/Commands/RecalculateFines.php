<?php

namespace App\Console\Commands;

use App\Enums\PaymentStatus;
use App\Models\Fine;
use App\Services\FineCalculatorService;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class RecalculateFines extends Command
{
    protected $signature = 'fines:recalculate';

    protected $description = 'Hitung ulang denda yang belum lunas agar konsisten dengan harga buku & pengaturan denda terkini';

    public function handle(): int
    {
        $fines = Fine::query()
            ->where('payment_status', '!=', PaymentStatus::SUCCESS->value)
            ->with([
                'returnBook.loanDetail.book',
                'returnBook.returnBookCheck',
            ])
            ->get();

        if ($fines->isEmpty()) {
            $this->info('Tidak ada denda belum lunas yang perlu dihitung ulang.');
            return self::SUCCESS;
        }

        $updated = 0;
        $deleted = 0;

        DB::transaction(function () use ($fines, &$updated, &$deleted) {
            foreach ($fines as $fine) {
                $returnBook = $fine->returnBook;
                if (! $returnBook || ! $returnBook->loanDetail?->book) {
                    continue;
                }

                $calc = FineCalculatorService::calculate($returnBook);

                if ($calc['should_have_fine']) {
                    $fine->update([
                        'late_fee' => $calc['late_fee'],
                        'other_fee' => $calc['other_fee'],
                        'total_fee' => $calc['total_fee'],
                    ]);
                    $updated++;
                } else {
                    $fine->delete();
                    $deleted++;
                }
            }
        });

        $this->info("Selesai. {$updated} denda diperbarui, {$deleted} denda dihapus.");

        return self::SUCCESS;
    }
}
