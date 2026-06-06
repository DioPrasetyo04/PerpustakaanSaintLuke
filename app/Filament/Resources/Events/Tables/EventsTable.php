<?php

namespace App\Filament\Resources\Events\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ToggleColumn;
use Filament\Tables\Table;

class EventsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->defaultSort('start_at')
            ->columns([
                ImageColumn::make('thumbnail')
                    ->label('Poster')
                    ->disk('public')
                    ->height(48)
                    ->defaultImageUrl(asset('assets/logos/Saint-Luke.png')),
                TextColumn::make('title')->label('Judul')->sortable()->searchable()->weight('bold')->wrap(),
                TextColumn::make('category')->label('Kategori')->badge()->color('info')->sortable()->searchable()->toggleable(),
                TextColumn::make('start_at')->label('Mulai')->dateTime('d M Y · H:i')->sortable(),
                TextColumn::make('location')->label('Lokasi')->searchable()->toggleable()->wrap(),
                TextColumn::make('seats_left')
                    ->label('Sisa Kursi')
                    ->state(fn ($record) => $record->capacity === null ? 'Tanpa batas' : $record->seats_left . ' kursi')
                    ->badge()
                    ->color(fn ($record) => $record->capacity !== null && $record->seats_left <= 0 ? 'danger' : 'success')
                    ->toggleable(),
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
