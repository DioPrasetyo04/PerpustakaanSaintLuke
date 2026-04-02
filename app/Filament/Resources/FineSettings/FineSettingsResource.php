<?php

namespace App\Filament\Resources\FineSettings;

use App\Filament\Resources\FineSettings\Pages\CreateFineSettings;
use App\Filament\Resources\FineSettings\Pages\EditFineSettings;
use App\Filament\Resources\FineSettings\Pages\ListFineSettings;
use App\Filament\Resources\FineSettings\Schemas\FineSettingsForm;
use App\Filament\Resources\FineSettings\Tables\FineSettingsTable;
use App\Models\FineSettings;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class FineSettingsResource extends Resource
{
    protected static ?string $model = FineSettings::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedCog6Tooth;

    protected static ?string $navigationLabel = 'Pengaturan Denda';

    protected static ?string $modelLabel = 'Pengaturan Denda';

    protected static ?string $pluralModelLabel = 'Pengaturan Denda';

    // protected static ?string $navigationGroup = 'Pengaturan';

    protected static ?int $navigationSort = 1;

    public static function form(Schema $schema): Schema
    {
        return FineSettingsForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return FineSettingsTable::configure($table);
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
            'index' => ListFineSettings::route('/'),
            'create' => CreateFineSettings::route('/create'),
            'edit' => EditFineSettings::route('/{record}/edit'),
        ];
    }
}
