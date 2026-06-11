<?php

namespace Database\Seeders;

use App\Enums\AssetTypes;
use App\Models\Asset;
use App\Models\Book;
use App\Models\Type;
use Illuminate\Database\Seeder;

class AssetSeeder extends Seeder
{
    /**
     * Seed aset (file PDF) untuk buku bertipe digital dan hubungkan via
     * pivot book_of_assets. Dependensi: BookSeeder & TypeSeeder.
     */
    public function run(): void
    {
        $digitalTypeId = Type::where('type', 'digital')->value('id');
        if (! $digitalTypeId) {
            $this->command?->warn('AssetSeeder dilewati: tipe "digital" belum ada (jalankan TypeSeeder).');
            return;
        }

        $digitalBooks = Book::query()
            ->whereHas('types', fn ($q) => $q->where('types.id', $digitalTypeId))
            ->get();

        foreach ($digitalBooks as $book) {
            if ($book->assets()->exists()) {
                continue;
            }

            $asset = Asset::create([
                'type' => AssetTypes::FILE->value,
                'utility_path' => 'assets/' . $book->slug . '.pdf',
            ]);

            $book->assets()->syncWithoutDetaching([$asset->id]);
        }

        $this->command?->info('AssetSeeder: aset digital terpasang pada ' . $digitalBooks->count() . ' buku.');
    }
}
