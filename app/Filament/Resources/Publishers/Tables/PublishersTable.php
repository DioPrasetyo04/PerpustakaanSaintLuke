<?php

namespace App\Filament\Resources\Publishers\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ForceDeleteBulkAction;
use Filament\Actions\RestoreBulkAction;
use Filament\Actions\ViewAction;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ToggleColumn;
use Filament\Tables\Filters\TrashedFilter;
use Filament\Tables\Table;
use Propaganistas\LaravelPhone\PhoneNumber;

class PublishersTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('logo')->circular()->size(50)->label('logo')->disk('public'),
                TextColumn::make('name')->label('name')->sortable()->searchable(),
                TextColumn::make('slug')->label('slug')->sortable()->searchable(),
                TextColumn::make('email')->label('email')->sortable()->searchable(),
                TextColumn::make('address')->label('address')->limit(50)->wrap()->sortable()->searchable(),
                TextColumn::make('phone')->label('phone')->html()->formatStateUsing(function ($state) {
                    if (!$state) {
                        return null;
                    }

                    try {
                        $phone = new PhoneNumber($state);
                        $country = $phone->getCountry();
                        $strtoLowerCountry = strtolower($country);

                        $flagUrl = "https://flagcdn.com/20x15/{$strtoLowerCountry}.png";

                        return "
                                <div style='display:flex;align-items:center;gap:6px'>
                                    <img src='{$flagUrl}' width='30' height='20' alt='{$country} flag' style='border-radius: 3px;' />
                                    <span>{$state}</span>
                                </div>
                            ";
                    } catch (\Exception $e) {
                        return $state;
                    }
                })->sortable()->searchable(),
                ToggleColumn::make('is_active')->label('is_active')->onIcon('heroicon-m-check-badge')->offIcon('heroicon-m-x-circle')->sortable(),
            ])
            ->filters([
                TrashedFilter::make(),
            ])
            ->recordActions([
                ViewAction::make(),
                EditAction::make(),
                DeleteAction::make(),
                ForceDeleteBulkAction::make(),
                RestoreBulkAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                    ForceDeleteBulkAction::make(),
                    RestoreBulkAction::make(),
                ]),
            ]);
    }
}
