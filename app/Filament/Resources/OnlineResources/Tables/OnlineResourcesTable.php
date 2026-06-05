<?php

namespace App\Filament\Resources\OnlineResources\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ToggleColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

class OnlineResourcesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->defaultSort('sort_order')
            ->columns([
                TextColumn::make('title')->label('Judul')->sortable()->searchable()->weight('bold')->wrap(),
                TextColumn::make('type')->label('Tipe')->badge()->sortable()->searchable(),
                TextColumn::make('format')->label('Format')->badge()->color('gray')->sortable(),
                TextColumn::make('tag')->label('Tag')->sortable()->searchable()->toggleable(),
                TextColumn::make('url')->label('URL')->limit(40)->url(fn ($record) => $record->url, true)->color('primary')->toggleable(),
                TextColumn::make('sort_order')->label('Urutan')->sortable()->alignCenter()->toggleable(),
                ToggleColumn::make('is_active')->label('Aktif')->onIcon('heroicon-m-check-badge')->offIcon('heroicon-m-x-circle')->sortable(),
            ])
            ->filters([
                SelectFilter::make('type')->label('Tipe')->options(\App\Enums\OnlineResourceType::options()),
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
