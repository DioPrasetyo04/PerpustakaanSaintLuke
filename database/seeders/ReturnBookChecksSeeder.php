<?php

namespace Database\Seeders;

use App\Models\ReturnBook;
use App\Models\ReturnBookCheck;
use Illuminate\Database\Seeder;

class ReturnBookChecksSeeder extends Seeder
{
    /**
     * Seed hasil pengecekan kondisi buku saat dikembalikan menggunakan ReturnBookChecksFactory.
     *
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
            if (ReturnBookCheck::where('return_book_id', $return->id)->exists()) {
                continue;
            }

            ReturnBookCheck::factory()->create([
                'return_book_id' => $return->id,
            ]);
        }

        $this->command?->info('ReturnBookChecksSeeder: ' . ReturnBookCheck::count() . ' pengecekan dibuat.');
    }
}
