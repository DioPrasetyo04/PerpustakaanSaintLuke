<?php

namespace Database\Factories;

use App\Enums\BookStatus;
use App\Enums\PublishedBooks;
use App\Models\Book;
use App\Models\Language;
use App\Models\Publisher;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Book>
 */
class BookFactory extends Factory
{
    protected $model = Book::class;

    private static array $subjectWords = [
        'Dasar', 'Lanjutan', 'Modern', 'Klasik', 'Praktis', 'Lengkap',
        'Pengantar', 'Panduan', 'Teori', 'Analisis', 'Komprehensif', 'Terpadu',
    ];

    private static array $topicWords = [
        'Sastra Indonesia', 'Matematika', 'Fisika', 'Biologi', 'Kimia',
        'Sejarah Dunia', 'Ilmu Ekonomi', 'Pemrograman', 'Desain Grafis',
        'Psikologi Anak', 'Sosiologi', 'Filsafat', 'Geografi', 'Akuntansi',
        'Bahasa Inggris', 'Pendidikan Agama', 'Olahraga', 'Kesenian',
    ];

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $subject = fake()->randomElement(self::$subjectWords);
        $topic   = fake()->randomElement(self::$topicWords);
        $title   = $subject . ' ' . $topic;
        $slug    = Str::slug($title) . '-' . fake()->unique()->numerify('####');

        // Nomor klasifikasi Dewey Decimal sederhana
        $classNum = fake()->numerify('###') . '.' . fake()->numerify('#');

        // Lokasi rak perpustakaan
        $rack     = 'Rak ' . fake()->randomElement(['A', 'B', 'C', 'D', 'E', 'F']) . '-' . fake()->numberBetween(1, 30);

        return [
            'publisher_id'           => Publisher::inRandomOrder()->value('id') ?? Publisher::factory(),
            'language_id'            => Language::inRandomOrder()->value('id') ?? Language::factory(),
            'added_by'               => User::inRandomOrder()->value('id') ?? User::factory(),
            'book_code'              => 'BK-' . fake()->unique()->numerify('####'),
            'title'                  => $title,
            'slug'                   => $slug,
            'publication_year'       => fake()->year(),
            'isbn'                   => '978-' . fake()->numerify('##########'),
            'synopsis'               => fake()->paragraph(4),
            'number_of_pages'        => fake()->numberBetween(80, 900),
            'location_book'          => $rack,
            'classification_number'  => $classNum,
            'volume'                 => fake()->optional(0.3)->numberBetween(1, 5),
            'status'                 => BookStatus::AVAILABLE->value,
            'cover'                  => null,
            'price'                  => fake()->randomElement([35000, 45000, 55000, 65000, 75000, 85000, 95000, 120000, 150000]),
            'is_published'           => PublishedBooks::PUBLISH->value,
            'is_spotlight'           => false,
        ];
    }

    /** State: buku belum terbit */
    public function unpublished(): static
    {
        return $this->state(fn(array $attributes) => [
            'is_published' => PublishedBooks::UNPUBLISH->value,
        ]);
    }

    /** State: buku sorotan */
    public function spotlight(): static
    {
        return $this->state(fn(array $attributes) => [
            'is_spotlight' => true,
            'is_published' => PublishedBooks::PUBLISH->value,
        ]);
    }
}
