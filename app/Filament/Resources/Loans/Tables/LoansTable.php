<?php

namespace App\Filament\Resources\Loans\Tables;

use App\Enums\LoanStatus;
use App\Filament\Resources\ReturnBooks\ReturnBooksResource;
use App\Models\Loan;
use Filament\Actions\Action;
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
                TextColumn::make('loan_code')
                    ->label('Kode Pinjam')
                    ->searchable()
                    ->sortable()
                    ->copyable(),

                TextColumn::make('user.name')
                    ->label('Peminjam')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('loanDetails.book.title')
                    ->label('Buku Dipinjam')
                    ->badge()
                    ->color('info')
                    ->listWithLineBreaks()
                    ->limitList(3)
                    ->expandableLimitedList(),

                TextColumn::make('loan_details_count')
                    ->counts('loanDetails')
                    ->label('Total Buku')
                    ->badge()
                    ->color('gray')
                    ->alignCenter()
                    ->sortable(),

                TextColumn::make('loan_date')
                    ->label('Tanggal Pinjam')
                    ->date()
                    ->sortable(),

                TextColumn::make('due_date')
                    ->label('Jatuh Tempo')
                    ->date()
                    ->sortable(),

                TextColumn::make('status')
                    ->label('Status Pinjaman')
                    ->badge()
                    ->color(fn($state): string => match (self::toStatus($state)) {
                        LoanStatus::LOANED => 'warning',
                        LoanStatus::PARTIAL_RETURNED => 'info',
                        LoanStatus::RETURNED => 'success',
                        default => 'gray',
                    })
                    ->icon(fn($state) => match (self::toStatus($state)) {
                        LoanStatus::LOANED => Heroicon::OutlinedClock,
                        LoanStatus::PARTIAL_RETURNED => Heroicon::OutlinedArrowPath,
                        LoanStatus::RETURNED => Heroicon::OutlinedCheckCircle,
                        default => Heroicon::OutlinedQuestionMarkCircle,
                    })
                    ->formatStateUsing(fn($state): string => self::toStatus($state)?->label() ?? '-')
                    ->sortable(),
            ])
            ->defaultSort('created_at', 'desc')
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
                    ->visible(fn($record) => $record->loanDetails()->whereDoesntHave('returnBook')->exists()),
                DeleteAction::make()
                    ->before(function ($record) {
                        $bookIds = $record->loanDetails()
                            ->whereDoesntHave('returnBook')
                            ->pluck('book_id');
                        foreach ($bookIds as $bookId) {
                            Loan::rollbacLoanStock($bookId);
                        }
                    })
                    ->visible(fn($record) => ! $record->loanDetails()->whereHas('returnBook')->exists()),
            ])
            ->toolbarActions([
                DeleteBulkAction::make()
                    ->before(function ($records) {
                        foreach ($records as $record) {
                            $bookIds = $record->loanDetails()
                                ->whereDoesntHave('returnBook')
                                ->pluck('book_id');
                            foreach ($bookIds as $bookId) {
                                Loan::rollbacLoanStock($bookId);
                            }
                        }
                    }),
            ]);
    }

    private static function toStatus(mixed $state): ?LoanStatus
    {
        if ($state instanceof LoanStatus) {
            return $state;
        }
        if (is_string($state) || is_int($state)) {
            return LoanStatus::tryFrom((string) $state);
        }
        return null;
    }
}
