<?php

namespace Database\Factories;

use App\Enums\AssetTypes;
use App\Models\Asset;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Asset>
 */
class AssetFactory extends Factory
{
    protected $model = Asset::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'type'         => AssetTypes::FILE->value,
            'utility_path' => 'assets/' . fake()->slug(3) . '.pdf',
        ];
    }

    /** State: asset berupa resource (gambar/video) */
    public function asResource(): static
    {
        return $this->state(fn(array $attributes) => [
            'type'         => AssetTypes::RESOURCES->value,
            'utility_path' => 'assets/resources/' . fake()->slug(3) . '.jpg',
        ]);
    }
}
