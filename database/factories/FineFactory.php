<?php

namespace Database\Factories;

use App\Enums\PaymentStatus;
use App\Models\Fine;
use App\Models\ReturnBook;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Fine>
 */
class FineFactory extends Factory
{
    protected $model = Fine::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $lateFee  = fake()->randomElement([1000, 2000, 3000, 5000, 7000, 10000]);
        $otherFee = 0;
        $total    = $lateFee + $otherFee;

        return [
            'return_book_id'  => ReturnBook::inRandomOrder()->value('id') ?? ReturnBook::factory(),
            'order_id'        => 'ORD-' . strtoupper(Str::random(10)),
            'late_fee'        => $lateFee,
            'other_fee'       => $otherFee,
            'total_fee'       => $total,
            'fine_date'       => fake()->dateTimeBetween('-3 months', 'now')->format('Y-m-d'),
            'payment_method'  => fake()->randomElement([null, 'cash', 'transfer']),
            'payment_status'  => fake()->randomElement([PaymentStatus::PENDING->value, PaymentStatus::SUCCESS->value]),
        ];
    }

    /** State: denda sudah lunas */
    public function paid(): static
    {
        return $this->state(fn(array $attributes) => [
            'payment_method' => fake()->randomElement(['cash', 'transfer']),
            'payment_status' => PaymentStatus::SUCCESS->value,
        ]);
    }

    /** State: denda belum dibayar */
    public function pending(): static
    {
        return $this->state(fn(array $attributes) => [
            'payment_method' => null,
            'payment_status' => PaymentStatus::PENDING->value,
        ]);
    }
}
