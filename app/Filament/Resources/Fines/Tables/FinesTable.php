<?php

namespace App\Filament\Resources\Fines\Tables;

use App\Enums\PaymentStatus;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;
use Illuminate\Support\Carbon;

class FinesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('user.avatar')
                    ->size(70)
                    ->disk('public')
                    ->visibility('public')
                    ->circular()
                    ->label('Avatar')
                    ->alignCenter(),

                TextColumn::make('user.name')
                    ->searchable()
                    ->sortable()
                    ->label('Peminjam'),

                TextColumn::make('returnBook.book.title')
                    ->searchable()
                    ->sortable()
                    ->label('Buku'),

                ImageColumn::make('returnBook.book.cover')->disk('public')->visibility('public')->size(70)->circular()->label('Cover Book'),

                TextColumn::make('returnBook.return_date')
                    ->formatStateUsing(fn($state) => $state ? Carbon::parse($state)->format('d F Y') : '-')
                    ->sortable()
                    ->label('Tanggal Pengembalian'),

                TextColumn::make('returnBook.loan.due_date')
                    ->formatStateUsing(fn($state) => $state ? Carbon::parse($state)->format('d F Y') : '-')
                    ->sortable()
                    ->label('Jatuh Tempo'),

                TextColumn::make('late_fee')
                    ->formatStateUsing(fn($state) => moneyFormatter($state))
                    ->sortable()
                    ->searchable()
                    ->color('danger')
                    ->size('md')
                    ->label('Denda Keterlambatan'),

                TextColumn::make('other_fee')
                    ->formatStateUsing(fn($state) => moneyFormatter($state))
                    ->color('danger')
                    ->size('md')
                    ->searchable()
                    ->sortable()
                    ->label('Denda Lainnya'),

                TextColumn::make('total_fee')
                    ->formatStateUsing(fn($state) => moneyFormatter($state))
                    ->sortable()
                    ->size('lg')
                    ->weight('bold')
                    ->color('danger')
                    ->label('Total Denda'),

                TextColumn::make('payment_status')
                    ->badge()
                    ->formatStateUsing(fn(PaymentStatus $state) => $state->value)
                    ->color(fn(PaymentStatus $state) => match ($state) {
                        PaymentStatus::PENDING => 'warning',
                        PaymentStatus::SUCCESS => 'success',
                        PaymentStatus::FAILED => 'danger',
                        PaymentStatus::ERROR => 'danger',
                    })
                    ->size('md')
                    ->weight('bold')
                    ->label('Status Pembayaran'),

                TextColumn::make('fine_date')
                    ->formatStateUsing(fn($state) => $state ? Carbon::parse($state)->format('d F Y') : '-')
                    ->sortable()
                    ->label('Tanggal Denda'),
            ])
            ->filters([
                SelectFilter::make('payment_status')
                    ->options(collect(PaymentStatus::cases())->mapWithKeys(fn($case) => [$case->value => $case->value])->toArray())
                    ->label('Status Pembayaran'),
            ])
            ->defaultSort('created_at', 'desc');
    }
}
