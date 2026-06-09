<?php

namespace App\Services;

use App\Enums\BookStatus;
use App\Enums\PublishedBooks;
use App\Models\Author;
use App\Models\Book;
use App\Models\Language;
use App\Models\Publisher;
use App\Models\Stock;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use OpenSpout\Reader\CSV\Reader as CsvReader;
use OpenSpout\Reader\XLSX\Reader as XlsxReader;
use Spatie\Permission\Models\Role;

class BookImportService
{
    /**
     * Pemetaan judul kolom (dinormalisasi) ke key kanonik.
     * Mendukung beberapa variasi penamaan kolom di file Excel/CSV.
     *
     * @var array<string, array<int, string>>
     */
    protected array $aliases = [
        'classification_number' => ['DDC', 'nomor klasifikasi', 'no klasifikasi', 'klasifikasi', 'classification number', 'classification_number', 'ddc'],
        'title'                 => ['Judul Buku', 'judul', 'title'],
        'authors'               => ['author', 'authors', 'Pengarang', 'Penulis', 'author / pengarang', 'author/pengarang'],
        'volume'                => ['Jilid', 'Jld', 'volume', 'vol'],
        'publisher'             => ['Penerbit', 'publisher'],
        'total'                 => ['total eksemplar', 'total examplar', 'Total Exemplar', 'eksemplar', 'examplar', 'stok', 'stock', 'total', 'jumlah'],
        'publication_year'      => ['tahun terbit', 'Tahun', 'publication year', 'publication_year', 'tahun', 'year'],
    ];

    /**
     * Membaca file Excel/CSV dan membuat data buku beserta relasinya.
     *
     * @return array{total: int, success: int, skipped: array<int, string>, failed: array<int, string>}
     */
    public function import(string $absolutePath, string $extension): array
    {
        $reader = $this->makeReader($extension);
        $reader->open($absolutePath);

        $success = 0;
        $total = 0;
        $skipped = [];
        $failed = [];
        $seenKeys = [];
        $columnMap = null;
        $rowNumber = 0;
        $headerScanned = 0;
        $addedBy = auth()->id();
        $languageId = $this->resolveDefaultLanguageId();

        try {
            foreach ($reader->getSheetIterator() as $sheet) {
                foreach ($sheet->getRowIterator() as $row) {
                    $rowNumber++;
                    $cells = $row->toArray();

                    // Cari baris header: lewati baris kosong / baris pembuka (judul,
                    // gambar tertanam seperti "[Image #1]", dsb.) sampai ketemu baris
                    // yang memuat kolom "Judul Buku".
                    if ($columnMap === null) {
                        if ($this->isEmptyRow($cells)) {
                            continue;
                        }

                        $headerScanned++;
                        $candidate = $this->mapColumns($cells);

                        if ($candidate !== null) {
                            $columnMap = $candidate;
                            continue;
                        }

                        // Batasi pencarian agar tidak menelusuri seluruh file kalau
                        // memang tidak ada header yang valid.
                        if ($headerScanned >= 15) {
                            throw new \RuntimeException('Kolom "Judul Buku" tidak ditemukan pada file. Pastikan baris pertama berisi nama kolom.');
                        }

                        continue;
                    }

                    // Lewati baris yang benar-benar kosong.
                    if ($this->isEmptyRow($cells)) {
                        continue;
                    }

                    $data = $this->extractRow($cells, $columnMap);

                    $title = is_string($data['title']) ? trim($data['title']) : trim((string) $data['title']);

                    // Baris tanpa judul (mis. baris sisa/footer yang ikut terbaca
                    // karena ada sel nyasar) dilewati tanpa dihitung gagal.
                    if ($title === '') {
                        continue;
                    }

                    $total++;

                    // Kunci duplikat memakai kombinasi judul + jilid + DDC, bukan
                    // judul saja. Banyak buku berbagi judul yang sama tapi berbeda
                    // jilid (kolom "Jld") atau nomor klasifikasi (DDC), mis.
                    // "Biologi Kelas XII" Jld 2 dan Jld 3 adalah buku berbeda.
                    $dedupeKey = $this->dedupeKey($title, $data['volume'], $data['classification_number']);

                    // Lewati hanya jika kombinasi yang sama sudah ada (di file ini maupun di database) agar tidak dobel.
                    if (isset($seenKeys[$dedupeKey]) || $this->bookExists($title, $data['volume'], $data['classification_number'])) {
                        $skipped[$rowNumber] = $this->describeBook($title, $data['volume']);

                        continue;
                    }

                    try {
                        DB::transaction(function () use ($data, $addedBy, $languageId) {
                            $this->createBook($data, $addedBy, $languageId);
                        });

                        $seenKeys[$dedupeKey] = true;
                        $success++;
                    } catch (\Throwable $e) {
                        $failed[$rowNumber] = $e->getMessage();
                    }
                }

                // Hanya proses sheet pertama.
                break;
            }
        } finally {
            $reader->close();
        }

        return [
            'total'   => $total,
            'success' => $success,
            'skipped' => $skipped,
            'failed'  => $failed,
        ];
    }

    protected function makeReader(string $extension): XlsxReader|CsvReader
    {
        return strtolower($extension) === 'csv' ? new CsvReader() : new XlsxReader();
    }

    /**
     * Membangun pemetaan index kolom -> key kanonik berdasarkan baris header.
     * Mengembalikan null jika baris ini bukan header yang valid (tidak memuat
     * kolom "Judul Buku"), sehingga pemanggil bisa melanjutkan mencari header.
     *
     * @param  array<int, mixed>  $headerCells
     * @return array<string, int>|null
     */
    protected function mapColumns(array $headerCells): ?array
    {
        $map = [];

        // Normalisasi setiap alias sekali agar pencocokan header tidak peka huruf besar/kecil.
        $normalizedAliases = [];
        foreach ($this->aliases as $key => $variants) {
            $normalizedAliases[$key] = array_map(fn($variant) => $this->normalize($variant), $variants);
        }

        foreach ($headerCells as $index => $value) {
            $normalized = $this->normalize($value);

            if ($normalized === '') {
                continue;
            }

            foreach ($normalizedAliases as $key => $variants) {
                if (! isset($map[$key]) && in_array($normalized, $variants, true)) {
                    $map[$key] = $index;
                    break;
                }
            }
        }

        if (! isset($map['title'])) {
            return null;
        }

        return $map;
    }

    /**
     * @param  array<int, mixed>  $cells
     * @param  array<string, int>  $columnMap
     * @return array<string, mixed>
     */
    protected function extractRow(array $cells, array $columnMap): array
    {
        $get = function (string $key) use ($cells, $columnMap) {
            if (! isset($columnMap[$key])) {
                return null;
            }

            $value = $cells[$columnMap[$key]] ?? null;

            return is_string($value) ? trim($value) : $value;
        };

        return [
            'classification_number' => $get('classification_number'),
            'title'                 => $get('title'),
            'authors'               => $get('authors'),
            'volume'                => $get('volume'),
            'publisher'             => $get('publisher'),
            'total'                 => $get('total'),
            'publication_year'      => $get('publication_year'),
        ];
    }

    /**
     * @param  array<string, mixed>  $data
     */
    protected function createBook(array $data, ?int $addedBy, int $languageId): void
    {
        $title = is_string($data['title']) ? trim($data['title']) : (string) $data['title'];

        if ($title === '') {
            throw new \RuntimeException('Judul buku wajib diisi.');
        }

        // Total eksemplar kosong dianggap 0.
        $total = $this->parseInt($data['total']) ?? 0;

        if ($total < 0) {
            throw new \RuntimeException('Total eksemplar tidak boleh negatif.');
        }

        $book = Book::create([
            'title'                 => $title,
            'slug'                  => generateSlug($title, Book::class),
            'book_code'             => generateUniqueCode($title, Book::class, 'book_code'),
            'classification_number' => $this->stringOrNull($data['classification_number']),
            'volume'                => $this->stringOrNull($data['volume']),
            'publication_year'      => $this->parseYear($data['publication_year']),
            'publisher_id'          => $this->resolvePublisherId($data['publisher']),
            'language_id'           => $languageId,
            'added_by'              => $addedBy,
            'status'                => BookStatus::AVAILABLE,
            'is_published'          => PublishedBooks::PUBLISH,
        ]);

        $authorIds = $this->resolveAuthorIds($data['authors']);

        if (! empty($authorIds)) {
            $book->authors()->sync($authorIds);
        }

        Stock::create([
            'book_id'   => $book->id,
            'total'     => $total,
            'available' => $total,
            'loan'      => 0,
            'lost'      => 0,
            'damaged'   => 0,
        ]);
    }

    /**
     * Bangun kunci duplikat dari kombinasi judul + jilid + nomor klasifikasi
     * (semuanya dinormalisasi case-insensitive). Dua buku dianggap duplikat
     * hanya jika ketiganya sama.
     */
    protected function dedupeKey(string $title, mixed $volume, mixed $classificationNumber): string
    {
        return implode('|', [
            mb_strtolower(trim($title)),
            mb_strtolower((string) $this->stringOrNull($volume)),
            mb_strtolower((string) $this->stringOrNull($classificationNumber)),
        ]);
    }

    /**
     * Cek apakah sudah ada buku dengan kombinasi judul + jilid + nomor
     * klasifikasi yang sama (case-insensitive). NULL diperlakukan sebagai
     * string kosong agar cocok dengan kolom kosong di DB.
     */
    protected function bookExists(string $title, mixed $volume, mixed $classificationNumber): bool
    {
        $volume = (string) $this->stringOrNull($volume);
        $classificationNumber = (string) $this->stringOrNull($classificationNumber);

        return Book::query()
            ->whereRaw('LOWER(title) = ?', [mb_strtolower(trim($title))])
            ->whereRaw('LOWER(COALESCE(volume, "")) = ?', [mb_strtolower($volume)])
            ->whereRaw('LOWER(COALESCE(classification_number, "")) = ?', [mb_strtolower($classificationNumber)])
            ->exists();
    }

    /**
     * Label buku untuk notifikasi "dilewati", menyertakan jilid bila ada.
     */
    protected function describeBook(string $title, mixed $volume): string
    {
        $volume = $this->stringOrNull($volume);

        return $volume === null ? $title : $title . ' (Jld ' . $volume . ')';
    }

    protected function resolvePublisherId(mixed $name): ?int
    {
        $name = $this->stringOrNull($name);

        if ($name === null) {
            return null;
        }

        $publisher = Publisher::firstOrCreate(
            ['name' => $name],
            [
                'slug'      => generateSlug($name, Publisher::class),
                'is_active' => true,
            ],
        );

        return $publisher->id;
    }

    /**
     * Pisahkan beberapa nama author (dipisah koma / titik koma) lalu firstOrCreate.
     *
     * @return array<int, int>
     */
    protected function resolveAuthorIds(mixed $value): array
    {
        $raw = $this->stringOrNull($value);

        if ($raw === null) {
            return [];
        }

        $names = collect(preg_split('/[,;]+/', $raw))
            ->map(fn($name) => trim((string) $name))
            ->filter()
            ->unique();

        $ids = [];

        foreach ($names as $name) {
            $author = Author::firstOrCreate(
                ['name' => $name],
                [
                    'username'    => generateUsername($name),
                    'verified_at' => now(),
                ],
            );

            if (blank($author->verified_at)) {
                $author->forceFill(['verified_at' => now()])->save();
            }

            $this->ensureWriterRole($author);

            $ids[] = $author->id;
        }

        return $ids;
    }

    protected function ensureWriterRole(Author $author): void
    {
        // Author model menggunakan guard 'web'.
        $hasWriterRole = Role::where('name', 'writer')
            ->where('guard_name', 'web')
            ->exists();

        if ($hasWriterRole && ! $author->hasRole('writer')) {
            $author->assignRole('writer');
        }
    }

    protected function resolveDefaultLanguageId(): int
    {
        $language = Language::query()->first()
            ?? Language::firstOrCreate(
                ['language' => 'Indonesia'],
                ['code' => generateUniqueCode('Indonesia', Language::class, 'code')],
            );

        return $language->id;
    }

    /**
     * @param  array<int, mixed>  $cells
     */
    protected function isEmptyRow(array $cells): bool
    {
        foreach ($cells as $cell) {
            if (is_string($cell)) {
                if (trim($cell) !== '') {
                    return false;
                }
            } elseif ($cell !== null && $cell !== '') {
                return false;
            }
        }

        return true;
    }

    protected function normalize(mixed $value): string
    {
        if (! is_scalar($value)) {
            return '';
        }

        $value = (string) $value;

        // Ganti non-breaking space (Excel sering menyisipkannya) jadi spasi biasa.
        $value = str_replace("\u{00A0}", ' ', $value);

        $value = Str::lower(trim($value));

        // Rapatkan spasi/baris baru berlebih (header bisa multi-baris seperti
        // "Total\nExemplar").
        return (string) preg_replace('/\s+/u', ' ', $value);
    }

    protected function stringOrNull(mixed $value): ?string
    {
        if ($value === null) {
            return null;
        }

        $value = trim((string) $value);

        return $value === '' ? null : $value;
    }

    protected function parseInt(mixed $value): ?int
    {
        if ($value === null || $value === '') {
            return null;
        }

        if (is_int($value) || is_float($value)) {
            return (int) $value;
        }

        $clean = preg_replace('/[^0-9-]/', '', (string) $value);

        if ($clean === '' || $clean === '-') {
            return null;
        }

        return (int) $clean;
    }

    protected function parseYear(mixed $value): ?int
    {
        $year = $this->parseInt($value);

        if ($year === null) {
            return null;
        }

        // Kolom DB bertipe MySQL YEAR yang hanya menerima rentang 1901-2155.
        // Tahun di luar rentang masuk akal (mis. "200" akibat salah ketik)
        // diabaikan agar tidak memicu "Numeric value out of range".
        if ($year < 1901 || $year > (int) date('Y')) {
            return null;
        }

        return $year;
    }
}
