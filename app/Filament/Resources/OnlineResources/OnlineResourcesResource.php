<?php

namespace App\Filament\Resources\OnlineResources;

use App\Filament\Resources\OnlineResources\Pages\CreateOnlineResources;
use App\Filament\Resources\OnlineResources\Pages\EditOnlineResources;
use App\Filament\Resources\OnlineResources\Pages\ListOnlineResources;
use App\Filament\Resources\OnlineResources\Schemas\OnlineResourcesForm;
use App\Filament\Resources\OnlineResources\Tables\OnlineResourcesTable;
use App\Models\OnlineResource;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class OnlineResourcesResource extends Resource
{
    protected static ?string $model = OnlineResource::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::GlobeAlt;

    protected static string|\UnitEnum|null $navigationGroup = 'Katalog Buku';

    protected static ?int $navigationSort = 6;

    protected static ?string $navigationLabel = 'Sumber Daring';

    protected static ?string $modelLabel = 'Sumber Daring';

    protected static ?string $pluralModelLabel = 'Sumber Daring';

    protected static ?string $recordTitleAttribute = 'title';

    public static function form(Schema $schema): Schema
    {
        return OnlineResourcesForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return OnlineResourcesTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListOnlineResources::route('/'),
            'create' => CreateOnlineResources::route('/create'),
            'edit' => EditOnlineResources::route('/{record}/edit'),
        ];
    }
}
