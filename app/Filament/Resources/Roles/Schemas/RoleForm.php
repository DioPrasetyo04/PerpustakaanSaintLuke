<?php

namespace App\Filament\Resources\Roles\Schemas;

use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Utilities\Set;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;
use Spatie\Permission\Models\Permission;

class RoleForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Role Information')->description('Provide the necessary information for the role')
                    ->schema([
                        Grid::make(2)->schema([
                            Repeater::make('roles')->schema([
                                TextInput::make('name')->label('Role Name')->formatStateUsing(fn($state) => (Str::title($state)))->dehydrateStateUsing(fn($state) => (Str::title($state)))->required(),
                                Select::make('guard_name')->label('Type Role')->options(['web' => 'Web', 'api' => 'Api'])->required(),
                                Select::make('permissions')->label('Role Permissions')->multiple()->options(Permission::pluck('name', 'id'))->required(),
                            ])->addActionLabel('Add Role')->columnSpanFull(),
                        ])->columnSpanFull(),
                    ])->columnSpanFull(),
            ]);
    }
}
