<?php

namespace Database\Seeders;

use App\Enums\PaymentStatus;
use App\Enums\ReturnBookStatus;
use App\Models\Fine;
use App\Models\FineSettings;
use App\Models\ReturnBook;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class FineSeeder extends Seeder
{
    /**
     * Seed denda keterlambatan untuk pengembalian yang melewati jatuh tempo
     * (status COST). Dependensi: ReturnBookSeeder & FineSettingsSeeder.
     */
    public function run(): void
    {
        $lateReturns = ReturnBook::query()
            ->where('status', ReturnBookStatus::COST->value)
            ->with('loanDetail')
            ->get();

        if ($lateReturns->isEmpty()) {
            $this->command?->warn('FineSeeder dilewati: belum ada pengembalian terlambat (jalankan ReturnBookSeeder).');
            return;
        }

        $perDay = (int) (FineSettings::query()->value('late_fee_per_day') ?? 1000);

        foreach ($lateReturns as $return) {
            $detail = $return->loanDetail;
            if (! $detail) {
                continue;
            }

            $daysLate = Carbon::parse($detail->due_date)->diffInDays(Carbon::parse($return->return_date));
            $daysLate = max(1, $daysLate);
            $lateFee = $daysLate * $perDay;

            // Sebagian denda sudah lunas, sebagian masih menunggu pembayaran.
            $isPaid = ($return->id % 2) === 0;

            Fine::firstOrCreate(
                ['return_book_id' => $return->id],
                [
                    'order_id' => 'ORD-' . Str::upper(Str::random(10)),
                    'late_fee' => $lateFee,
                    'other_fee' => 0,
                    'total_fee' => $lateFee,
                    'fine_date' => $return->return_date,
                    'payment_method' => $isPaid ? 'cash' : null,
                    'payment_status' => $isPaid ? PaymentStatus::SUCCESS->value : PaymentStatus::PENDING->value,
                ],
            );
        }

        $this->command?->info('FineSeeder: ' . $lateReturns->count() . ' denda dibuat.');
    }
}
