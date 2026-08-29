<?php

namespace Database\Factories;

use App\Models\Book;
use App\Models\LocationOfBook;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\LocationOfBook>
 */
class LocationOfBooksFactory extends Factory
{
    protected $model = LocationOfBook::class;

    private static array $racks = ['A', 'B', 'C', 'D', 'E', 'F'];

    /**
     * Define the model's default state.
     *
     * book_id nullable — bisa jadi data master lokasi rak tanpa buku.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $rack  = fake()->randomElement(self::$racks);
        $shelf = fake()->numberBetween(1, 30);

        return [
            'book_id'  => Book::inRandomOrder()->value('id'),
            'location' => "Rak {$rack}-{$shelf}",
        ];
    }

    /** State: lokasi tanpa buku (data master rak) */
    public function withoutBook(): static
    {
        return $this->state(fn(array $attributes) => [
            'book_id' => null,
        ]);
    }
}
