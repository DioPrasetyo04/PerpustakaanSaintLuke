<?php

namespace Database\Factories;

use App\Models\Book;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Bookmark>
 *
 * Pivot table bookmarks: user_id, book_id (unique constraint)
 * Tidak ada Model Bookmark tersendiri, tapi factory ini digunakan untuk
 * mengisi pivot lewat seeder.
 */
class BookmarkFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::inRandomOrder()->value('id') ?? User::factory(),
            'book_id' => Book::inRandomOrder()->value('id') ?? Book::factory(),
        ];
    }
}
