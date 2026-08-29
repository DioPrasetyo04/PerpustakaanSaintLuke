<?php

namespace Database\Factories;

use App\Models\Book;
use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\BookOfCategory>
 *
 * Pivot table book_of_categories: category_id, book_id
 * Factory ini digunakan untuk mengisi relasi many-to-many buku ↔ kategori.
 */
class BookOfCategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'category_id' => Category::inRandomOrder()->value('id') ?? Category::factory(),
            'book_id'     => Book::inRandomOrder()->value('id') ?? Book::factory(),
        ];
    }
}
