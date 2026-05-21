<?php

namespace App\Filament\Resources\Announcements\Tables;

use App\Enums\Days;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ForceDeleteAction;
use Filament\Actions\ForceDeleteBulkAction;
use Filament\Actions\RestoreAction;
use Filament\Actions\RestoreBulkAction;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ToggleColumn;
use Filament\Tables\Filters\TrashedFilter;
use Filament\Tables\Table;

class AnnouncementsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('photo')
                    ->label('Foto')
                    ->imageSize(60)
                    ->circular()
                    ->disk('public'),

                TextColumn::make('days')
                    ->label('Hari')
                    ->badge()
                    ->color('primary')
                    ->formatStateUsing(fn($state) => $state instanceof Days ? $state->value : $state)
                    ->sortable(),

                TextColumn::make('title')
                    ->label('Judul')
                    ->limit(40)
                    ->searchable(),

                TextColumn::make('open_time')
                    ->label('Jam Buka')
                    ->time('H:i')
                    ->icon(Heroicon::Clock),

                TextColumn::make('close_time')
                    ->label('Jam Tutup')
                    ->time('H:i')
                    ->icon(Heroicon::Clock),

                TextColumn::make('status_perpustakaan')
                    ->label('Status Sekarang')
                    ->badge()
                    ->state(function ($record): string {
                        $now = now(config('app.timezone'))->format('H:i');
                        $open = substr($record->open_time, 0, 5);
                        $close = substr($record->close_time, 0, 5);
                        $isToday = $record->days instanceof Days
                            ? $record->days === Days::today()
                            : $record->days === Days::today()->value;

                        if (!$isToday) return 'Bukan Hari Ini';
                        if ($now >= $open && $now < $close) return 'Buka';
                        return 'Tutup';
                    })
                    ->color(fn(string $state): string => match ($state) {
                        'Buka'           => 'success',
                        'Tutup'          => 'danger',
                        'Bukan Hari Ini' => 'gray',
                        default          => 'gray',
                    }),

                ToggleColumn::make('is_active')
                    ->label('Aktif')
                    ->onIcon(Heroicon::ShieldCheck)
                    ->offIcon(Heroicon::XCircle)
                    ->onColor('success')
                    ->offColor('danger'),
            ])
            ->filters([
                TrashedFilter::make(),
            ])
            ->recordActions([
                EditAction::make(),
                DeleteAction::make(),
                RestoreAction::make(),
                ForceDeleteAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    RestoreBulkAction::make(),
                    DeleteBulkAction::make(),
                    ForceDeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('days');
    }
}
