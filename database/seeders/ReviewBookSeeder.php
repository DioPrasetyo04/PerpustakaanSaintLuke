<?php

namespace Database\Seeders;

use App\Enums\ReturnBookStatus;
use App\Models\LoanDetail;
use App\Models\ReturnBook;
use App\Models\ReviewBook;
use Illuminate\Database\Seeder;

class ReviewBookSeeder extends Seeder
{
    /**
     * Seed ulasan buku menggunakan ReviewBookFactory.
     * Hanya pengembalian dengan status RETURNED yang bisa memberi ulasan.
     *
     * Dependensi: ReturnBookSeeder (atau LoanFlowSeeder + ReturnBookSeeder).
     */
    public function run(): void
    {
        // Ambil pengembalian yang statusnya RETURNED (sudah dikembalikan tanpa masalah)
        $returnedBooks = ReturnBook::query()
            ->where('status', ReturnBookStatus::RETURNED->value)
            ->get();

        if ($returnedBooks->isEmpty()) {
            $this->command?->warn('ReviewBookSeeder dilewati: belum ada pengembalian buku (jalankan ReturnBookSeeder).');
            return;
        }

        $reviewed = 0;

        foreach ($returnedBooks as $returnBook) {
            // Hanya ~60% yang memberikan ulasan
            if (($returnBook->id % 5) >= 3) {
                continue;
            }

            // Cek apakah sudah ada review untuk return_book_id ini
            if (ReviewBook::where('return_book_id', $returnBook->id)->exists()) {
                continue;
            }

            ReviewBook::factory()->create([
                'loan_user_id'   => $returnBook->loan_user_id,
                'return_book_id' => $returnBook->id,
            ]);

            $reviewed++;
        }

        $this->command?->info("ReviewBookSeeder: {$reviewed} ulasan buku dibuat.");
    }
}
