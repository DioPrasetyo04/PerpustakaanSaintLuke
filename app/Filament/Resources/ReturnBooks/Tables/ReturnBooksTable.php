<?php

namespace App\Filament\Resources\ReturnBooks\Tables;

use App\Enums\BookCondition;
use App\Enums\LoanBookStatus;
use App\Enums\PaymentStatus;
use App\Models\Fine;
use App\Models\Loan;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Notifications\Notification;
use Filament\Support\Exceptions\Halt;
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
            ->modifyQueryUsing(fn($query) => $query->with([
                'user',
                'loanDetails.book',
                'loanDetails.returnBook.returnBookCheck',
                'loanDetails.returnBook.fine',
            ]))
            ->columns([
                TextColumn::make('loan_code')
                    ->label('Kode Pinjam')
                    ->searchable()
                    ->sortable()
                    ->copyable(),

                ImageColumn::make('user.avatar')
                    ->label('Avatar Peminjam')
                    ->disk('public')
                    ->imageSize(50)
                    ->circular(),

                TextColumn::make('user.name')
                    ->label('Peminjam')
                    ->searchable()
                    ->sortable(),

                ImageColumn::make('loanDetails.book.cover')
                    ->label('Cover Buku')
                    ->disk('public')
                    ->imageSize(50)
                    ->circular()
                    ->stacked()
                    ->overlap(0)
                    ->ring(2),

                TextColumn::make('loanDetails.book.title')
                    ->label('Buku Dikembalikan')
                    ->badge()
                    ->color('info')
                    ->listWithLineBreaks()
                    ->limitList(3)
                    ->expandableLimitedList(),

                TextColumn::make('returned_books_count')
                    ->label('Total Dikembalikan')
                    ->badge()
                    ->color('success')
                    ->alignCenter()
                    ->state(fn($record) => $record->loanDetails->filter(fn($d) => $d->returnBook)->count()),

                TextColumn::make('return_dates')
                    ->label('Tanggal Pengembalian')
                    ->badge()
                    ->color('gray')
                    ->listWithLineBreaks()
                    ->limitList(3)
                    ->expandableLimitedList()
                    ->state(fn($record) => $record->loanDetails
                        ->filter(fn($d) => $d->returnBook)
                        ->map(fn($d) => $d->returnBook->return_date
                            ? Carbon::parse($d->returnBook->return_date)->format('d M Y')
                            : '-')
                        ->values()
                        ->all()),

                TextColumn::make('conditions')
                    ->label('Kondisi Buku')
                    ->badge()
                    ->listWithLineBreaks()
                    ->limitList(3)
                    ->expandableLimitedList()
                    ->state(fn($record) => $record->loanDetails
                        ->filter(fn($d) => $d->returnBook?->returnBookCheck)
                        ->map(fn($d) => $d->returnBook->returnBookCheck->condition?->value ?? '-')
                        ->values()
                        ->all())
                    ->color(fn($state) => match (BookCondition::tryFrom((string) $state)) {
                        BookCondition::GOOD => 'success',
                        BookCondition::DAMAGED => 'warning',
                        BookCondition::LOST => 'danger',
                        default => 'gray',
                    })
                    ->icon(fn($state) => match (BookCondition::tryFrom((string) $state)) {
                        BookCondition::GOOD => 'heroicon-s-check-circle',
                        BookCondition::DAMAGED => 'heroicon-s-exclamation-triangle',
                        BookCondition::LOST => 'heroicon-s-x-circle',
                        default => 'heroicon-s-question-mark-circle',
                    }),
            ])
            ->filters([
                //
            ])
            ->recordActions([
                ViewAction::make(),
                EditAction::make(),
                DeleteAction::make()
                    ->visible(fn($record) => ! self::hasAnyPaidFine($record))
                    ->before(function ($record) {

                        if (self::hasAnyPaidFine($record)) {
                            Notification::make()
                                ->title('Tidak dapat dihapus')
                                ->body('Pengembalian pada peminjaman ini memiliki denda yang sudah dibayar.')
                                ->danger()
                                ->send();

                            throw new Halt();
                        }

                        DB::transaction(function () use ($record) {
                            $record->loadMissing(['loanDetails.returnBook.returnBookCheck']);

                            foreach ($record->loanDetails as $detail) {
                                $returnBook = $detail->returnBook;
                                if (! $returnBook) continue;

                                $condition = $returnBook->returnBookCheck?->condition;
                                if ($condition) {
                                    self::rollbackStock($condition, $detail->book_id);
                                }

                                Fine::where('return_book_id', $returnBook->id)->delete();
                                $returnBook->delete();

                                $detail->update(['status' => LoanBookStatus::BORROWED]);
                            }

                            $record->recomputeStatus();
                        });

                        Notification::make()
                            ->title('Pengembalian dihapus')
                            ->body('Semua data pengembalian untuk peminjaman ini telah dihapus.')
                            ->success()
                            ->send();

                        throw new Halt();
                    })
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make()
                        ->before(function ($records) {

                            $skipped = [];

                            foreach ($records as $record) {

                                if (self::hasAnyPaidFine($record)) {
                                    $skipped[] = $record->loan_code;
                                    continue;
                                }

                                DB::transaction(function () use ($record) {
                                    $record->loadMissing(['loanDetails.returnBook.returnBookCheck']);

                                    foreach ($record->loanDetails as $detail) {
                                        $returnBook = $detail->returnBook;
                                        if (! $returnBook) continue;

                                        $condition = $returnBook->returnBookCheck?->condition;
                                        if ($condition) {
                                            self::rollbackStock($condition, $detail->book_id);
                                        }

                                        Fine::where('return_book_id', $returnBook->id)->delete();
                                        $returnBook->delete();

                                        $detail->update(['status' => LoanBookStatus::BORROWED]);
                                    }

                                    $record->recomputeStatus();
                                });
                            }

                            if (! empty($skipped)) {
                                Notification::make()
                                    ->title('Sebagian data tidak dapat dihapus')
                                    ->body('Peminjaman dengan kode berikut memiliki denda terbayar: ' . implode(', ', $skipped))
                                    ->warning()
                                    ->send();
                            }

                            throw new Halt();
                        })
                ]),
            ])
            ->defaultSort('created_at', 'desc');
    }

    protected static function hasAnyPaidFine(Loan $record): bool
    {
        $returnBookIds = $record->loanDetails
            ->pluck('returnBook.id')
            ->filter()
            ->all();

        if (empty($returnBookIds)) {
            return false;
        }

        return Fine::whereIn('return_book_id', $returnBookIds)
            ->where('payment_status', PaymentStatus::SUCCESS)
            ->exists();
    }

    protected static function rollbackStock(BookCondition $condition, int $bookId): void
    {
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
}
