<?php

namespace Database\Seeders;

use App\Enums\BookCondition;
use App\Models\ReturnBook;
use App\Models\ReturnBookCheck;
use Illuminate\Database\Seeder;

class ReturnBookChecksSeeder extends Seeder
{
    /**
     * Seed hasil pengecekan kondisi buku saat dikembalikan.
     * Dependensi: ReturnBookSeeder.
     */
    public function run(): void
    {
        $returns = ReturnBook::query()->get();
        if ($returns->isEmpty()) {
            $this->command?->warn('ReturnBookChecksSeeder dilewati: belum ada pengembalian (jalankan ReturnBookSeeder).');
            return;
        }

        foreach ($returns as $return) {
            // Mayoritas kondisi baik; sebagian kecil rusak.
            $isDamaged = ($return->id % 7) === 0;
            $condition = $isDamaged ? BookCondition::DAMAGED->value : BookCondition::GOOD->value;

            ReturnBookCheck::firstOrCreate(
                ['return_book_id' => $return->id],
                [
                    'condition' => $condition,
                    'notes' => $isDamaged ? 'Terdapat lipatan/coretan pada beberapa halaman.' : 'Kondisi buku baik, tidak ada kerusakan.',
                ],
            );
        }
    }
}
