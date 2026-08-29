<?php

namespace Database\Factories;

use App\Enums\UserType;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Visit>
 */
class VisitFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * Kunjungan bisa oleh user terdaftar (user_id) atau tamu (user_id null).
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $user       = User::inRandomOrder()->first();
        $visitDate  = Carbon::today('Asia/Jakarta')
            ->subDays(fake()->numberBetween(0, 20))
            ->setTime(fake()->numberBetween(8, 15), fake()->randomElement([0, 30]));

        return [
            'user_id'    => $user?->id,
            'name'       => $user?->name ?? fake()->name(),
            'address'    => $user?->address ?? fake()->address(),
            'visit_date' => $visitDate,
            'type'       => $user?->type ?? UserType::SMA->value,
            'type_other' => null,
            'needs'      => fake()->optional(0.4)->randomElement([
                'Membaca buku referensi',
                'Meminjam buku pelajaran',
                'Mengerjakan tugas',
                'Mencari bahan penelitian',
                'Menghadiri klub baca',
            ]),
            'note'       => null,
        ];
    }

    /** State: kunjungan oleh tamu (tanpa akun) */
    public function asGuest(): static
    {
        return $this->state(fn(array $attributes) => [
            'user_id' => null,
            'name'    => fake()->name(),
            'address' => fake()->address(),
            'type'    => fake()->randomElement(UserType::values()),
        ]);
    }

    /** State: kunjungan oleh user terdaftar spesifik */
    public function forUser(User $user): static
    {
        return $this->state(fn(array $attributes) => [
            'user_id' => $user->id,
            'name'    => $user->name,
            'address' => $user->address,
            'type'    => $user->type,
        ]);
    }
}
