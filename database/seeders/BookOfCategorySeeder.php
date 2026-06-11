<?php

namespace Database\Seeders;

use App\Models\Book;
use App\Models\Category;
use Illuminate\Database\Seeder;

class BookOfCategorySeeder extends Seeder
{
    /**
     * Hubungkan buku dengan kategori (pivot book_of_categories).
     * Dependensi: BookSeeder & CategorySeeder.
     */
    public function run(): void
    {
        $map = [
            'BK-0001' => ['Fiksi'],
            'BK-0002' => ['Fiksi'],
            'BK-0003' => ['Fiksi', 'Anak'],
            'BK-0004' => ['Fiksi'],
            'BK-0005' => ['Fiksi', 'Sejarah'],
            'BK-0006' => ['Fiksi', 'Sains'],
            'BK-0007' => ['Fiksi', 'Agama'],
            'BK-0008' => ['Fiksi'],
            'BK-0009' => ['Fiksi', 'Non-Fiksi'],
            'BK-0010' => ['Fiksi', 'Anak'],
            'BK-0011' => ['Fiksi', 'Sejarah'],
            'BK-0012' => ['Fiksi', 'Sains'],
        ];

        $categoryIds = Category::query()->pluck('id', 'name');

        foreach ($map as $code => $categories) {
            $book = Book::where('book_code', $code)->first();
            if (! $book) {
                continue;
            }

            $ids = collect($categories)
                ->map(fn ($name) => $categoryIds[$name] ?? null)
                ->filter()
                ->all();

            if ($ids) {
                $book->categories()->syncWithoutDetaching($ids);
            }
        }
    }
}
