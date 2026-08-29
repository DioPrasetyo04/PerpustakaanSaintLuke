<?php

namespace Database\Factories;

use App\Enums\BookCondition;
use App\Models\ReturnBook;
use App\Models\ReturnBookCheck;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ReturnBookCheck>
 */
class ReturnBookChecksFactory extends Factory
{
    protected $model = ReturnBookCheck::class;

    /**
     * Define the model's default state.
     *
     * Kondisi buku menggunakan enum BookCondition: GOOD, DAMAGED, LOST.
     * Mayoritas (80%) kondisi baik, sisanya rusak atau hilang.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $condition = fake()->randomElement([
            BookCondition::GOOD->value,    // 80% baik
            BookCondition::GOOD->value,
            BookCondition::GOOD->value,
            BookCondition::GOOD->value,
            BookCondition::DAMAGED->value, // 15% rusak
            BookCondition::DAMAGED->value,
            BookCondition::LOST->value,    // 5% hilang
        ]);

        $notes = match ($condition) {
            BookCondition::GOOD->value    => fake()->randomElement([
                'Kondisi buku baik, tidak ada kerusakan.',
                'Buku dikembalikan dalam keadaan bersih dan rapi.',
                'Tidak ada coretan atau lipatan pada halaman.',
            ]),
            BookCondition::DAMAGED->value => fake()->randomElement([
                'Terdapat lipatan pada beberapa halaman.',
                'Ada coretan pensil di beberapa halaman.',
                'Cover buku sedikit lecek.',
                'Beberapa halaman robek ringan.',
            ]),
            BookCondition::LOST->value    => 'Buku dinyatakan hilang oleh peminjam.',
            default                       => null,
        };

        return [
            'return_book_id' => ReturnBook::inRandomOrder()->value('id') ?? ReturnBook::factory(),
            'condition'      => $condition,
            'notes'          => $notes,
        ];
    }
}
