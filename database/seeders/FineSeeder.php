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
     * Seed denda keterlambatan menggunakan FineFactory.
     * Hanya pengembalian dengan status COST (terlambat) yang dikenai denda.
     *
     * Dependensi: ReturnBookSeeder & FineSettingsSeeder.
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
            // Hindari duplikat
            if (Fine::where('return_book_id', $return->id)->exists()) {
                continue;
            }

            $detail   = $return->loanDetail;
            $daysLate = $detail
                ? max(1, (int) Carbon::parse($detail->due_date)->diffInDays(Carbon::parse($return->return_date)))
                : 1;

            $lateFee  = $daysLate * $perDay;
            $isPaid   = ($return->id % 2) === 0;

            // Buat via FineFactory dengan override nilai yang dihitung
            Fine::factory()->create([
                'return_book_id' => $return->id,
                'order_id'       => 'ORD-' . strtoupper(Str::random(10)),
                'late_fee'       => $lateFee,
                'other_fee'      => 0,
                'total_fee'      => $lateFee,
                'fine_date'      => $return->return_date,
                'payment_method' => $isPaid ? 'cash' : null,
                'payment_status' => $isPaid ? PaymentStatus::SUCCESS->value : PaymentStatus::PENDING->value,
            ]);
        }

        $this->command?->info('FineSeeder: ' . Fine::count() . ' denda dibuat.');
    }
}
