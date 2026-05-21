<?php

namespace App\Filament\Resources\Books\Schemas;

use App\Enums\BookStatus;
use App\Enums\BookType;
use App\Enums\PublishedBooks;
use Filament\Infolists\Components\IconEntry;
use Filament\Infolists\Components\ImageEntry;
use Filament\Infolists\Components\RepeatableEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Filament\Support\Enums\TextSize;
use Filament\Support\Icons\Heroicon;

class BookInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Informasi Buku')
                    ->icon(Heroicon::OutlinedBookOpen)
                    ->schema([
                        Grid::make(3)->schema([
                            ImageEntry::make('cover')
                                ->label('Cover')
                                ->disk('public')
                                ->height(220)
                                ->extraImgAttributes(['class' => 'rounded-lg object-cover'])
                                ->columnSpan(1),

                            Grid::make(2)->schema([
                                TextEntry::make('title')->label('Judul')->weight('bold')->size(TextSize::Large),
                                TextEntry::make('book_code')->label('Kode Buku')->copyable()->badge()->color('gray'),
                                TextEntry::make('slug')->label('Slug')->copyable(),
                                TextEntry::make('isbn')->label('ISBN')->copyable()->placeholder('—'),
                                TextEntry::make('publication_year')->label('Tahun Terbit'),
                                TextEntry::make('number_of_pages')->label('Jumlah Halaman')->suffix(' halaman')->placeholder('—'),
                                TextEntry::make('language.language')->label('Bahasa')->badge()->color('gray')->placeholder('—'),
                                TextEntry::make('price')
                                    ->label('Harga')
                                    ->money('IDR', divideBy: 1, locale: 'id_ID')
                                    ->weight('bold')
                                    ->color('success'),
                            ])->columnSpan(2),
                        ]),

                        TextEntry::make('synopsis')
                            ->label('Sinopsis')
                            ->html()
                            ->placeholder('Tidak ada sinopsis.')
                            ->columnSpanFull(),
                    ])->columnSpanFull(),

                Section::make('Status & Tipe Resource')
                    ->icon(Heroicon::OutlinedTag)
                    ->schema([
                        Grid::make(3)->schema([
                            TextEntry::make('status')
                                ->label('Status Buku')
                                ->badge()
                                ->formatStateUsing(fn(BookStatus $state) => $state->label())
                                ->color(fn(BookStatus $state) => match ($state) {
                                    BookStatus::AVAILABLE => 'success',
                                    BookStatus::UNAVAILABLE => 'info',
                                    BookStatus::LOAN => 'warning',
                                    BookStatus::LOST, BookStatus::DAMAGED => 'danger',
                                }),

                            TextEntry::make('is_published')
                                ->label('Publikasi')
                                ->badge()
                                ->formatStateUsing(fn(PublishedBooks $state) => $state->label())
                                ->color(fn(PublishedBooks $state) => $state === PublishedBooks::PUBLISH ? 'success' : 'danger'),

                            TextEntry::make('types.type')
                                ->label('Tipe Resource')
                                ->badge()
                                ->listWithLineBreaks()
                                ->formatStateUsing(fn($state) => BookType::tryFrom((string) $state)?->label() ?? ucfirst((string) $state))
                                ->color(fn($state): string => match (BookType::tryFrom((string) $state)) {
                                    BookType::DIGITAL => 'info',
                                    BookType::FISIK => 'warning',
                                    default => 'gray',
                                })
                                ->icon(fn($state) => match (BookType::tryFrom((string) $state)) {
                                    BookType::DIGITAL => 'heroicon-s-computer-desktop',
                                    BookType::FISIK => 'heroicon-s-book-open',
                                    default => 'heroicon-s-question-mark-circle',
                                }),
                        ]),
                    ])->columnSpanFull(),

                Section::make('Penulis & Penerbit')
                    ->icon(Heroicon::OutlinedUserGroup)
                    ->schema([
                        Grid::make(2)->schema([
                            TextEntry::make('authors.name')
                                ->label('Penulis')
                                ->badge()
                                ->color('gray')
                                ->listWithLineBreaks()
                                ->placeholder('—'),

                            TextEntry::make('publisher.name')
                                ->label('Penerbit')
                                ->badge()
                                ->color('warning')
                                ->placeholder('—'),
                        ]),

                        TextEntry::make('categories.name')
                            ->label('Kategori')
                            ->badge()
                            ->color('primary')
                            ->listWithLineBreaks()
                            ->placeholder('—')
                            ->columnSpanFull(),
                    ])->columnSpanFull(),

                Section::make('Stok Buku')
                    ->icon(Heroicon::OutlinedCircleStack)
                    ->schema([
                        Grid::make(5)->schema([
                            TextEntry::make('stock.total')->label('Total')->badge()->color('gray')->placeholder('0'),
                            TextEntry::make('stock.available')->label('Tersedia')->badge()->color('success')->placeholder('0'),
                            TextEntry::make('stock.loan')->label('Dipinjam')->badge()->color('warning')->placeholder('0'),
                            TextEntry::make('stock.lost')->label('Hilang')->badge()->color('danger')->placeholder('0'),
                            TextEntry::make('stock.damaged')->label('Rusak')->badge()->color('danger')->placeholder('0'),
                        ]),
                    ])->columnSpanFull(),

                Section::make('Asset Digital')
                    ->icon(Heroicon::OutlinedDocumentText)
                    ->description('Berkas digital yang melekat pada buku (PDF, audio, dst).')
                    ->schema([
                        RepeatableEntry::make('assets')
                            ->hiddenLabel()
                            ->placeholder('Tidak ada asset digital.')
                            ->schema([
                                Grid::make(3)->schema([
                                    TextEntry::make('type')->label('Tipe')->badge()->color('info'),
                                    TextEntry::make('utility_path')->label('Berkas')->limit(50)->placeholder('—'),
                                    TextEntry::make('status')->label('Status Konversi')->badge()->placeholder('—'),
                                ]),
                            ])
                            ->columnSpanFull(),
                    ])
                    ->collapsible()
                    ->collapsed()
                    ->columnSpanFull(),

                Section::make('Meta')
                    ->icon(Heroicon::OutlinedInformationCircle)
                    ->schema([
                        Grid::make(3)->schema([
                            TextEntry::make('addedBy.name')->label('Ditambahkan oleh')->icon('heroicon-s-user'),
                            TextEntry::make('created_at')->label('Dibuat')->dateTime('d M Y H:i'),
                            TextEntry::make('updated_at')->label('Diperbarui')->dateTime('d M Y H:i'),
                        ]),
                    ])->columnSpanFull(),
            ]);
    }
}
