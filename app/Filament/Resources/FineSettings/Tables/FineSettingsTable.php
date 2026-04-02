<?php

namespace App\Filament\Resources\FineSettings\Tables;

use App\Enums\DiscountType;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class FineSettingsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('late_fee_per_day')
                    ->label('Denda Per Hari')
                    ->formatStateUsing(fn($state) => moneyFormatter($state))
                    ->sortable(),

                TextColumn::make('damage_discount_type')
                    ->label('Tipe Denda Rusak')
                    ->badge()
                    ->formatStateUsing(fn(DiscountType $state) => $state->label())
                    ->icon(fn(DiscountType $state) => $state->icon())
                    ->color(fn(DiscountType $state) => $state->color()),

                TextColumn::make('damage_fee_book')
                    ->label('Denda Kerusakan')
                    ->formatStateUsing(fn($state, $record) => $record->damage_discount_type === DiscountType::PERCENTAGE
                        ? $state . '%'
                        : moneyFormatter($state))
                    ->sortable(),

                TextColumn::make('lost_discount_type')
                    ->label('Tipe Denda Hilang')
                    ->badge()
                    ->formatStateUsing(fn(DiscountType $state) => $state->label())
                    ->icon(fn(DiscountType $state) => $state->icon())
                    ->color(fn(DiscountType $state) => $state->color()),

                TextColumn::make('lost_fee_book')
                    ->label('Denda Kehilangan')
                    ->formatStateUsing(fn($state, $record) => $record->lost_discount_type === DiscountType::PERCENTAGE
                        ? $state . '%'
                        : moneyFormatter($state))
                    ->sortable(),

                TextColumn::make('updated_at')
                    ->label('Terakhir Diubah')
                    ->dateTime('d M Y, H:i')
                    ->sortable(),
            ])
            ->filters([
                //
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
