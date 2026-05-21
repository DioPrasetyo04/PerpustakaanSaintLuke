<?php

namespace App\Filament\Resources\Loans\Schemas;

use App\Enums\LoanBookStatus;
use App\Enums\LoanStatus;
use Filament\Infolists\Components\ImageEntry;
use Filament\Infolists\Components\RepeatableEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;

class LoanInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Informasi Peminjaman')
                    ->icon(Heroicon::OutlinedClipboardDocumentList)
                    ->schema([
                        Grid::make(3)->schema([
                            TextEntry::make('loan_code')
                                ->label('Kode Peminjaman')
                                ->badge()
                                ->color('gray')
                                ->copyable()
                                ->icon('heroicon-s-hashtag'),

                            TextEntry::make('status')
                                ->label('Status Pinjaman')
                                ->badge()
                                ->formatStateUsing(fn($state) => self::toLoanStatus($state)?->label() ?? '-')
                                ->color(fn($state) => match (self::toLoanStatus($state)) {
                                    LoanStatus::LOANED => 'warning',
                                    LoanStatus::PARTIAL_RETURNED => 'info',
                                    LoanStatus::RETURNED => 'success',
                                    default => 'gray',
                                })
                                ->icon(fn($state) => match (self::toLoanStatus($state)) {
                                    LoanStatus::LOANED => 'heroicon-s-clock',
                                    LoanStatus::PARTIAL_RETURNED => 'heroicon-s-arrow-path',
                                    LoanStatus::RETURNED => 'heroicon-s-check-circle',
                                    default => 'heroicon-s-question-mark-circle',
                                }),

                            TextEntry::make('created_at')
                                ->label('Dibuat')
                                ->dateTime('d M Y H:i')
                                ->icon('heroicon-s-calendar'),
                        ]),
                    ])->columnSpanFull(),

                Section::make('Peminjam')
                    ->icon(Heroicon::OutlinedUser)
                    ->schema([
                        Grid::make(4)->schema([
                            ImageEntry::make('user.avatar')
                                ->label('Avatar')
                                ->disk('public')
                                ->circular()
                                ->height(80)
                                ->defaultImageUrl(fn($record) => 'https://ui-avatars.com/api/?name=' . urlencode($record->user->name ?? 'User') . '&background=random&color=fff')
                                ->columnSpan(1),

                            Grid::make(2)->schema([
                                TextEntry::make('user.name')->label('Nama Lengkap')->weight('bold')->icon('heroicon-s-user'),
                                TextEntry::make('user.username')->label('Username')->placeholder('—')->icon('heroicon-s-at-symbol'),
                                TextEntry::make('user.email')->label('Email')->copyable()->icon('heroicon-s-envelope'),
                                TextEntry::make('user.phone')->label('Telepon')->copyable()->placeholder('—')->icon('heroicon-s-phone'),
                                TextEntry::make('user.date_of_birth')->label('Tanggal Lahir')->date('d M Y')->placeholder('—')->icon('heroicon-s-cake'),
                                TextEntry::make('user.address')->label('Alamat')->placeholder('—')->icon('heroicon-s-map-pin'),
                            ])->columnSpan(3),
                        ]),
                    ])->columnSpanFull(),

                Section::make('Daftar Buku Pinjaman')
                    ->icon(Heroicon::OutlinedBookOpen)
                    ->description('Tiap baris adalah satu buku dengan tanggal pinjam & jatuh tempo masing-masing.')
                    ->schema([
                        RepeatableEntry::make('loanDetails')
                            ->hiddenLabel()
                            ->schema([
                                Grid::make(4)->schema([
                                    ImageEntry::make('book.cover')
                                        ->label('Cover')
                                        ->disk('public')
                                        ->height(120)
                                        ->extraImgAttributes(['class' => 'rounded-md object-cover'])
                                        ->columnSpan(1),

                                    Grid::make(2)->schema([
                                        TextEntry::make('book.title')->label('Judul Buku')->weight('bold'),
                                        TextEntry::make('book.book_code')->label('Kode Buku')->badge()->color('gray')->copyable(),
                                        TextEntry::make('book.isbn')->label('ISBN')->placeholder('—'),
                                        TextEntry::make('book.authors.name')->label('Penulis')->badge()->color('gray')->listWithLineBreaks()->placeholder('—'),

                                        TextEntry::make('loan_date')
                                            ->label('Tanggal Pinjam')
                                            ->date('d M Y')
                                            ->badge()
                                            ->color('warning')
                                            ->icon('heroicon-s-calendar-days'),

                                        TextEntry::make('due_date')
                                            ->label('Jatuh Tempo')
                                            ->date('d M Y')
                                            ->badge()
                                            ->color('danger')
                                            ->icon('heroicon-s-exclamation-circle'),

                                        TextEntry::make('status')
                                            ->label('Status Buku')
                                            ->badge()
                                            ->formatStateUsing(fn($state) => self::toBookStatus($state)?->label() ?? '-')
                                            ->color(fn($state) => match (self::toBookStatus($state)) {
                                                LoanBookStatus::BORROWED => 'warning',
                                                LoanBookStatus::RETURNED => 'success',
                                                default => 'gray',
                                            })
                                            ->icon(fn($state) => match (self::toBookStatus($state)) {
                                                LoanBookStatus::BORROWED => 'heroicon-s-book-open',
                                                LoanBookStatus::RETURNED => 'heroicon-s-check-circle',
                                                default => 'heroicon-s-question-mark-circle',
                                            }),

                                        TextEntry::make('returnBook.return_date')
                                            ->label('Tanggal Pengembalian')
                                            ->date('d M Y')
                                            ->badge()
                                            ->color('success')
                                            ->placeholder('Belum dikembalikan')
                                            ->icon('heroicon-s-arrow-uturn-left'),
                                    ])->columnSpan(3),
                                ]),
                            ])
                            ->columnSpanFull(),
                    ])->columnSpanFull(),
            ]);
    }

    private static function toLoanStatus(mixed $state): ?LoanStatus
    {
        if ($state instanceof LoanStatus) {
            return $state;
        }
        return is_scalar($state) ? LoanStatus::tryFrom((string) $state) : null;
    }

    private static function toBookStatus(mixed $state): ?LoanBookStatus
    {
        if ($state instanceof LoanBookStatus) {
            return $state;
        }
        return is_scalar($state) ? LoanBookStatus::tryFrom((string) $state) : null;
    }
}
