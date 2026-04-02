<?php

namespace App\Filament\Resources\ReturnBooks;

use App\Filament\Resources\ReturnBooks\Pages\CreateReturnBooks;
use App\Filament\Resources\ReturnBooks\Pages\EditReturnBooks;
use App\Filament\Resources\ReturnBooks\Pages\ListReturnBooks;
use App\Filament\Resources\ReturnBooks\Schemas\ReturnBooksForm;
use App\Filament\Resources\ReturnBooks\Tables\ReturnBooksTable;
use App\Models\ReturnBook;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class ReturnBooksResource extends Resource
{
    protected static ?string $model = ReturnBook::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static ?string $recordTitleAttribute = 'ReturnBook';

    public static function form(Schema $schema): Schema
    {
        return ReturnBooksForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return ReturnBooksTable::configure($table);
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
            'index' => ListReturnBooks::route('/'),
            'create' => CreateReturnBooks::route('/create'),
            'edit' => EditReturnBooks::route('/{record}/edit'),
        ];
    }
}
