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
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\HtmlString;

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

                TextColumn::make('stock.total')
                    ->label('Stock')
                    ->html()
                    ->formatStateUsing(function ($state, $record): HtmlString {
                        $total     = $record->stock->total     ?? 0;
                        $available = $record->stock->available ?? 0;
                        $loan      = $record->stock->loan      ?? 0;
                        $lost      = $record->stock->lost      ?? 0;
                        $damaged   = $record->stock->damaged   ?? 0;

                        $colorName = match (true) {
                            $total === $available                             => 'success',
                            $total === $available + $loan                    => 'warning',
                            $total === $available + $loan + $lost            => 'danger',
                            $total === $available + $loan + $lost + $damaged => 'danger',
                            default                                          => 'gray',
                        };

                        [$bgColor, $borderColor, $textColor] = match ($colorName) {
                            'success' => ['#f0fdf4', '#86efac', '#16a34a'],
                            'warning' => ['#fffbeb', '#fcd34d', '#d97706'],
                            'danger'  => ['#fef2f2', '#fca5a5', '#dc2626'],
                            default   => ['#f9fafb', '#d1d5db', '#6b7280'],
                        };

                        // Gunakan Blade::render atau views — tapi cara paling simpel:
                        // Pisahkan SVG sebagai variable terpisah dengan NOWDOC
                        $iconSvg = match ($colorName) {
                            'success' => <<<'SVG'
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
                                <path d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375Z"/>
                                <path fill-rule="evenodd" d="M3.087 9l.54 9.176A3 3 0 006.62 21h10.757a3 3 0 002.995-2.824L20.913 9H3.087ZM12 10.5a.75.75 0 01.75.75v4.94l1.72-1.72a.75.75 0 111.06 1.06l-3 3a.75.75 0 01-1.06 0l-3-3a.75.75 0 111.06-1.06l1.72 1.72v-4.94a.75.75 0 01.75-.75Z" clip-rule="evenodd"/>
                            </svg>
                            SVG,
                            'warning' => <<<'SVG'
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
                                <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3Z" clip-rule="evenodd"/>
                            </svg>
                            SVG,
                            default => <<<'SVG'
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
                                <path fill-rule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75Zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5Z" clip-rule="evenodd"/>
                            </svg>
                            SVG,
                        };

                        $bookSvg = <<<'SVG'
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#60a5fa" width="15" height="15">
                            <path d="M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v14.25a.75.75 0 001 .707A8.237 8.237 0 016 18.75c1.995 0 3.823.707 5.25 1.886V4.533ZM12.75 20.636A8.214 8.214 0 0118 18.75c.966 0 1.89.166 2.75.47a.75.75 0 001-.708V4.262a.75.75 0 00-.5-.707A9.735 9.735 0 0018 3a9.707 9.707 0 00-5.25 1.533v16.103Z"/>
                        </svg>
                        SVG;

                        $xSvg = <<<'SVG'
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#131312" width="15" height="15">
                            <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72Z" clip-rule="evenodd"/>
                        </svg>
                        SVG;

                        $html = <<<HTML
        <div style="display:inline-flex;flex-direction:column;gap:4px;">
            <div style="display:inline-flex;align-items:center;gap:5px;background:{$bgColor};border:1px solid {$borderColor};border-radius:6px;padding:3px 8px;color:{$textColor};">
                {$iconSvg}
                <span style="font-weight:700;font-size:12px;">{$available}/{$total}</span>
                <span style="font-size:11px;opacity:0.75;">tersedia</span>
            </div>
            <div style="display:inline-flex;gap:4px;">
                <div style="display:inline-flex;align-items:center;gap:3px;background:#1d4ed8;border:1px solid #93c5fd;border-radius:5px;padding:2px 6px;">
                    {$bookSvg}
                    <span style="color:#fff;font-size:11px;font-weight:500;">{$loan} dipinjam</span>
                </div>
                <div style="display:inline-flex;align-items:center;gap:3px;background:#FFCC00;border:1px solid #fcd34d;border-radius:5px;padding:2px 6px;">
                    {$xSvg}
                    <span style="color:#78350f;font-size:11px;font-weight:500;">{$lost} hilang</span>
                </div>
                <div style="display:inline-flex;align-items:center;gap:3px;background:#dc2626;border:1px solid #fca5a5;border-radius:5px;padding:2px 6px;">
                    {$xSvg}
                    <span style="color:#fff;font-size:11px;font-weight:500;">{$damaged} rusak</span>
                </div>
            </div>
        </div>
        HTML;

                        return new HtmlString($html);
                    })
                    ->sortable(),

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
                    ->formatStateUsing(fn($state) => $state > 0 ? "{$state} Dipinjam" : 'Tidak Dipinjam')
                    ->color(fn($state) => $state > 0 ? 'warning' : 'success')
                    ->icon(fn($state) => $state > 0 ? 'heroicon-s-arrow-right-circle' : 'heroicon-s-check-circle'),

                TextColumn::make('returned_loans_count')
                    ->label('Dikembalikan')
                    ->badge()
                    ->formatStateUsing(fn($state) => ((int) $state) . ' Dikembalikan')
                    ->color(fn($state) => $state > 0 ? 'info' : 'gray')
                    ->icon('heroicon-s-arrow-left-circle'),
            ])
            // Eager-load hitungan peminjaman aktif & yang sudah dikembalikan dalam
            // satu query agregat, bukan 2 query COUNT per baris (hindari N+1).
            ->modifyQueryUsing(fn(Builder $query) => $query->withCount([
                'loanDetails as active_loans_count' => fn(Builder $q) => $q->whereDoesntHave('returnBook'),
                'loanDetails as returned_loans_count' => fn(Builder $q) => $q->whereHas('returnBook'),
            ]))
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
