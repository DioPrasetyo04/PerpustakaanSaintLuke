<?php

namespace Database\Factories;

use App\Enums\Days;
use App\Models\Announcement;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Announcement>
 */
class AnnouncementFactory extends Factory
{
    protected $model = Announcement::class;

    /** Data pengumuman harian perpustakaan */
    private static array $schedule = [
        Days::MONDAY    => ['open' => '08:00:00', 'close' => '16:00:00', 'active' => true],
        Days::TUESDAY   => ['open' => '08:00:00', 'close' => '16:00:00', 'active' => true],
        Days::WEDNESDAY => ['open' => '08:00:00', 'close' => '16:00:00', 'active' => true],
        Days::THURSDAY  => ['open' => '08:00:00', 'close' => '16:00:00', 'active' => true],
        Days::FRIDAY    => ['open' => '08:00:00', 'close' => '12:00:00', 'active' => true],
        Days::SATURDAY  => ['open' => '08:00:00', 'close' => '13:00:00', 'active' => true],
        Days::SUNDAY    => ['open' => '00:00:00', 'close' => '00:00:00', 'active' => false],
    ];

    private static array $usedDays = [];

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // Ambil hari yang belum digunakan (unik per Days enum)
        $available = array_diff(array_keys(self::$schedule), self::$usedDays);

        if (empty($available)) {
            // Fallback jika semua hari sudah terpakai
            $day      = fake()->randomElement(Days::cases());
            $schedule = self::$schedule[$day] ?? ['open' => '08:00:00', 'close' => '16:00:00', 'active' => true];
        } else {
            $day      = reset($available);
            $schedule = self::$schedule[$day];
            self::$usedDays[] = $day;
        }

        $dayValue = $day instanceof Days ? $day->value : $day->value;

        return [
            'days'        => $dayValue,
            'title'       => 'Jadwal Perpustakaan Saint Luke — ' . ($day instanceof Days ? $day->value : $day->value),
            'description' => fake()->paragraph(3),
            'photo'       => null,
            'open_time'   => $schedule['open'],
            'close_time'  => $schedule['close'],
            'is_active'   => $schedule['active'],
        ];
    }
}
