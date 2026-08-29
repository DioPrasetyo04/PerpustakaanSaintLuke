<?php

namespace Database\Factories;

use App\Models\Type;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Type>
 */
class TypeFactory extends Factory
{
    protected $model = Type::class;

    private static array $types = [
        'fisik',
        'digital',
    ];

    private static int $index = 0;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $type = self::$types[self::$index % count(self::$types)];
        self::$index++;

        return [
            'type' => $type,
            'icon' => null,
        ];
    }

    /**
     * State for physical type.
     */
    public function physical(): static
    {
        return $this->state(fn(array $attributes) => [
            'type' => 'fisik',
        ]);
    }

    /**
     * State for digital type.
     */
    public function digital(): static
    {
        return $this->state(fn(array $attributes) => [
            'type' => 'digital',
        ]);
    }
}
