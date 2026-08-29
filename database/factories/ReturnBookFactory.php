<?php

namespace Database\Factories;

use App\Enums\ReturnBookStatus;
use App\Models\LoanDetail;
use App\Models\ReturnBook;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ReturnBook>
 */
class ReturnBookFactory extends Factory
{
    protected $model = ReturnBook::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'return_book_code' => 'RB-' . strtoupper(Str::random(8)),
            'loan_user_id'     => LoanDetail::inRandomOrder()->value('id') ?? LoanDetail::factory(),
            'return_date'      => fake()->dateTimeBetween('-6 months', 'now')->format('Y-m-d'),
            'status'           => ReturnBookStatus::CHECKED->value,
        ];
    }

    /** State: sudah dikembalikan tanpa denda */
    public function returned(): static
    {
        return $this->state(fn(array $attributes) => [
            'status' => ReturnBookStatus::RETURNED->value,
        ]);
    }

    /** State: dikenai denda */
    public function withFine(): static
    {
        return $this->state(fn(array $attributes) => [
            'status' => ReturnBookStatus::COST->value,
        ]);
    }
}
