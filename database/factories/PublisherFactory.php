<?php

namespace Database\Factories;

use App\Models\Publisher;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Publisher>
 */
class PublisherFactory extends Factory
{
    protected $model = Publisher::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = fake()->randomElement([
            'Penerbit ' . fake()->company(),
            fake()->company() . ' Publishing',
            'PT ' . fake()->company() . ' Pustaka',
        ]);

        return [
            'name'      => $name,
            'slug'      => Str::slug($name) . '-' . fake()->unique()->numerify('##'),
            'address'   => fake()->address(),
            'email'     => fake()->companyEmail(),
            'phone'     => fake()->numerify('02#-########'),
            'logo'      => null,
            'is_active' => true,
        ];
    }
}
