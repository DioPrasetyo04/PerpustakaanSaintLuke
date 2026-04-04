<?php

namespace App\Filament\Resources\ReturnBooks\Tables;

use App\Enums\BookCondition;
use App\Models\Fine;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

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
                DeleteAction::make()
                    ->before(function ($record) {

                        $record->load(['returnBookCheck', 'book']);

                        $condition = $record->returnBookCheck?->condition;
                        $bookId = $record->book_id;

                        if ($condition) {
                            match ($condition) {
                                BookCondition::GOOD => DB::table('stocks')
                                    ->where('book_id', $bookId)
                                    ->update([
                                        'available' => DB::raw('GREATEST(available - 1,0)'),
                                        'loan' => DB::raw('loan + 1'),
                                    ]),

                                BookCondition::DAMAGED => DB::table('stocks')
                                    ->where('book_id', $bookId)
                                    ->update([
                                        'damaged' => DB::raw('GREATEST(damaged - 1,0)'),
                                        'loan' => DB::raw('loan + 1'),
                                    ]),

                                BookCondition::LOST => DB::table('stocks')
                                    ->where('book_id', $bookId)
                                    ->update([
                                        'lost' => DB::raw('GREATEST(lost - 1,0)'),
                                        'loan' => DB::raw('loan + 1'),
                                    ]),
                            };
                        }

                        // delete fine
                        Fine::where('return_book_id', $record->id)->delete();
                    })
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make()
                        ->before(function ($records) {

                            foreach ($records as $record) {

                                $record->load(['returnBookCheck', 'book']);

                                $condition = $record->returnBookCheck?->condition;
                                $bookId = $record->book_id;

                                if ($condition) {
                                    match ($condition) {
                                        BookCondition::GOOD => DB::table('stocks')
                                            ->where('book_id', $bookId)
                                            ->update([
                                                'available' => DB::raw('GREATEST(available - 1,0)'),
                                                'loan' => DB::raw('loan + 1'),
                                            ]),

                                        BookCondition::DAMAGED => DB::table('stocks')
                                            ->where('book_id', $bookId)
                                            ->update([
                                                'damaged' => DB::raw('GREATEST(damaged - 1,0)'),
                                                'loan' => DB::raw('loan + 1'),
                                            ]),

                                        BookCondition::LOST => DB::table('stocks')
                                            ->where('book_id', $bookId)
                                            ->update([
                                                'lost' => DB::raw('GREATEST(lost - 1,0)'),
                                                'loan' => DB::raw('loan + 1'),
                                            ]),
                                    };
                                }

                                // delete fine
                                Fine::where('return_book_id', $record->id)->delete();
                            }
                        })
                ]),
            ]);
    }
}
