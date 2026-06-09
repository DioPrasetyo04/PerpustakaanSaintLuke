<?php

namespace App\Filament\Resources\Loans\Schemas;

use App\Enums\LoanBookStatus;
use App\Enums\LoanStatus;
use App\Enums\LoanType;
use App\Models\FineSettings;
use App\Models\Loan;
use App\Models\User;
use Filament\Actions\Action;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\Hidden;
use Filament\Forms\Components\Placeholder;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Utilities\Get;
use Filament\Schemas\Components\Utilities\Set;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\HtmlString;

class LoanForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Informasi Peminjaman')
                    ->description('Pilih peminjam atau scan kartu anggota. Tanggal pinjam & jatuh tempo dicatat per buku di bagian bawah.')
                    ->icon(Heroicon::OutlinedUser)
                    ->headerActions([
                        Action::make('scanCard')
                            ->label('Scan Kartu Anggota')
                            ->icon('heroicon-o-qr-code')
                            ->color('success')
                            ->modalHeading('Scan Kartu Anggota')
                            ->modalDescription('Gunakan scanner USB, ketik nomor anggota, atau kamera untuk memilih peminjam tanpa dropdown.')
                            ->modalIcon('heroicon-o-qr-code')
                            ->modalContent(fn() => view('filament.loan.scanner', ['wireMethod' => 'applyScannedMember']))
                            ->modalSubmitAction(false)
                            ->modalCancelActionLabel('Tutup'),
                    ])
                    ->schema([
                        Grid::make(2)->schema([
                            Select::make('user_id')
                                ->label('Peminjam')
                                ->relationship('user', 'name', function (Builder $query) {
                                    $query->whereDoesntHave('roles', function ($q) {
                                        $q->whereIn('name', ['admin', 'manager', 'writer']);
                                    });
                                })
                                ->getOptionLabelFromRecordUsing(fn(User $record): string => "{$record->name} — {$record->email}")
                                ->searchable(['name', 'username', 'email', 'phone', 'address', 'date_of_birth'])
                                ->preload()
                                ->live()
                                ->default(fn() => request()->integer('user_id') ?: null)
                                ->afterStateUpdated(function (Set $set, $state, $livewire) {
                                    $set('loan_code', filled($state)
                                        ? generateUniqueCode('Loan', Loan::class, 'loan_code')
                                        : null);

                                    // Hanya di form Create: muat otomatis buku lama yang
                                    // belum dikembalikan agar terlihat & due date-nya terkunci.
                                    if (! $livewire instanceof \App\Filament\Resources\Loans\Pages\CreateLoan) {
                                        return;
                                    }

                                    if (blank($state)) {
                                        $set('loanDetails', [self::blankLoanRow()]);
                                        return;
                                    }

                                    $existing = self::existingLoanRows((int) $state);
                                    // Selalu sediakan satu baris kosong untuk menambah buku baru.
                                    $existing[] = self::blankLoanRow();
                                    $set('loanDetails', $existing);
                                })
                                ->required()
                                ->columnSpanFull(),

                            Placeholder::make('user_preview')
                                ->hiddenLabel()
                                ->dehydrated(false)
                                ->content(fn(Get $get) => self::renderUserPreview($get('user_id')))
                                ->columnSpanFull(),

                            TextInput::make('loan_code')
                                ->label('Kode Peminjaman')
                                ->readOnly()
                                ->disabled()
                                ->dehydrated()
                                ->default(fn() => request()->integer('user_id')
                                    ? generateUniqueCode('Loan', Loan::class, 'loan_code')
                                    : null)
                                ->columnSpanFull(),

                            Hidden::make('status')->default(LoanStatus::LOANED->value),
                        ]),
                    ])->columnSpanFull(),

                Section::make('Daftar Buku Pinjaman')
                    ->description('1 peminjam dapat meminjam beberapa buku sekaligus. Setiap buku memiliki tanggal pinjam & jatuh tempo masing-masing.')
                    ->icon(Heroicon::OutlinedBookOpen)
                    ->schema([
                        Repeater::make('loanDetails')
                            ->label('Buku Pinjaman')
                            ->relationship()
                            ->schema([
                                Select::make('book_id')
                                    ->label('Buku')
                                    // Sembunyikan buku yang masih aktif dipinjam oleh peminjam ini
                                    // dari daftar & pencarian agar tidak terpilih dua kali.
                                    ->relationship('book', 'title', function (Builder $query, Get $get, $livewire) {
                                        $userId = $get('../../user_id') ?: data_get($livewire, 'data.user_id');
                                        $currentBookId = $get('book_id');

                                        if (blank($userId)) {
                                            return;
                                        }

                                        $activeBookIds = \App\Models\LoanDetail::query()
                                            ->whereDoesntHave('returnBook')
                                            ->whereHas('loan', fn(Builder $l) => $l->where('user_id', $userId))
                                            // Jangan kecualikan buku yang sedang dipilih di baris ini
                                            // supaya label tetap tampil (mis. baris terkunci).
                                            ->when($currentBookId, fn($q) => $q->where('book_id', '!=', $currentBookId))
                                            ->pluck('book_id')
                                            ->all();

                                        if (! empty($activeBookIds)) {
                                            $query->whereNotIn('id', $activeBookIds);
                                        }
                                    })
                                    ->getOptionLabelFromRecordUsing(fn($record) => self::bookOptionHtml($record))
                                    ->allowHtml()
                                    ->searchable(['title', 'book_code', 'isbn'])
                                    ->preload()
                                    ->required()
                                    ->distinct()
                                    // Buku lama (pinjaman aktif) tidak boleh diganti.
                                    ->disabled(fn(Get $get): bool => (bool) $get('is_existing'))
                                    ->dehydrated()
                                    ->columnSpanFull(),

                                Grid::make(2)->schema([
                                    DatePicker::make('loan_date')
                                        ->label('Tanggal Pinjam')
                                        ->default(fn() => now()->startOfDay())
                                        ->disabled()
                                        ->dehydrated()
                                        ->required(),

                                    DatePicker::make('due_date')
                                        ->label('Tanggal Jatuh Tempo')
                                        ->default(function () {
                                            $duration = (int) (FineSettings::query()->value('loan_duration_days') ?? 14);
                                            return now()->startOfDay()->addDays($duration);
                                        })
                                        // Hanya buku lama yang dikunci; buku baru tetap bisa diatur.
                                        ->disabled(fn(Get $get): bool => (bool) $get('is_existing'))
                                        ->helperText(fn(Get $get): ?string => $get('is_existing')
                                            ? 'Pinjaman aktif — jatuh tempo tidak dapat diubah.'
                                            : null)
                                        ->dehydrated()
                                        ->required(),
                                ]),

                                Hidden::make('status')->default(LoanBookStatus::BORROWED->value),
                                Hidden::make('loan_type')->default(LoanType::PHYSICAL->value),
                                // Penanda buku lama (pinjaman aktif). Dibiarkan
                                // ter-dehydrate agar tetap ada di state lintas request;
                                // bukan kolom fillable di LoanDetail sehingga diabaikan saat simpan.
                                Hidden::make('is_existing')->default(false),
                            ])
                            ->itemLabel(fn(array $state): ?string => isset($state['book_id'])
                                ? (($state['is_existing'] ?? false) ? '🔒 ' : '')
                                . (\App\Models\Book::query()->whereKey($state['book_id'])->value('title') ?? 'Buku Baru')
                                : 'Buku Baru')
                            ->minItems(1)
                            ->defaultItems(1)
                            ->addActionLabel('Tambah Buku')
                            ->reorderable(false)
                            ->collapsible()
                            ->columnSpanFull(),
                    ])->columnSpanFull(),
            ]);
    }

    private static function renderUserPreview(mixed $userId): HtmlString
    {
        if (! $userId) {
            return new HtmlString(
                '<div class="text-sm italic text-gray-500 dark:text-gray-400">'
                    . 'Pilih peminjam terlebih dahulu untuk melihat detail.'
                    . '</div>'
            );
        }

        $user = User::query()->find($userId);

        if (! $user) {
            return new HtmlString(
                '<div class="text-sm font-medium text-danger-600 dark:text-danger-400">'
                    . 'User tidak ditemukan.'
                    . '</div>'
            );
        }

        $avatarUrl = self::resolveAvatarUrl($user);
        $name = e($user->name);
        $username = e($user->username ?? '-');
        $email = e($user->email);
        $phone = e($user->phone ?? '-');

        return new HtmlString(<<<HTML
            <div class="flex flex-col md:flex-row items-center md:items-start gap-4 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-4">
                <img src="{$avatarUrl}" alt="avatar"
                     class="rounded-full object-cover ring-2 ring-white dark:ring-gray-900 shadow"
                     style="height:64px;width:64px;border-radius:9999px;object-fit:cover;flex-shrink:0;"/>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3 flex-1 w-full text-sm">
                    <div>
                        <div class="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">Nama Lengkap:</div>
                        <div class="font-semibold text-gray-950 dark:text-white">{$name}</div>
                    </div>
                    <div>
                        <div class="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">Username:</div>
                        <div class="font-semibold text-gray-950 dark:text-white">{$username}</div>
                    </div>
                    <div>
                        <div class="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">Email:</div>
                        <div class="font-semibold text-gray-950 dark:text-white break-all">{$email}</div>
                    </div>
                    <div>
                        <div class="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">Telepon:</div>
                        <div class="font-semibold text-gray-950 dark:text-white">{$phone}</div>
                    </div>
                </div>
            </div>
        HTML);
    }

    /**
     * Baris repeater untuk buku yang masih aktif dipinjam (belum dikembalikan)
     * oleh peminjam terpilih. Ditandai is_existing = true agar field-nya dikunci
     * dan tidak ikut disimpan ulang sebagai pinjaman baru.
     *
     * @return array<int, array<string, mixed>>
     */
    private static function existingLoanRows(int $userId): array
    {
        return \App\Models\LoanDetail::query()
            ->whereHas('loan', fn(Builder $q) => $q->where('user_id', $userId))
            ->whereDoesntHave('returnBook')
            ->orderByDesc('id')
            ->get()
            ->map(fn(\App\Models\LoanDetail $detail): array => [
                'book_id'    => $detail->book_id,
                'loan_date'  => optional($detail->loan_date)->toDateString(),
                'due_date'   => optional($detail->due_date)->toDateString(),
                'status'     => $detail->status ?? LoanBookStatus::BORROWED->value,
                'loan_type'  => $detail->loan_type ?? LoanType::PHYSICAL->value,
                'is_existing' => true,
            ])
            ->all();
    }

    /** Baris repeater kosong (buku baru) dengan due date default. */
    private static function blankLoanRow(): array
    {
        $duration = (int) (FineSettings::query()->value('loan_duration_days') ?? 14);

        return [
            'book_id'    => null,
            'loan_date'  => now()->startOfDay()->toDateString(),
            'due_date'   => now()->startOfDay()->addDays($duration)->toDateString(),
            'status'     => LoanBookStatus::BORROWED->value,
            'loan_type'  => LoanType::PHYSICAL->value,
            'is_existing' => false,
        ];
    }

    /** Label opsi Select buku: cover + judul + ISBN (HTML). */
    private static function bookOptionHtml(\App\Models\Book $book): HtmlString
    {
        $title = e($book->title);
        $isbn = $book->isbn ? e($book->isbn) : null;
        $code = $book->book_code ? e($book->book_code) : null;
        $secondary = $isbn ? 'ISBN: ' . $isbn : ($code ? 'Kode: ' . $code : '');

        $coverUrl = $book->cover ? asset('storage/' . $book->cover) : null;
        $cover = $coverUrl
            ? '<img src="' . e($coverUrl) . '" style="width:32px;height:44px;border-radius:4px;object-fit:cover;flex-shrink:0;border:1px solid #e5e7eb;background:#ffffff;" alt="">'
            : '<span style="display:inline-flex;align-items:center;justify-content:center;width:32px;height:44px;border-radius:4px;background:#e0e7ff;color:#3730a3;font-weight:700;font-size:13px;flex-shrink:0;">'
                . e(mb_strtoupper(mb_substr($title, 0, 1)))
                . '</span>';

        return new HtmlString(
            '<span style="display:inline-flex;align-items:center;gap:10px;line-height:1.25;">'
                . $cover
                . '<span style="display:inline-flex;flex-direction:column;min-width:0;">'
                . '<span style="font-weight:600;color:currentColor;">' . $title . '</span>'
                . ($secondary ? '<span style="font-size:11px;color:#6b7280;">' . $secondary . '</span>' : '')
                . '</span>'
                . '</span>'
        );
    }

    private static function resolveAvatarUrl(User $user): string
    {
        $avatar = $user->avatar;

        if (! $avatar) {
            return 'https://ui-avatars.com/api/?name=' . urlencode($user->name) . '&background=random&color=fff';
        }

        if (str_starts_with($avatar, 'http://') || str_starts_with($avatar, 'https://')) {
            return $avatar;
        }

        return Storage::url($avatar);
    }
}
