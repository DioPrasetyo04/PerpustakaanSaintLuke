<?php

namespace App\Filament\Resources\Loans\Tables;

use App\Filament\Resources\ReturnBooks\ReturnBooksResource;
use App\Models\Loan;
use Filament\Actions\Action;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class LoansTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('loan_code')->label('Kode Pinjam')->searchable()->sortable(),
                TextColumn::make('user.name')->label('Peminjam')->searchable()->sortable(),
                TextColumn::make('book.title')->label('Buku')->searchable()->sortable(),
                TextColumn::make('loan_date')->label('Tanggal Pinjam')->searchable()->sortable(),
                TextColumn::make('due_date')->label('Tanggal Jatuh Tempo')->searchable()->sortable(),
            ])
            ->filters([
                //
            ])
            ->recordActions([
                EditAction::make(),
                Action::make('return_book')
                    ->label('Pengembalian Buku')
                    ->icon(Heroicon::OutlinedArrowUturnLeft)
                    ->color('success')
                    ->url(fn($record) => ReturnBooksResource::getUrl('create', ['user_id' => $record->user_id]))
                    ->visible(fn($record) => !$record->returnBook()->exists()),
                DeleteAction::make()
                    ->before(function ($record) {
                        if (!$record->returnBook()->exists()) {
                            Loan::rollbacLoanStock($record->book_id);
                        }
                    })
                    ->visible(fn($record) => !$record->returnBook()->exists()),
            ])
            ->toolbarActions([
                DeleteBulkAction::make()
                    ->before(function ($records) {

                        foreach ($records as $record) {
                            if (!$record->returnBook()->exists()) {
                                Loan::rollbacLoanStock($record->book_id);
                            }
                        }
                    }),
            ]);
    }
}
