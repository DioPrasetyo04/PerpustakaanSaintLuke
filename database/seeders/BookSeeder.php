<?php

namespace Database\Seeders;

use App\Enums\BookStatus;
use App\Enums\PublishedBooks;
use App\Models\Author;
use App\Models\Book;
use App\Models\Language;
use App\Models\Publisher;
use App\Models\Type;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class BookSeeder extends Seeder
{
    /**
     * Seed koleksi buku beserta relasi penulis & tipe (digital/fisik).
     * Stok diisi StockSeeder, kategori diisi BookOfCategorySeeder.
     *
     * Dependensi: LanguageSeeder, PublisherSeeder, AuthorsSeeder, TypeSeeder,
     * dan minimal 1 user (AdminUserSeeder/StaffUsersSeeder) untuk added_by.
     */
    public function run(): void
    {
        $addedBy = User::query()->orderBy('id')->value('id');
        if (! $addedBy) {
            $this->command?->warn('BookSeeder dilewati: belum ada user (jalankan AdminUserSeeder dulu).');
            return;
        }

        $publishers = Publisher::query()->pluck('id', 'slug');
        $idLang = Language::where('code', 'id')->value('id');
        $enLang = Language::where('code', 'en')->value('id');
        $types = Type::query()->pluck('id', 'type'); // ['digital' => x, 'fisik' => y]

        if ($publishers->isEmpty() || ! $idLang || $types->isEmpty()) {
            $this->command?->warn('BookSeeder dilewati: jalankan PublisherSeeder, LanguageSeeder, dan TypeSeeder dulu.');
            return;
        }

        $books = [
            ['code' => 'BK-0001', 'title' => 'Laskar Pelangi', 'author' => 'Andrea Hirata', 'publisher' => 'bentang-pustaka', 'lang' => 'id', 'type' => 'fisik', 'year' => 2005, 'pages' => 529, 'price' => 95000, 'class' => '813.54', 'spotlight' => true, 'synopsis' => 'Kisah inspiratif sepuluh anak Belitung yang berjuang menempuh pendidikan di tengah keterbatasan.'],
            ['code' => 'BK-0002', 'title' => 'Sang Pemimpi', 'author' => 'Andrea Hirata', 'publisher' => 'bentang-pustaka', 'lang' => 'id', 'type' => 'fisik', 'year' => 2006, 'pages' => 292, 'price' => 88000, 'class' => '813.54', 'synopsis' => 'Lanjutan Laskar Pelangi tentang mimpi besar Ikal dan Arai menggapai Sorbonne.'],
            ['code' => 'BK-0003', 'title' => 'Bumi', 'author' => 'Tere Liye', 'publisher' => 'gramedia-pustaka-utama', 'lang' => 'id', 'type' => 'digital', 'year' => 2014, 'pages' => 440, 'price' => 79000, 'class' => '813.6', 'synopsis' => 'Petualangan Raib, Seli, dan Ali menjelajah dunia paralel penuh keajaiban.'],
            ['code' => 'BK-0004', 'title' => 'Pulang', 'author' => 'Tere Liye', 'publisher' => 'republika-penerbit', 'lang' => 'id', 'type' => 'fisik', 'year' => 2015, 'pages' => 400, 'price' => 82000, 'class' => '813.6', 'synopsis' => 'Perjalanan Bujang dari pedalaman Sumatera menuju pusat kekuasaan dunia shadow economy.'],
            ['code' => 'BK-0005', 'title' => 'Bumi Manusia', 'author' => 'Pramoedya Ananta Toer', 'publisher' => 'gramedia-pustaka-utama', 'lang' => 'id', 'type' => 'fisik', 'year' => 1980, 'pages' => 535, 'price' => 110000, 'class' => '899.221', 'synopsis' => 'Roman sejarah Minke di era kolonial, buku pertama Tetralogi Buru.'],
            ['code' => 'BK-0006', 'title' => 'Supernova: Ksatria, Puteri, dan Bintang Jatuh', 'author' => 'Dee Lestari', 'publisher' => 'bentang-pustaka', 'lang' => 'id', 'type' => 'digital', 'year' => 2001, 'pages' => 286, 'price' => 90000, 'class' => '813.6', 'synopsis' => 'Perpaduan sains, filsafat, dan cinta dalam novel ikonik Dee Lestari.'],
            ['code' => 'BK-0007', 'title' => 'Ayat-Ayat Cinta', 'author' => 'Habiburrahman El Shirazy', 'publisher' => 'republika-penerbit', 'lang' => 'id', 'type' => 'fisik', 'year' => 2004, 'pages' => 420, 'price' => 75000, 'class' => '813.6', 'synopsis' => 'Kisah cinta dan keimanan Fahri, mahasiswa Indonesia di Al-Azhar Kairo.'],
            ['code' => 'BK-0008', 'title' => 'Cantik Itu Luka', 'author' => 'Eka Kurniawan', 'publisher' => 'gramedia-pustaka-utama', 'lang' => 'id', 'type' => 'fisik', 'year' => 2002, 'pages' => 520, 'price' => 105000, 'class' => '813.6', 'synopsis' => 'Saga keluarga Dewi Ayu yang memadukan sejarah, mitos, dan realisme magis.'],
            ['code' => 'BK-0009', 'title' => 'Kambing Jantan', 'author' => 'Raditya Dika', 'publisher' => 'gramedia-pustaka-utama', 'lang' => 'id', 'type' => 'digital', 'year' => 2005, 'pages' => 236, 'price' => 65000, 'class' => '818.02', 'synopsis' => 'Catatan harian komedi seorang pelajar Indonesia di Australia.'],
            ['code' => 'BK-0010', 'title' => "Harry Potter and the Philosopher's Stone", 'author' => 'J.K. Rowling', 'publisher' => 'gramedia-pustaka-utama', 'lang' => 'en', 'type' => 'fisik', 'year' => 1997, 'pages' => 332, 'price' => 150000, 'class' => '823.914', 'synopsis' => 'Seorang anak yatim menemukan bahwa ia adalah penyihir dan memulai sekolah di Hogwarts.'],
            ['code' => 'BK-0011', 'title' => 'Arus Balik', 'author' => 'Pramoedya Ananta Toer', 'publisher' => 'gramedia-pustaka-utama', 'lang' => 'id', 'type' => 'fisik', 'year' => 1995, 'pages' => 758, 'price' => 135000, 'class' => '899.221', 'synopsis' => 'Epik sejarah Nusantara abad ke-16 ketika kekuatan maritim mulai surut.'],
            ['code' => 'BK-0012', 'title' => 'Hujan', 'author' => 'Tere Liye', 'publisher' => 'gramedia-pustaka-utama', 'lang' => 'id', 'type' => 'digital', 'year' => 2016, 'pages' => 320, 'price' => 78000, 'class' => '813.6', 'synopsis' => 'Kisah cinta dan kehilangan Lail di tengah bencana alam dan kemajuan teknologi.'],
        ];

        foreach ($books as $data) {
            $book = Book::firstOrCreate(
                ['book_code' => $data['code']],
                [
                    'publisher_id' => $publishers[$data['publisher']] ?? $publishers->first(),
                    'added_by' => $addedBy,
                    'language_id' => $data['lang'] === 'en' && $enLang ? $enLang : $idLang,
                    'title' => $data['title'],
                    'slug' => Str::slug($data['title']),
                    'publication_year' => $data['year'],
                    'isbn' => '978-' . random_int(1000000000, 9999999999),
                    'synopsis' => $data['synopsis'],
                    'number_of_pages' => $data['pages'],
                    'location_book' => 'Rak ' . chr(65 + (intval(substr($data['code'], -2)) % 6)) . '-' . random_int(1, 30),
                    'classification_number' => $data['class'],
                    'volume' => 1,
                    'status' => BookStatus::AVAILABLE->value,
                    'price' => $data['price'],
                    'is_published' => PublishedBooks::PUBLISH->value,
                    'is_spotlight' => $data['spotlight'] ?? false,
                ],
            );

            // Penulis (pivot author_of_books)
            $authorId = Author::where('name', $data['author'])->value('id');
            if ($authorId) {
                $book->authors()->syncWithoutDetaching([$authorId]);
            }

            // Tipe buku (pivot book_of_types)
            if (isset($types[$data['type']])) {
                $book->types()->syncWithoutDetaching([$types[$data['type']]]);
            }
        }

        $this->command?->info('BookSeeder: ' . Book::count() . ' buku tersedia.');
    }
}
