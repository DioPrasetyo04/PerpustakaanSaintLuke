<?php

namespace Database\Seeders;

use App\Enums\LoanBookStatus;
use App\Enums\LoanStatus;
use App\Enums\LoanType;
use App\Models\Book;
use App\Models\Loan;
use App\Models\LoanDetail;
use App\Models\Type;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class LoanFlowSeeder extends Seeder
{
    /**
     * Seed peminjaman anggota (Loan + LoanDetail). Pengembalian, denda, dan
     * ulasan diisi seeder lanjutan (ReturnBookSeeder, FineSeeder, ReviewBookSeeder).
     *
     * Dependensi: MemberUserSeeder & BookSeeder.
     */
    public function run(): void
    {
        $members = User::query()->where('email', 'like', '%@example.com')->get();
        $books = Book::query()->with('types')->get();

        if ($members->isEmpty() || $books->isEmpty()) {
            $this->command?->warn('LoanFlowSeeder dilewati: butuh anggota (MemberUserSeeder) dan buku (BookSeeder).');
            return;
        }

        $digitalTypeId = Type::where('type', 'digital')->value('id');
        $today = Carbon::today();

        foreach ($members as $member) {
            $loanCount = random_int(1, 2);

            for ($n = 1; $n <= $loanCount; $n++) {
                $loanCode = 'LN-' . str_pad((string) $member->id, 3, '0', STR_PAD_LEFT) . '-' . $n;

                $loan = Loan::firstOrCreate(
                    ['loan_code' => $loanCode],
                    ['user_id' => $member->id, 'status' => LoanStatus::LOANED->value],
                );

                // Buku unik per loan.
                $picks = $books->shuffle()->take(random_int(1, 2));
                // Peminjaman dimulai antara 1-20 hari lalu.
                $loanDate = $today->copy()->subDays(random_int(1, 20));
                $dueDate = $loanDate->copy()->addDays(14);

                foreach ($picks as $book) {
                    $isDigital = $digitalTypeId && $book->types->contains('id', $digitalTypeId);

                    LoanDetail::firstOrCreate(
                        ['loan_id' => $loan->id, 'book_id' => $book->id],
                        [
                            'loan_date' => $loanDate,
                            'due_date' => $dueDate,
                            'status' => LoanBookStatus::BORROWED->value,
                            'loan_type' => $isDigital ? LoanType::DIGITAL->value : LoanType::PHYSICAL->value,
                        ],
                    );
                }
            }
        }

        $this->command?->info('LoanFlowSeeder: ' . Loan::count() . ' peminjaman, ' . LoanDetail::count() . ' detail buku.');
    }
}
