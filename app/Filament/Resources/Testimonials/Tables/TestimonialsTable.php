<?php

namespace App\Filament\Resources\Testimonials\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ToggleColumn;
use Filament\Tables\Table;

class TestimonialsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->defaultSort('sort_order')
            ->columns([
                ImageColumn::make('thumbnail')
                    ->label('Poster')
                    ->disk('public')
                    ->height(48)
                    ->defaultImageUrl(asset('assets/logos/Saint-Luke.png')),
                TextColumn::make('name')->label('Nama')->sortable()->searchable()->weight('bold')->wrap(),
                TextColumn::make('role')->label('Peran')->badge()->color('gray')->sortable()->searchable()->toggleable(),
                IconColumn::make('video')
                    ->label('Video')
                    ->boolean()
                    ->trueIcon('heroicon-o-film')
                    ->falseIcon('heroicon-o-x-circle')
                    ->getStateUsing(fn ($record) => filled($record->video)),
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
