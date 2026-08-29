<?php

namespace Database\Factories;

use App\Enums\LoanBookStatus;
use App\Enums\LoanType;
use App\Models\Book;
use App\Models\Loan;
use App\Models\LoanDetail;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\LoanDetail>
 */
class LoanDetailFactory extends Factory
{
    protected $model = LoanDetail::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $loanDate = Carbon::today()->subDays(fake()->numberBetween(1, 30));
        $dueDate  = $loanDate->copy()->addDays(14);

        return [
            'loan_id'   => Loan::inRandomOrder()->value('id') ?? Loan::factory(),
            'book_id'   => Book::inRandomOrder()->value('id') ?? Book::factory(),
            'loan_date' => $loanDate->toDateString(),
            'due_date'  => $dueDate->toDateString(),
            'status'    => LoanBookStatus::BORROWED->value,
            'loan_type' => LoanType::PHYSICAL->value,
        ];
    }

    /** State: peminjaman digital */
    public function digital(): static
    {
        return $this->state(fn(array $attributes) => [
            'loan_type' => LoanType::DIGITAL->value,
        ]);
    }

    /** State: sudah dikembalikan */
    public function returned(): static
    {
        return $this->state(fn(array $attributes) => [
            'status' => LoanBookStatus::RETURNED->value,
        ]);
    }
}
