<?php

namespace App\Filament\Resources\LocationOfBooks;

use App\Filament\Resources\LocationOfBooks\Pages\CreateLocationOfBook;
use App\Filament\Resources\LocationOfBooks\Pages\EditLocationOfBook;
use App\Filament\Resources\LocationOfBooks\Pages\ListLocationOfBooks;
use App\Filament\Resources\LocationOfBooks\Schemas\LocationOfBookForm;
use App\Filament\Resources\LocationOfBooks\Tables\LocationOfBooksTable;
use App\Models\LocationOfBook;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class LocationOfBookResource extends Resource
{
    protected static ?string $model = LocationOfBook::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::MapPin;

    protected static string|\UnitEnum|null $navigationGroup = 'Katalog Buku';

    protected static ?int $navigationSort = 1;

    protected static ?string $recordTitleAttribute = 'Lokasi Buku';

    protected static ?string $navigationLabel = 'Lokasi Buku';

    protected static ?string $modelLabel = 'Lokasi Buku';

    protected static ?string $pluralModelLabel = 'Lokasi Buku';

    public static function form(Schema $schema): Schema
    {
        return LocationOfBookForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return LocationOfBooksTable::configure($table);
    }

    /**
     * Eager-load relasi 'book' agar tabel tidak menghasilkan N+1 query
     * saat menampilkan kolom book.title untuk setiap baris lokasi.
     */
    public static function getEloquentQuery(): \Illuminate\Database\Eloquent\Builder
    {
        return parent::getEloquentQuery()->with('book');
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListLocationOfBooks::route('/'),
            'create' => CreateLocationOfBook::route('/create'),
            'edit' => EditLocationOfBook::route('/{record}/edit'),
        ];
    }
}
