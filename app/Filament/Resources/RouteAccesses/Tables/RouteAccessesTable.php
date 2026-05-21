<?php

namespace App\Filament\Resources\RouteAccesses\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Spatie\Permission\Models\Role;

class RouteAccessesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('route_name')
                    ->label('Route Name')
                    ->searchable()
                    ->sortable()
                    ->icon('heroicon-m-link')
                    ->copyable(),

                TextColumn::make('role_ids')
                    ->label('Roles')
                    ->badge()
                    ->state(fn ($record) =>
                        Role::whereIn('id', $record->role_ids ?? [])->pluck('name')->all()
                    )
                    ->color('info'),

                TextColumn::make('permission_ids')
                    ->label('Permissions')
                    ->state(fn ($record) => count($record->permission_ids ?? []) . ' permission')
                    ->badge()
                    ->color('success'),
            ])
            ->filters([])
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
