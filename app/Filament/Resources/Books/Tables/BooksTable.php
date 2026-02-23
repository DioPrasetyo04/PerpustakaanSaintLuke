<?php

namespace App\Filament\Resources\Books\Tables;

use App\Enums\BookStatus;
use App\Enums\PublishedBooks;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Actions\DeleteAction;
use Filament\Actions\ForceDeleteAction;
use Filament\Actions\RestoreAction;
use Filament\Actions\ForceDeleteBulkAction;
use Filament\Actions\RestoreBulkAction;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\TrashedFilter;
use Filament\Tables\Table;

class BooksTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('cover')->label('cover')->circular()->size(50)->label('image')->disk('public'),
                TextColumn::make('book_code')->label('book_code')->searchable()->sortable(),
                TextColumn::make('title')->label('title')->searchable()->sortable(),
                TextColumn::make('slug')->label('slug')->searchable()->sortable(),
                TextColumn::make('author.name')->label('Penulis')->searchable()->sortable(),
                TextColumn::make('publisher.name')->label('Penerbit')->searchable()->sortable(),
                TextColumn::make('publication_year')->label('Tahun Terbit')->searchable()->sortable(),
                TextColumn::make('isbn')->label('ISBN')->searchable()->sortable(),
                TextColumn::make('synopsis')->label('sinopsis')->limit(80)->wrap(),
                TextColumn::make('number_of_pages')->label('Jumlah Halaman')->searchable()->sortable(),
                TextColumn::make('price')->label('Harga')->formatStateUsing(fn($state) => RupiahFormatted($state))->searchable()->sortable(),
                TextColumn::make('status')->badge()
                    ->formatStateUsing(fn(BookStatus $state) => $state->label())
                    ->color(fn(BookStatus $state) => match ($state) {
                        BookStatus::AVAILABLE => 'success',
                        BookStatus::UNAVAILABLE => 'info',
                        BookStatus::LOAN => 'warning',
                        BookStatus::LOST => 'danger',
                        BookStatus::DAMAGED => 'danger',
                    })->icon(fn(BookStatus $state) => match ($state) {
                        BookStatus::AVAILABLE => 'heroicon-s-book-open',
                        BookStatus::UNAVAILABLE => 'heroicon-s-x-circle',
                        BookStatus::LOAN        => 'heroicon-s-arrow-right-circle',
                        BookStatus::LOST        => 'heroicon-s-exclamation-triangle',
                        BookStatus::DAMAGED     => 'heroicon-s-wrench-screwdriver',
                    })->label('Status')->searchable()->sortable(),
                TextColumn::make('is_published')->badge()
                    ->formatStateUsing(fn(PublishedBooks $state) => $state->label())
                    ->color(fn(PublishedBooks $state) => match ($state) {
                        PublishedBooks::PUBLISH => 'success',
                        PublishedBooks::UNPUBLISH => 'danger',
                    })->icon(fn(PublishedBooks $state) => match ($state) {
                        PublishedBooks::PUBLISH => 'heroicon-s-check-badge',
                        PublishedBooks::UNPUBLISH => 'heroicon-s-pencil',
                    })->label('Status')->searchable()->sortable(),
            ])
            ->filters([
                TrashedFilter::make(),
            ])
            ->recordActions([
                EditAction::make(),
                ViewAction::make(),
                DeleteAction::make(),
                ForceDeleteAction::make(),
                RestoreAction::make()
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
