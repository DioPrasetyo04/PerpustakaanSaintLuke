<?php

namespace App\Filament\Resources\RouteAccesses\Schemas;

use App\Models\RouteAccess;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Utilities\Set;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RouteAccessForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Route Information')->description('Provide the necessary information for the route')
                    ->schema([
                        Grid::make(3)->schema([

                            TextInput::make('route_name')
                                ->live()
                                ->afterStateUpdated(function (Set $set, $state) {
                                    $set('route_name', Str::slug($state));
                                })
                                ->required(),

                            Select::make('role_id')
                                ->label('Role')
                                ->multiple()
                                ->options(Role::pluck('name', 'id'))
                                ->preload()
                                ->required(),

                            Select::make('permission_id')
                                ->label('Permission')
                                ->multiple()
                                ->options(Permission::pluck('name', 'id'))
                                ->preload()
                                ->required(),
                        ])
                    ])->columnSpanFull(),
            ]);
    }
}
