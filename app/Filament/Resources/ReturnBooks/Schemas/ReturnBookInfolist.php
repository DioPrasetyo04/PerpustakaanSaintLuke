<?php

namespace App\Filament\Resources\ReturnBooks\Schemas;

use App\Enums\BookCondition;
use App\Enums\LoanBookStatus;
use App\Enums\LoanStatus;
use App\Enums\PaymentStatus;
use App\Enums\ReturnBookStatus;
use Filament\Infolists\Components\ImageEntry;
use Filament\Infolists\Components\RepeatableEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Infolists\Components\Actions;
use Filament\Actions\Action;
use App\Services\MidtransService;
use Filament\Notifications\Notification;
use Filament\Infolists\Components\ViewEntry;

class ReturnBookInfolist
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

                Section::make('Detail Pengembalian per Buku')
                    ->icon(Heroicon::OutlinedArrowUturnLeft)
                    ->description('Tiap baris berisi data peminjaman buku, data pengembalian, pengecekan kondisi, denda (jika ada), dan ulasan peminjam.')
                    ->schema([
                        RepeatableEntry::make('loanDetails')
                            ->hiddenLabel()
                            ->schema([
                                Grid::make(4)->schema([
                                    ImageEntry::make('book.cover')
                                        ->label('Cover')
                                        ->disk('public')
                                        ->height(140)
                                        ->extraImgAttributes(['class' => 'rounded-md object-cover'])
                                        ->columnSpan(1),

                                    Grid::make(2)->schema([
                                        TextEntry::make('book.title')->label('Judul Buku')->weight('bold'),
                                        TextEntry::make('book.book_code')->label('Kode Buku')->badge()->color('gray')->copyable(),
                                        TextEntry::make('book.authors.name')->label('Penulis')->badge()->color('gray')->listWithLineBreaks()->placeholder('—'),
                                        TextEntry::make('book.isbn')->label('ISBN')->placeholder('—'),

                                        TextEntry::make('loan_date')
                                            ->label('Tanggal Pinjam')
                                            ->date('d M Y')
                                            ->badge()->color('warning')
                                            ->icon('heroicon-s-calendar-days'),

                                        TextEntry::make('due_date')
                                            ->label('Jatuh Tempo')
                                            ->date('d M Y')
                                            ->badge()->color('danger')
                                            ->icon('heroicon-s-exclamation-circle'),

                                        TextEntry::make('status')
                                            ->label('Status Buku')
                                            ->badge()
                                            ->formatStateUsing(fn($state) => self::toBookStatus($state)?->label() ?? '-')
                                            ->color(fn($state) => match (self::toBookStatus($state)) {
                                                LoanBookStatus::BORROWED => 'warning',
                                                LoanBookStatus::RETURNED => 'success',
                                                default => 'gray',
                                            }),
                                    ])->columnSpan(3),
                                ]),

                                Section::make('Data Pengembalian')
                                    ->icon(Heroicon::OutlinedArrowUturnLeft)
                                    ->schema([
                                        Grid::make(3)->schema([
                                            TextEntry::make('returnBook.return_book_code')
                                                ->label('Kode Pengembalian')
                                                ->badge()->color('info')->copyable()
                                                ->placeholder('Belum dikembalikan'),

                                            TextEntry::make('returnBook.return_date')
                                                ->label('Tanggal Pengembalian')
                                                ->date('d M Y')
                                                ->badge()->color('success')
                                                ->placeholder('—'),

                                            TextEntry::make('returnBook.status')
                                                ->label('Status Pengembalian')
                                                ->badge()
                                                ->formatStateUsing(fn($state) => self::toReturnStatus($state)?->label() ?? '-')
                                                ->color(fn($state) => match (self::toReturnStatus($state)) {
                                                    ReturnBookStatus::RETURNED => 'success',
                                                    ReturnBookStatus::CHECKED => 'info',
                                                    ReturnBookStatus::COST => 'danger',
                                                    default => 'gray',
                                                })
                                                ->placeholder('—'),
                                        ]),
                                    ])
                                    ->visible(fn($record) => filled($record?->returnBook))
                                    ->columnSpanFull(),

                                Section::make('Pengecekan Kondisi')
                                    ->icon(Heroicon::OutlinedClipboardDocumentCheck)
                                    ->schema([
                                        Grid::make(2)->schema([
                                            TextEntry::make('returnBook.returnBookCheck.condition')
                                                ->label('Kondisi Buku')
                                                ->badge()
                                                ->formatStateUsing(fn($state) => self::toCondition($state)?->value ?? '-')
                                                ->color(fn($state) => match (self::toCondition($state)) {
                                                    BookCondition::GOOD => 'success',
                                                    BookCondition::DAMAGED => 'warning',
                                                    BookCondition::LOST => 'danger',
                                                    default => 'gray',
                                                })
                                                ->icon(fn($state) => match (self::toCondition($state)) {
                                                    BookCondition::GOOD => 'heroicon-s-check-circle',
                                                    BookCondition::DAMAGED => 'heroicon-s-exclamation-triangle',
                                                    BookCondition::LOST => 'heroicon-s-x-circle',
                                                    default => 'heroicon-s-question-mark-circle',
                                                })
                                                ->placeholder('—'),

                                            TextEntry::make('returnBook.returnBookCheck.notes')
                                                ->label('Catatan Pengecekan')
                                                ->html()
                                                ->placeholder('Tidak ada catatan.'),
                                        ]),
                                    ])
                                    ->visible(fn($state) => isset($state['returnBook']['returnBookCheck']))
                                    ->columnSpanFull(),

                                Section::make('Denda')
                                    ->icon(Heroicon::OutlinedCurrencyDollar)
                                    ->schema([
                                        Grid::make(4)->schema([
                                            TextEntry::make('returnBook.fine.late_fee')
                                                ->label('Denda Keterlambatan')
                                                ->money('IDR', divideBy: 1, locale: 'id_ID')
                                                ->placeholder('—'),

                                            TextEntry::make('returnBook.fine.other_fee')
                                                ->label('Denda Lain')
                                                ->money('IDR', divideBy: 1, locale: 'id_ID')
                                                ->placeholder('—'),

                                            TextEntry::make('returnBook.fine.total_fee')
                                                ->label('Total Denda')
                                                ->money('IDR', divideBy: 1, locale: 'id_ID')
                                                ->weight('bold')
                                                ->color('danger')
                                                ->placeholder('—'),

                                            TextEntry::make('returnBook.fine.payment_status')
                                                ->label('Status Pembayaran')
                                                ->badge()
                                                ->formatStateUsing(fn($state) => self::toPaymentStatus($state)?->name ?? '-')
                                                ->color(fn($state) => match (self::toPaymentStatus($state)) {
                                                    PaymentStatus::SUCCESS => 'success',
                                                    PaymentStatus::PENDING => 'warning',
                                                    PaymentStatus::FAILED, PaymentStatus::ERROR => 'danger',
                                                    default => 'gray',
                                                })
                                                ->placeholder('—'),
                                        ]),
                                        ViewEntry::make('returnBook.fine')
                                            ->view('filament.infolists.pay-fine-button'),
                                    ])
                                    ->visible(fn($record) => filled($record?->returnBook?->fine))
                                    ->columnSpanFull(),

                                Section::make('Ulasan Peminjam')
                                    ->icon(Heroicon::OutlinedStar)
                                    ->schema([
                                        Grid::make(2)->schema([
                                            TextEntry::make('returnBook.review.rating')
                                                ->label('Rating')
                                                ->badge()
                                                ->color('warning')
                                                ->icon('heroicon-s-star')
                                                ->formatStateUsing(fn($state) => $state ? number_format((float) $state, 1) . ' / 5.0' : '—')
                                                ->placeholder('—'),

                                            TextEntry::make('returnBook.review.comment')
                                                ->label('Komentar')
                                                ->html()
                                                ->placeholder('Belum ada ulasan.'),
                                        ]),
                                    ])
                                    ->visible(fn($record) => filled($record?->returnBook?->review))
                                    ->columnSpanFull(),
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

    private static function toReturnStatus(mixed $state): ?ReturnBookStatus
    {
        if ($state instanceof ReturnBookStatus) {
            return $state;
        }
        return is_scalar($state) ? ReturnBookStatus::tryFrom((string) $state) : null;
    }

    private static function toCondition(mixed $state): ?BookCondition
    {
        if ($state instanceof BookCondition) {
            return $state;
        }
        return is_scalar($state) ? BookCondition::tryFrom((string) $state) : null;
    }

    private static function toPaymentStatus(mixed $state): ?PaymentStatus
    {
        if ($state instanceof PaymentStatus) {
            return $state;
        }
        return is_scalar($state) ? PaymentStatus::tryFrom((string) $state) : null;
    }
}
