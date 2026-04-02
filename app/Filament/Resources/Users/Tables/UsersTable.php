<?php

namespace App\Filament\Resources\Users\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ForceDeleteAction;
use Filament\Actions\RestoreAction;
use Filament\Actions\ViewAction;
use Filament\Schemas\Components\Utilities\Set;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Support\Carbon;

class UsersTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('avatar')->size(50)->disk('public')->visibility('public')->circular(),
                TextColumn::make('name')->searchable()->sortable(),
                TextColumn::make('username')->searchable()->sortable(),
                TextColumn::make('email')->searchable()->sortable(),
                TextColumn::make('date_of_birth')->searchable()->sortable()->formatStateUsing(fn($state) => $state ? Carbon::parse($state)->format('d F Y') : null),
                TextColumn::make('roles.name')->label('Role')->searchable()->sortable()->badge()->color('success')->icon('heroicon-s-cog-8-tooth'),
                TextColumn::make('permissions.name')->label('Permissions')->searchable()->sortable()->badge()->color('warning')->icon('heroicon-s-pencil-square')
            ])
            ->filters([
                //
            ])
            ->recordActions([
                ViewAction::make(),
                EditAction::make(),
                DeleteAction::make(),
                RestoreAction::make(),
                ForceDeleteAction::make()
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
