<?php

namespace App\Filament\Resources\ReturnBooks\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Support\Carbon;

class ReturnBooksTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('user.avatar')->size(70)->disk('public')->visibility('public')->circular()->label('Avatar User')->alignCenter(),
                TextColumn::make('user.name')->searchable()->sortable()->label('Peminjam'),
                ImageColumn::make('book.cover')->size(70)->disk('public')->visibility('public')->circular()->label('Cover Buku Pinjaman')->alignCenter(),
                TextColumn::make('book.title')->searchable()->sortable()->label('Judul Buku Pinjaman'),
                TextColumn::make('loan.loan_date')->formatStateUsing(fn($state) => $state ? Carbon::parse($state)->format('d F Y') : null)->searchable()->sortable()->label('Tanggal Pinjam'),
                TextColumn::make('loan.due_date')->formatStateUsing(fn($state) => $state ? Carbon::parse($state)->format('d F Y') : null)->searchable()->sortable()->label('Tanggal Jatuh Tempo Pinjam'),
                TextColumn::make('return_date')->formatStateUsing(fn($state) => $state ? Carbon::parse($state)->format('d F Y') : null)->searchable()->sortable()->label('Tanggal Pengembalian'),
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
