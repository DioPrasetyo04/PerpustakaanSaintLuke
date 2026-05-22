<?php

namespace App\Filament\Resources\Loans\Schemas;

use App\Enums\LoanBookStatus;
use App\Enums\LoanStatus;
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
                                ->afterStateUpdated(function (Set $set, $state) {
                                    $set('loan_code', filled($state)
                                        ? generateUniqueCode('Loan', Loan::class, 'loan_code')
                                        : null);
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
                                    ->relationship('book', 'title')
                                    ->searchable(['title', 'book_code', 'isbn'])
                                    ->preload()
                                    ->required()
                                    ->distinct()
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
                                        ->dehydrated()
                                        ->required(),
                                ]),

                                Hidden::make('status')->default(LoanBookStatus::BORROWED->value),
                            ])
                            ->itemLabel(fn(array $state): ?string => isset($state['book_id'])
                                ? (\App\Models\Book::query()->whereKey($state['book_id'])->value('title') ?? 'Buku Baru')
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
                     class="h-5 w-5 rounded-full object-cover ring-2 ring-white dark:ring-gray-900 shadow"/>
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
