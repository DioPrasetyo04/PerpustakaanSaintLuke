<?php

namespace App\Filament\Resources\Information\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class InformationTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('image')->label("Photo")->size(50)->circular()->disk('public')->visibility('public'),
                TextColumn::make('name')->label('Name Announcements'),
                TextColumn::make('slug')->label('Slug Announcements'),
                TextColumn::make('description')->label('Description Announcements')->formatStateUsing(fn($state) => strip_tags($state))->limit(80)->wrap(),
                TextColumn::make('category.name')->label('Category'),
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
