<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Spatie\Permission\Models\Role;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\Spatie\Permission\Models\Role>
 */
class RoleFactory extends Factory
{
    protected $model = Role::class;

    private static array $roles = ['admin', 'manager', 'writer', 'user', 'member'];
    private static int $index = 0;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = self::$roles[self::$index % count(self::$roles)];
        self::$index++;

        return [
            'name'       => $name,
            'guard_name' => 'web',
        ];
    }

    public function admin(): static
    {
        return $this->state(fn(array $attributes) => [
            'name'       => 'admin',
            'guard_name' => 'web',
        ]);
    }

    public function manager(): static
    {
        return $this->state(fn(array $attributes) => [
            'name'       => 'manager',
            'guard_name' => 'web',
        ]);
    }

    public function writer(): static
    {
        return $this->state(fn(array $attributes) => [
            'name'       => 'writer',
            'guard_name' => 'web',
        ]);
    }

    public function member(): static
    {
        return $this->state(fn(array $attributes) => [
            'name'       => 'member',
            'guard_name' => 'web',
        ]);
    }

    public function user(): static
    {
        return $this->state(fn(array $attributes) => [
            'name'       => 'user',
            'guard_name' => 'web',
        ]);
    }
}
