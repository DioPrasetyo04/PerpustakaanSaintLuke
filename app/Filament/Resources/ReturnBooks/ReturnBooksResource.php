<?php

namespace App\Filament\Resources\ReturnBooks;

use App\Filament\Resources\ReturnBooks\Pages\CreateReturnBooks;
use App\Filament\Resources\ReturnBooks\Pages\EditReturnBooks;
use App\Filament\Resources\ReturnBooks\Pages\ListReturnBooks;
use App\Filament\Resources\ReturnBooks\Pages\ViewReturnBooks;
use App\Filament\Resources\ReturnBooks\Schemas\ReturnBookInfolist;
use App\Filament\Resources\ReturnBooks\Schemas\ReturnBooksForm;
use App\Filament\Resources\ReturnBooks\Tables\ReturnBooksTable;
use App\Models\Loan;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class ReturnBooksResource extends Resource
{
    protected static ?string $model = Loan::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::ArrowUturnLeft;

    protected static string|\UnitEnum|null $navigationGroup = 'Peminjaman & Pengembalian';

    protected static ?int $navigationSort = 12;

    protected static ?string $recordTitleAttribute = 'loan_code';

    protected static ?string $label = 'Return Book';

    protected static ?string $pluralLabel = 'Return Books';

    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery()
            ->whereHas('returnBooks');
    }

    public static function form(Schema $schema): Schema
    {
        return ReturnBooksForm::configure($schema);
    }

    public static function infolist(Schema $schema): Schema
    {
        return ReturnBookInfolist::configure($schema);
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
            'view' => ViewReturnBooks::route('/{record}'),
            'edit' => EditReturnBooks::route('/{record}/edit'),
        ];
    }
}
