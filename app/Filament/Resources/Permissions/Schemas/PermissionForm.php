<?php

namespace App\Filament\Resources\Permissions\Schemas;

use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class PermissionForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Role Information')->description('Provide the necessary information for the role')
                    ->schema([
                        Grid::make(2)->schema([
                            Repeater::make('permissions')->schema([
                                TextInput::make('name')->label('Permission Name')->formatStateUsing(fn($state) => (Str::title($state)))->dehydrateStateUsing(fn($state) => (Str::title($state)))->required(),
                                Select::make('guard_name')->label('Type Permission')->options(['web' => 'Web', 'api' => 'Api'])->required(),
                            ])->addActionLabel('Add Role')->columnSpanFull(),
                        ])->columnSpanFull(),
                    ])->columnSpanFull(),
            ]);
    }
}
