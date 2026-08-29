<?php

namespace Database\Factories;

use App\Models\Book;
use App\Models\Stock;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Stock>
 */
class StockFactory extends Factory
{
    protected $model = Stock::class;

    /**
     * Define the model's default state.
     *
     * Konsistensi wajib: total = available + loan + lost + damaged
     * (validasi dilakukan di model Stock::booted)
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $total    = fake()->numberBetween(3, 15);
        $loan     = fake()->numberBetween(0, min(3, $total));
        $lost     = fake()->numberBetween(0, min(1, $total - $loan));
        $damaged  = fake()->numberBetween(0, min(1, $total - $loan - $lost));
        $available = $total - $loan - $lost - $damaged;

        return [
            'book_id'   => Book::inRandomOrder()->value('id') ?? Book::factory(),
            'total'     => $total,
            'available' => $available,
            'loan'      => $loan,
            'lost'      => $lost,
            'damaged'   => $damaged,
        ];
    }
}
