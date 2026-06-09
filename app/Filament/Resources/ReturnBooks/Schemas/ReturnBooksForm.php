<?php

namespace App\Filament\Resources\ReturnBooks\Schemas;

use App\Enums\BookCondition;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\Hidden;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\ToggleButtons;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Utilities\Get;
use Filament\Schemas\Components\Wizard;
use Filament\Schemas\Components\Wizard\Step;
use Filament\Schemas\Schema;

class ReturnBooksForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Wizard::make([
                    Step::make('Data Peminjaman')
                        ->description('Informasi peminjam dan kode peminjaman')
                        ->schema([
                            Section::make('Informasi Peminjaman')
                                ->description('Data peminjaman yang akan diproses pengembaliannya')
                                ->schema([
                                    Hidden::make('loan_id')->dehydrated(),
                                    Grid::make(2)->schema([
                                        TextInput::make('user_name')
                                            ->label('Peminjam')
                                            ->readOnly()
                                            ->disabled()
                                            ->dehydrated(false),

                                        TextInput::make('loan_code')
                                            ->label('Kode Pinjam')
                                            ->readOnly()
                                            ->disabled()
                                            ->dehydrated(false),
                                    ]),
                                ])->columnSpanFull(),
                        ]),

                    Step::make('Pengembalian Buku')
                        ->description('Hapus item jika buku belum akan dikembalikan (tetap BORROWED)')
                        ->schema([
                            Section::make('Daftar Buku')
                                ->description('Setiap buku memiliki tanggal pengembalian dan kondisi tersendiri. Hapus item dari daftar jika buku tersebut belum akan dikembalikan.')
                                ->schema([
                                    Repeater::make('returns')
                                        ->label('Buku')
                                        ->hiddenLabel()
                                        ->schema([
                                            Hidden::make('return_book_id')->dehydrated(),
                                            Hidden::make('loan_detail_id')->dehydrated(),
                                            Hidden::make('book_id')->dehydrated(),
                                            Hidden::make('has_review')->dehydrated(false),

                                            Grid::make(2)->schema([
                                                TextInput::make('book_title')
                                                    ->label('Buku')
                                                    ->readOnly()
                                                    ->disabled()
                                                    ->dehydrated(false)
                                                    ->columnSpan(2),

                                                DatePicker::make('return_date')
                                                    ->label('Tanggal Pengembalian')
                                                    ->default(now())
                                                    ->required()
                                                    ->columnSpan(1),

                                                Select::make('condition')
                                                    ->label('Kondisi Buku')
                                                    ->options(BookCondition::options())
                                                    ->formatStateUsing(function ($state) {
                                                        if (! $state || ! BookCondition::tryFrom($state)) {
                                                            return null;
                                                        }
                                                        return BookCondition::from($state)->html();
                                                    })
                                                    ->native(false)
                                                    ->allowHtml()
                                                    ->default(BookCondition::GOOD->value)
                                                    ->required()
                                                    ->columnSpan(1),

                                                RichEditor::make('notes')
                                                    ->label('Catatan Kondisi (opsional)')
                                                    ->maxLength(255)
                                                    ->columnSpanFull(),
                                            ]),

                                            Section::make('Review Buku (Opsional)')
                                                ->description('Berikan rating dan komentar untuk buku ini')
                                                ->collapsible()
                                                ->collapsed()
                                                // Sembunyikan form review jika peminjam sudah pernah
                                                // memberikan review untuk buku ini sebelumnya.
                                                ->visible(fn(Get $get): bool => ! $get('has_review'))
                                                ->schema([
                                                    ToggleButtons::make('rating')
                                                        ->label('Rating')
                                                        ->options([
                                                            '1'   => '⭐',
                                                            '1.5' => '⭐✨',
                                                            '2'   => '⭐⭐',
                                                            '2.5' => '⭐⭐✨',
                                                            '3'   => '⭐⭐⭐',
                                                            '3.5' => '⭐⭐⭐✨',
                                                            '4'   => '⭐⭐⭐⭐',
                                                            '4.5' => '⭐⭐⭐⭐✨',
                                                            '5'   => '⭐⭐⭐⭐⭐',
                                                        ])
                                                        ->inline(),

                                                    RichEditor::make('comment')
                                                        ->label('Komentar')
                                                        ->columnSpanFull(),
                                                ])->columnSpanFull(),
                                        ])
                                        ->itemLabel(fn(array $state): ?string => $state['book_title'] ?? 'Buku')
                                        ->addable(false)
                                        ->deletable()
                                        ->reorderable(false)
                                        ->collapsible()
                                        ->collapsed(false)
                                        ->minItems(1)
                                        ->columnSpanFull(),
                                ])->columnSpanFull(),
                        ]),
                ])->columnSpanFull(),
            ]);
    }
}
