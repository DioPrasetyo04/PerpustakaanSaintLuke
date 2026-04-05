<?php

namespace App\Filament\Resources\RouteAccesses\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Support\Facades\DB;

class RouteAccessesTable
{
    public static function configure(Table $table): Table
    {
        return $table

            ->columns([
                TextColumn::make('route_name')
                    ->label('Route Name')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('role.name')
                    ->label('Role')->searchable()->sortable(),

                TextColumn::make('permission.name')
                    ->label('Permissions')->searchable()->sortable(),
            ])

            ->filters([
                //
            ])

            ->recordActions([
                EditAction::make(),
            ])

            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
