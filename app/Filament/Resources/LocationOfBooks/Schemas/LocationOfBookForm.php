<?php

namespace App\Filament\Resources\LocationOfBooks\Schemas;

use App\Models\Book;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class LocationOfBookForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Location Of Book')
                    ->description('Kelola lokasi rak/penyimpanan buku di perpustakaan.')
                    ->schema([
                        Grid::make(2)
                            ->schema([
                                TextInput::make('location')
                                    ->label('Lokasi')
                                    ->placeholder('e.g. Rak A-3, Lantai 2')
                                    ->maxLength(255)
                                    ->required()
                                    ->columnStart(1),

                                Select::make('book_id')
                                    ->label('Buku (Opsional)')
                                    ->relationship('book', 'title')
                                    ->searchable()
                                    ->preload()
                                    ->helperText(
                                        'Pilih buku yang menempati lokasi ini. Biarkan kosong untuk lokasi master.'
                                    )
                                    ->columnStart(2),
                            ]),
                    ])
                    ->columnSpanFull()
            ]);
    }
}
