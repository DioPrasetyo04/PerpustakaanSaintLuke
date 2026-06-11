<?php

namespace App\Filament\Resources\Loans\Tables;

use App\Enums\LoanBookStatus;
use App\Enums\LoanStatus;
use App\Enums\LoanType;
use App\Filament\Resources\ReturnBooks\ReturnBooksResource;
use App\Models\Loan;
use Filament\Actions\Action;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

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

                ImageColumn::make('user.avatar')
                    ->label('Avatar Peminjam')
                    ->disk('public')
                    ->imageSize(50)
                    ->circular()
                    ->stacked()
                    ->overlap(0)
                    ->ring(2),

                TextColumn::make('user.name')
                    ->label('Peminjam')
                    ->searchable()
                    ->sortable(),

                ImageColumn::make('physicalLoanDetails.book.cover')
                    ->label('Cover Book')
                    ->disk('public')
                    ->imageSize(50)
                    ->circular()
                    ->stacked()
                    ->overlap(0)
                    ->ring(2),

                TextColumn::make('physicalLoanDetails.book.title')
                    ->label('Buku Dipinjam')
                    ->badge()
                    ->color('info')
                    ->listWithLineBreaks()
                    ->limitList(3)
                    ->expandableLimitedList(),

                TextColumn::make('physicalLoanDetails.status')
                    ->label('Status Per Buku')
                    ->badge()
                    ->listWithLineBreaks()
                    ->limitList(3)
                    ->expandableLimitedList()
                    ->formatStateUsing(fn($state) => $state instanceof LoanBookStatus
                        ? $state->label()
                        : (LoanBookStatus::tryFrom((string) $state)?->label() ?? (string) $state))
                    ->color(fn($state) => match (LoanBookStatus::tryFrom((string) ($state instanceof \BackedEnum ? $state->value : $state))) {
                        LoanBookStatus::BORROWED => 'warning',
                        LoanBookStatus::RETURNED => 'success',
                        default => 'gray',
                    })
                    ->icon(fn($state) => match (LoanBookStatus::tryFrom((string) ($state instanceof \BackedEnum ? $state->value : $state))) {
                        LoanBookStatus::BORROWED => 'heroicon-s-book-open',
                        LoanBookStatus::RETURNED => 'heroicon-s-check-circle',
                        default => 'heroicon-s-question-mark-circle',
                    }),

                TextColumn::make('physicalLoanDetails.loan_type')
                    ->label('Tipe Pinjaman')
                    ->badge()
                    ->listWithLineBreaks()
                    ->limitList(3)
                    ->expandableLimitedList()
                    ->formatStateUsing(fn($state) => $state instanceof LoanType
                        ? $state->label()
                        : (LoanType::tryFrom((string) $state)?->label() ?? LoanType::PHYSICAL->label()))
                    ->color(fn($state) => match (LoanType::tryFrom((string) ($state instanceof \BackedEnum ? $state->value : $state)) ?? LoanType::PHYSICAL) {
                        LoanType::DIGITAL => 'info',
                        default => 'warning',
                    })
                    ->icon(fn($state) => match (LoanType::tryFrom((string) ($state instanceof \BackedEnum ? $state->value : $state)) ?? LoanType::PHYSICAL) {
                        LoanType::DIGITAL => 'heroicon-s-device-phone-mobile',
                        default => 'heroicon-s-book-open',
                    }),

                TextColumn::make('physical_loan_details_count')
                    ->counts('physicalLoanDetails')
                    ->label('Total Buku')
                    ->badge()
                    ->color('gray')
                    ->alignCenter()
                    ->sortable(),

                TextColumn::make('physicalLoanDetails.loan_date')
                    ->label('Tanggal Pinjam')
                    ->date()
                    ->badge()
                    ->color('gray')
                    ->listWithLineBreaks()
                    ->limitList(3)
                    ->expandableLimitedList(),

                TextColumn::make('physicalLoanDetails.due_date')
                    ->label('Jatuh Tempo')
                    ->date()
                    ->badge()
                    ->color('gray')
                    ->listWithLineBreaks()
                    ->limitList(3)
                    ->expandableLimitedList(),

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
            // Sembunyikan peminjaman yang seluruh bukunya digital (data tetap
            // tersimpan, hanya tidak ditampilkan). Peminjaman tanpa detail
            // sama sekali tetap tampil.
            ->modifyQueryUsing(fn(Builder $query) => $query->where(function (Builder $q) {
                $q->whereHas('physicalLoanDetails')
                    ->orWhereDoesntHave('loanDetails');
            }))
            ->filters([
                //
            ])
            ->recordActions([
                ViewAction::make(),
                EditAction::make(),
                Action::make('return_book')
                    ->label('Pengembalian Buku')
                    ->icon(Heroicon::OutlinedArrowUturnLeft)
                    ->color('success')
                    ->url(fn($record) => ReturnBooksResource::getUrl('create', ['loan_id' => $record->id]))
                    // Hanya untuk pinjaman FISIK yang belum dikembalikan. Pinjaman
                    // digital dikembalikan otomatis/oleh pengguna sendiri, jadi tidak
                    // perlu (dan tidak boleh) diproses lewat loket pengembalian staf.
                    ->visible(fn($record) => $record->loanDetails()
                        ->where(function ($q) {
                            $q->where('loan_type', '!=', LoanType::DIGITAL->value)
                                ->orWhereNull('loan_type');
                        })
                        ->whereDoesntHave('returnBook')
                        ->exists()),
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
