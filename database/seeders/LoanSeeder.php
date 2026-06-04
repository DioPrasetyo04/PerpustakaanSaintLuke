<?php

namespace Database\Seeders;

use App\Enums\LoanBookStatus;
use App\Enums\LoanStatus;
use App\Models\Book;
use App\Models\Loan;
use App\Models\LoanDetail;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class LoanSeeder extends Seeder
{
    /**
     * Membuat data peminjaman test untuk menguji fitur:
     *  - SendLoanReminder (3 Loan dengan due_date H+3, H+1, H+0)
     *  - AutoReturnExpiredLoans (1 Loan dengan due_date H-2)
     *
     * Setiap skenario = 1 Loan terpisah dengan 1 LoanDetail unik agar:
     *  - Konsisten dengan aturan: dalam 1 Loan, buku tidak boleh sama.
     *  - Aturan "tidak boleh pinjam buku yang sama jika masih aktif" tetap terjaga
     *    karena setiap skenario pakai book berbeda.
     *
     * GANTI nilai berikut sebelum menjalankan seeder:
     *  - $targetPhone: nomor WhatsApp Anda format Fonte (62xxx, tanpa + atau spasi)
     *  - $targetEmail: ubah jika ingin target user lain
     *
     * Jalankan:
     *   php artisan db:seed --class=LoanSeeder
     *
     * Untuk re-test reminder (reset cache dedup harian):
     *   php artisan cache:clear
     */
    public function run(): void
    {
        $targetEmail = 'prasetyodio04@gmail.com';
        $targetPhone = '6281381876265';

        $user = User::query()->where('email', $targetEmail)->first();
        if (! $user) {
            $this->command?->error("User dengan email {$targetEmail} tidak ditemukan. Register dulu via Filament admin atau ubah \$targetEmail di LoanSeeder.");
            return;
        }

        if ($targetPhone === 'YOUR_PHONE_HERE') {
            $this->command?->error('Edit LoanSeeder.php → ganti $targetPhone dengan nomor WhatsApp Anda (format 62xxx) sebelum menjalankan seeder.');
            return;
        }

        if ($user->phone !== $targetPhone) {
            $user->forceFill(['phone' => $targetPhone])->save();
        }

        $books = Book::query()->inRandomOrder()->take(4)->get();
        if ($books->isEmpty()) {
            $this->command?->error('Tidak ada Book di database. Seed BookSeeder dulu.');
            return;
        }

        $today = Carbon::today();

        $scenarios = [
            ['loan_offset' => -1,  'due_offset' => 3,  'label' => 'reminder H+3'],
            ['loan_offset' => -6,  'due_offset' => 1,  'label' => 'reminder H+1'],
            ['loan_offset' => -7,  'due_offset' => 0,  'label' => 'reminder H+0'],
            ['loan_offset' => -10, 'due_offset' => -2, 'label' => 'auto-return H-2'],
        ];

        $bookCount = $books->count();
        if ($bookCount < count($scenarios)) {
            $this->command?->warn("Hanya {$bookCount} Book ditemukan, akan di-reuse antar-Loan (Aturan B tetap terjaga karena tiap Loan punya book unik).");
        }

        foreach ($scenarios as $i => $s) {
            $book = $books[$i % $bookCount];

            $loan = Loan::create([
                'user_id' => $user->id,
                'loan_code' => 'TEST-' . Str::upper(Str::random(8)),
                'status' => LoanStatus::LOANED,
            ]);

            LoanDetail::create([
                'loan_id' => $loan->id,
                'book_id' => $book->id,
                'loan_date' => $today->copy()->addDays($s['loan_offset']),
                'due_date' => $today->copy()->addDays($s['due_offset']),
                'status' => LoanBookStatus::BORROWED,
            ]);

            $this->command?->info("Created Loan #{$loan->id} ({$loan->loan_code}) — {$s['label']}, book='{$book->title}'");
        }
    }
}
