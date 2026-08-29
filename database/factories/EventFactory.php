<?php

namespace Database\Factories;

use App\Models\Event;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Event>
 */
class EventFactory extends Factory
{
    protected $model = Event::class;

    private static array $events = [
        ['title' => 'Selasa Sastra: Membedah Bumi Manusia',       'category' => 'Klub Baca',  'location' => 'Ruang Baca Utama'],
        ['title' => 'Diskusi Filsafat: Pengantar Stoikisme',       'category' => 'Diskusi',    'location' => 'Ruang Diskusi 2'],
        ['title' => 'Workshop Literasi Digital',                   'category' => 'Workshop',   'location' => 'Lab Komputer'],
        ['title' => 'Bedah Buku bersama Penulis Tamu',             'category' => 'Acara',      'location' => 'Aula Yayasan'],
        ['title' => 'Pelatihan Menulis Kreatif',                   'category' => 'Workshop',   'location' => 'Ruang Baca Utama'],
        ['title' => 'Pameran Koleksi Langka Perpustakaan',         'category' => 'Pameran',    'location' => 'Galeri Lantai 2'],
        ['title' => 'Seminar Manfaat Membaca di Era Digital',      'category' => 'Seminar',    'location' => 'Aula Utama'],
        ['title' => 'Kompetisi Cipta Puisi Tingkat SMA',           'category' => 'Lomba',      'location' => 'Ruang Baca Utama'],
        ['title' => 'Webinar Strategi Belajar Efektif',            'category' => 'Webinar',    'location' => 'Online (Zoom)'],
        ['title' => 'Bazar Buku Bekas Perpustakaan',               'category' => 'Bazar',      'location' => 'Halaman Sekolah'],
    ];

    private static int $index = 0;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $data     = self::$events[self::$index % count(self::$events)];
        self::$index++;

        $title    = $data['title'];
        $suffix   = self::$index > count(self::$events) ? ' ' . self::$index : '';
        $title   .= $suffix;

        $startAt  = Carbon::now()->startOfDay()->addDays(fake()->numberBetween(1, 60))->setTime(
            fake()->randomElement([8, 9, 10, 13, 14, 15]),
            fake()->randomElement([0, 30])
        );
        $duration = fake()->randomElement([60, 90, 120, 150, 180]);
        $endAt    = $startAt->copy()->addMinutes($duration);

        $capacity = fake()->optional(0.8)->randomElement([24, 25, 30, 40, 50, 80]);
        $taken    = $capacity ? fake()->numberBetween(0, $capacity) : 0;

        return [
            'title'            => $title,
            'slug'             => Str::slug($title),
            'description'      => fake()->paragraph(3),
            'category'         => $data['category'],
            'location'         => $data['location'],
            'start_at'         => $startAt,
            'end_at'           => $endAt,
            'capacity'         => $capacity,
            'seats_taken'      => $taken,
            'registration_url' => null,
            'thumbnail'        => null,
            'is_active'        => true,
            'sort_order'       => self::$index - 1,
        ];
    }

    /** State: event sudah berlalu */
    public function past(): static
    {
        return $this->state(function (array $attributes) {
            $start = Carbon::now()->subDays(fake()->numberBetween(5, 30))->setTime(9, 0);
            return [
                'start_at' => $start,
                'end_at'   => $start->copy()->addHours(2),
            ];
        });
    }
}
