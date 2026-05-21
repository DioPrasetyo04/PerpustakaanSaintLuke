<?php

namespace App\Filament\Resources\Fines;

use App\Filament\Resources\Fines\Pages\ListFines;
use App\Filament\Resources\Fines\Tables\FinesTable;
use App\Models\Fine;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class FineResource extends Resource
{
    protected static ?string $model = Fine::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::Banknotes;

    protected static ?string $navigationLabel = 'Denda';

    protected static ?string $modelLabel = 'Denda';

    protected static ?string $pluralModelLabel = 'Denda';

    protected static string|\UnitEnum|null $navigationGroup = 'Keuangan';

    protected static ?int $navigationSort = 22;

    public static function table(Table $table): Table
    {
        return FinesTable::configure($table);
    }

    public static function getPages(): array
    {
        return [
            'index' => ListFines::route('/'),
        ];
    }

    public static function canCreate(): bool
    {
        return false;
    }
}
