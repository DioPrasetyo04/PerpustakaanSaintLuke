<?php

namespace App\Filament\Resources\Visits\Tables;

use App\Enums\UserType;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\Filter;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;
use Filament\Forms\Components\DatePicker;
use Illuminate\Database\Eloquent\Builder;

class VisitsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('user.avatar')
                    ->label('Avatar')
                    ->disk('public')
                    ->imageSize(45)
                    ->circular()
                    ->defaultImageUrl(fn($record) => 'https://ui-avatars.com/api/?name=' . urlencode($record->user?->name ?? 'U') . '&background=random&color=fff'),

                TextColumn::make('user.name')
                    ->label('Nama Pengguna')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('user.email')
                    ->label('Email')
                    ->searchable()
                    ->copyable()
                    ->toggleable(),

                IconColumn::make('user.email_verified_at')
                    ->label('Verifikasi')
                    ->boolean()
                    ->trueIcon('heroicon-s-check-badge')
                    ->falseIcon('heroicon-s-x-circle')
                    ->trueColor('success')
                    ->falseColor('danger'),

                TextColumn::make('type_label')
                    ->label('Tingkat')
                    ->badge()
                    ->getStateUsing(fn($record) => $record->type === 'other'
                        ? ($record->type_other ?: 'Lainnya')
                        : ($record->type ?: '-'))
                    ->color(function ($record) {
                        $type = UserType::tryFrom((string) $record->type);
                        return $type?->badgeColor() ?? 'gray';
                    }),

                TextColumn::make('visit_date')
                    ->label('Tanggal Kunjungan')
                    ->dateTime('d M Y H:i', 'Asia/Jakarta')
                    ->sortable(),

                TextColumn::make('note')
                    ->label('Keterangan')
                    ->limit(40)
                    ->toggleable()
                    ->wrap(),
            ])
            ->defaultSort('visit_date', 'desc')
            ->filters([
                SelectFilter::make('type')
                    ->label('Tingkat Pendidikan')
                    ->options(UserType::options()),

                Filter::make('visit_date')
                    ->schema([
                        DatePicker::make('from')->label('Dari'),
                        DatePicker::make('until')->label('Sampai'),
                    ])
                    ->query(function (Builder $query, array $data): Builder {
                        return $query
                            ->when($data['from'] ?? null, fn(Builder $q, $date) => $q->whereDate('visit_date', '>=', $date))
                            ->when($data['until'] ?? null, fn(Builder $q, $date) => $q->whereDate('visit_date', '<=', $date));
                    }),
            ])
            ->recordActions([
                EditAction::make(),
                DeleteAction::make(),
            ])
            ->toolbarActions([
                DeleteBulkAction::make(),
            ]);
    }
}
