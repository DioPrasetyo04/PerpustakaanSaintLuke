<?php

namespace App\Filament\Resources\Books\Tables;

use App\Enums\BookStatus;
use App\Enums\BookType;
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
use Filament\Tables\Columns\ToggleColumn;
use Filament\Tables\Filters\TrashedFilter;
use Filament\Tables\Table;

class BooksTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('cover')->label('Cover')->circular()->imageSize(50)->disk('public'),
                TextColumn::make('book_code')->label('Book Code')->searchable()->sortable()->copyable(),
                TextColumn::make('location_book')
                    ->label('Lokasi Buku')
                    ->badge()
                    ->color('gray')
                    ->icon('heroicon-s-map-pin')
                    ->placeholder('Belum diatur')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('title')->label('Title')->searchable()->sortable()->limit(40)->tooltip(fn($state) => $state),
                TextColumn::make('slug')->label('Slug')->searchable()->sortable()->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('addedBy.name')->label('Added By')->searchable()->sortable(),
                TextColumn::make('authors.name')
                    ->label('Penulis')
                    ->badge()
                    ->color('gray')
                    ->listWithLineBreaks()
                    ->limitList(2)
                    ->expandableLimitedList()
                    ->searchable(),
                TextColumn::make('publisher.name')->label('Penerbit')->searchable()->sortable(),
                TextColumn::make('publication_year')->label('Tahun Terbit')->searchable()->sortable(),
                TextColumn::make('isbn')->label('ISBN')->searchable()->sortable()->toggleable(isToggledHiddenByDefault: true),

                TextColumn::make('types.type')
                    ->label('Tipe Resource')
                    ->badge()
                    ->listWithLineBreaks()
                    ->formatStateUsing(fn($state) => BookType::tryFrom((string) $state)?->label() ?? ucfirst((string) $state))
                    ->color(fn($state): string => match (BookType::tryFrom((string) $state)) {
                        BookType::DIGITAL => 'info',
                        BookType::FISIK => 'warning',
                        default => 'gray',
                    })
                    ->icon(fn($state) => match (BookType::tryFrom((string) $state)) {
                        BookType::DIGITAL => 'heroicon-s-computer-desktop',
                        BookType::FISIK => 'heroicon-s-book-open',
                        default => 'heroicon-s-question-mark-circle',
                    }),

                TextColumn::make('synopsis')->label('Sinopsis')->limit(60)->wrap()->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('number_of_pages')->label('Halaman')->numeric()->sortable()->toggleable(isToggledHiddenByDefault: true),

                TextColumn::make('price')
                    ->label('Harga')
                    ->money('IDR', divideBy: 1, locale: 'id_ID')
                    ->sortable(),

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
                    })->label('Publikasi')->searchable()->sortable(),

                ToggleColumn::make('is_spotlight')
                    ->label('Sorotan')
                    ->onIcon('heroicon-m-star')
                    ->offIcon('heroicon-m-star')
                    ->onColor('warning')
                    ->sortable()
                    ->tooltip('Jadikan buku sorotan di Beranda (hanya satu yang aktif)'),

                TextColumn::make('active_loans_count')
                    ->label('Sedang Dipinjam')
                    ->badge()
                    ->state(fn($record) => $record->loanDetails()->whereDoesntHave('returnBook')->count())
                    ->formatStateUsing(fn($state) => $state > 0 ? "{$state} Dipinjam" : 'Tidak Dipinjam')
                    ->color(fn($state) => $state > 0 ? 'warning' : 'success')
                    ->icon(fn($state) => $state > 0 ? 'heroicon-s-arrow-right-circle' : 'heroicon-s-check-circle'),

                TextColumn::make('returned_loans_count')
                    ->label('Dikembalikan')
                    ->badge()
                    ->state(fn($record) => $record->loanDetails()->whereHas('returnBook')->count())
                    ->formatStateUsing(fn($state) => "{$state} Dikembalikan")
                    ->color(fn($state) => $state > 0 ? 'info' : 'gray')
                    ->icon('heroicon-s-arrow-left-circle'),
            ])
            ->filters([
                TrashedFilter::make(),
            ])
            ->recordActions([
                ViewAction::make(),
                EditAction::make(),
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
