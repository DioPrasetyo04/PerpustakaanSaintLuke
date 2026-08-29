<?php

namespace Database\Factories;

use App\Enums\UserType;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name     = fake()->name();
        $username = Str::slug($name, '.') . fake()->unique()->numerify('##');

        return [
            'name'                     => $name,
            'username'                 => $username,
            'email'                    => fake()->unique()->safeEmail(),
            'email_verified_at'        => now(),
            'password'                 => static::$password ??= Hash::make('password'),
            'remember_token'           => Str::random(10),
            'phone'                    => fake()->numerify('08##########'),
            'avatar'                   => null,
            'avatar_url'               => null,
            'date_of_birth'            => null,
            'address'                  => null,
            'type'                     => null,
            'type_other'               => null,
            'is_approved'              => false,
            'approved_at'              => null,
            'approved_by'              => null,
            'two_factor_secret'        => null,
            'two_factor_recovery_codes' => null,
            'two_factor_confirmed_at'  => null,
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn(array $attributes) => [
            'email_verified_at' => null,
        ]);
    }

    /**
     * State: anggota perpustakaan yang sudah disetujui (member).
     * Email berformat <username>@example.com agar VisitSeeder & LoanFlowSeeder
     * dapat menemukannya dengan query `like '%@example.com'`.
     */
    public function asMember(): static
    {
        return $this->state(function (array $attributes) {
            $username = $attributes['username'] ?? Str::slug(fake()->name(), '.');

            return [
                'email'             => $username . '@example.com',
                'password'          => static::$password ??= Hash::make('Member@12345'),
                'phone'             => fake()->numerify('08##########'),
                'address'           => 'Jl. Pendidikan No. ' . fake()->numberBetween(1, 99) . ', Jakarta',
                'type'              => fake()->randomElement([
                    UserType::SMA->value,
                    UserType::SMP->value,
                    UserType::SMK->value,
                    UserType::SD->value,
                ]),
                'is_approved'       => true,
                'approved_at'       => now(),
                'email_verified_at' => now(),
            ];
        });
    }

    /**
     * Indicate that the model has two-factor authentication configured.
     */
    public function withTwoFactor(): static
    {
        return $this->state(fn(array $attributes) => [
            'two_factor_secret'        => encrypt('secret'),
            'two_factor_recovery_codes' => encrypt(json_encode(['recovery-code-1'])),
            'two_factor_confirmed_at'  => now(),
        ]);
    }

    /**
     * State: user sudah disetujui dan terverifikasi (untuk staff/admin).
     */
    public function approved(): static
    {
        return $this->state(fn(array $attributes) => [
            'is_approved'       => true,
            'approved_at'       => now(),
            'email_verified_at' => now(),
        ]);
    }

    /**
     * State: staff writer
     */
    public function staffWriter(): static
    {
        return $this->state(fn(array $attributes) => [
            'name'              => 'Staff Penulis',
            'username'          => 'writer',
            'email'             => 'writer@perpustakaan-saint-luke.id',
            'password'          => Hash::make('Writer@12345'),
            'is_approved'       => true,
            'approved_at'       => now(),
            'email_verified_at' => now(),
        ]);
    }

    /**
     * State: staff manager
     */
    public function staffManager(): static
    {
        return $this->state(fn(array $attributes) => [
            'name'              => 'Staff Manager',
            'username'          => 'manager',
            'email'             => 'manager@perpustakaan-saint-luke.id',
            'password'          => Hash::make('Manager@12345'),
            'is_approved'       => true,
            'approved_at'       => now(),
            'email_verified_at' => now(),
        ]);
    }

    /**
     * State: super admin
     */
    public function admin(): static
    {
        return $this->state(fn(array $attributes) => [
            'name'              => 'Super Admin',
            'username'          => 'superadmin',
            'email'             => 'admin@perpustakaan-saint-luke.id',
            'password'          => Hash::make('Admin@12345'),
            'is_approved'       => true,
            'approved_at'       => now(),
            'email_verified_at' => now(),
        ]);
    }
}
