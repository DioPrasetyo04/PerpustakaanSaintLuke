<?php

namespace App\Filament\Resources\OrganizationMembers\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ToggleColumn;
use Filament\Tables\Table;

class OrganizationMembersTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->defaultSort('sort_order')
            ->columns([
                ImageColumn::make('photo')
                    ->label('Foto')
                    ->disk('public')
                    ->circular()
                    ->defaultImageUrl(asset('assets/logos/Saint-Luke.png')),
                TextColumn::make('name')->label('Nama')->sortable()->searchable()->weight('bold')->wrap(),
                TextColumn::make('role')->label('Jabatan')->badge()->color('info')->sortable()->searchable(),
                TextColumn::make('specialization')->label('Bidang')->color('gray')->toggleable()->placeholder('—'),
                ToggleColumn::make('is_featured')->label('Sorotan')->onIcon('heroicon-m-star')->offIcon('heroicon-m-user')->sortable(),
                TextColumn::make('sort_order')->label('Urutan')->sortable()->alignCenter()->toggleable(),
                ToggleColumn::make('is_active')->label('Aktif')->onIcon('heroicon-m-check-badge')->offIcon('heroicon-m-x-circle')->sortable(),
                TextColumn::make('created_at')->label('Dibuat')->dateTime('d M Y')->sortable()->toggleable(isToggledHiddenByDefault: true),
            ])
            ->recordActions([
                EditAction::make(),
                DeleteAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
