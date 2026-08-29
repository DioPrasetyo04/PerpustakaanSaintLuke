<?php

namespace Database\Factories;

use App\Enums\UserGender;
use App\Models\Author;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Author>
 */
class AuthorsFactory extends Factory
{
    protected $model = Author::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = fake()->name();

        return [
            'name'         => $name,
            'username'     => Str::slug($name) . '-' . fake()->unique()->numerify('###'),
            'phone'        => fake()->numerify('08##########'),
            'gender'       => fake()->randomElement([UserGender::MALE->value, UserGender::FEMALE->value]),
            'date_of_birth' => fake()->dateTimeBetween('-70 years', '-20 years')->format('Y-m-d'),
            'nationality'  => fake()->randomElement(['Indonesia', 'Inggris', 'Amerika', 'Jepang', 'Australia']),
            'avatar'       => null,
            'bio'          => fake()->sentence(12),
            'verified_at'  => fake()->optional(0.7)->dateTimeBetween('-2 years', 'now'),
        ];
    }
}
