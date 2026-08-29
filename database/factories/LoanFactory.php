<?php

namespace Database\Factories;

use App\Enums\LoanStatus;
use App\Models\Loan;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Loan>
 */
class LoanFactory extends Factory
{
    protected $model = Loan::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id'   => User::inRandomOrder()->value('id') ?? User::factory(),
            'loan_code' => 'LN-' . strtoupper(Str::random(8)),
            'status'    => LoanStatus::LOANED->value,
        ];
    }

    /** State: peminjaman sudah dikembalikan */
    public function returned(): static
    {
        return $this->state(fn(array $attributes) => [
            'status' => LoanStatus::RETURNED->value,
        ]);
    }

    /** State: peminjaman sebagian dikembalikan */
    public function partialReturned(): static
    {
        return $this->state(fn(array $attributes) => [
            'status' => LoanStatus::PARTIAL_RETURNED->value,
        ]);
    }
}
