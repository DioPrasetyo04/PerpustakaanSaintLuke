<?php

namespace App\Filament\Resources\RouteAccesses;

use App\Filament\Resources\RouteAccesses\Pages\CreateRouteAccess;
use App\Filament\Resources\RouteAccesses\Pages\EditRouteAccess;
use App\Filament\Resources\RouteAccesses\Pages\ListRouteAccesses;
use App\Filament\Resources\RouteAccesses\Schemas\RouteAccessForm;
use App\Filament\Resources\RouteAccesses\Tables\RouteAccessesTable;
use App\Models\RouteAccess;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class RouteAccessResource extends Resource
{
    protected static ?string $model = RouteAccess::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static ?string $recordTitleAttribute = 'RouteAccess';

    public static function form(Schema $schema): Schema
    {
        return RouteAccessForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return RouteAccessesTable::configure($table);
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
            'index' => ListRouteAccesses::route('/'),
            'create' => CreateRouteAccess::route('/create'),
            'edit' => EditRouteAccess::route('/{record}/edit'),
        ];
    }
}
