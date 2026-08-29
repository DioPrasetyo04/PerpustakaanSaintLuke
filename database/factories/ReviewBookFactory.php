<?php

namespace Database\Factories;

use App\Models\LoanDetail;
use App\Models\ReturnBook;
use App\Models\ReviewBook;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ReviewBook>
 */
class ReviewBookFactory extends Factory
{
    protected $model = ReviewBook::class;

    private static array $comments = [
        'Buku yang sangat bagus dan informatif! Sangat direkomendasikan.',
        'Isi buku mudah dipahami, cocok untuk pemula maupun yang sudah berpengalaman.',
        'Penjelasan yang detail dan contoh yang relevan membuat buku ini sangat bermanfaat.',
        'Buku ini membuka wawasan saya tentang topik yang selama ini belum saya pahami.',
        'Bahasanya ringan dan mudah dimengerti. Senang membacanya.',
        'Isi buku cukup padat dan berisi. Sangat worth it untuk dibaca.',
        'Penulis berhasil menyampaikan ide dengan cara yang menarik dan tidak membosankan.',
        'Referensi yang lengkap dan penyajian yang sistematis membuat buku ini sangat membantu.',
        'Sangat cocok untuk bahan pembelajaran. Akan saya pinjam lagi.',
        'Buku biasa saja, tidak terlalu istimewa tapi cukup informatif.',
    ];

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // Rating dalam skala 1.0 – 5.0 dengan step 0.5
        $rating = fake()->randomElement([1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0]);

        return [
            'loan_user_id'   => LoanDetail::inRandomOrder()->value('id') ?? LoanDetail::factory(),
            'return_book_id' => ReturnBook::inRandomOrder()->value('id') ?? ReturnBook::factory(),
            'rating'         => $rating,
            'comment'        => fake()->optional(0.8)->randomElement(self::$comments),
        ];
    }
}
