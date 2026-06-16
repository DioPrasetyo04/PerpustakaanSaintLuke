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
use Filament\Tables\Filters\SelectFilter;
use Illuminate\Database\Eloquent\Builder;
use App\Models\User;

class ReturnBooksTable
{
    public static function configure(Table $table): Table
    {
        return $table
            // Hanya tampilkan peminjaman yang punya buku non-digital. Data digital
            // tetap tersimpan di database, hanya tidak ikut ditampilkan.
            ->modifyQueryUsing(fn($query) => $query
                ->whereHas('physicalLoanDetails')
                ->with([
                    'user',
                    'physicalLoanDetails.book',
                    'physicalLoanDetails.returnBook.loanDetail',
                    'physicalLoanDetails.returnBook.returnBookCheck',
                    'physicalLoanDetails.returnBook.fine',
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

                ImageColumn::make('physicalLoanDetails.book.cover')
                    ->label('Cover Buku')
                    ->disk('public')
                    ->imageSize(50)
                    ->circular()
                    ->stacked()
                    ->overlap(0)
                    ->ring(2),

                TextColumn::make('physicalLoanDetails.book.title')
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
                    ->state(fn($record) => $record->physicalLoanDetails->filter(fn($d) => $d->returnBook)->count()),

                TextColumn::make('return_dates')
                    ->label('Tanggal Pengembalian')
                    ->badge()
                    ->color('gray')
                    ->listWithLineBreaks()
                    ->limitList(3)
                    ->expandableLimitedList()
                    ->state(fn($record) => $record->physicalLoanDetails
                        ->filter(fn($d) => $d->returnBook)
                        ->map(fn($d) => $d->returnBook->return_date
                            ? Carbon::parse($d->returnBook->return_date)->format('d M Y')
                            : '-')
                        ->values()
                        ->all()),
                TextColumn::make('due_dates')
                    ->label('Batas Pengembalian')
                    ->badge()
                    ->listWithLineBreaks()
                    ->limitList(3)
                    ->expandableLimitedList()
                    ->state(fn($record) => $record->physicalLoanDetails
                        ->filter(fn($d) => $d->returnBook)
                        ->map(fn($d) => $d->due_date
                            ? Carbon::parse($d->due_date)->format('d M Y')
                            : '-')
                        ->values()
                        ->all())
                    ->color('warning')
                    ->icon('heroicon-s-clock'),

                TextColumn::make('late_status')
                    ->label('Status Keterlambatan')
                    ->badge()
                    ->listWithLineBreaks()
                    ->limitList(3)
                    ->expandableLimitedList()
                    ->state(fn($record) => $record->physicalLoanDetails
                        ->filter(fn($d) => $d->returnBook)
                        ->map(function ($d) {

                            if (
                                !$d->due_date ||
                                !$d->returnBook?->return_date
                            ) {
                                return 'Tidak diketahui';
                            }

                            return Carbon::parse($d->returnBook->return_date)
                                ->greaterThan(Carbon::parse($d->due_date))
                                ? 'Terlambat'
                                : 'Tepat waktu';
                        })
                        ->values()
                        ->all())
                    ->color(fn($state) => match ($state) {
                        'Terlambat' => 'danger',
                        'Tepat waktu' => 'success',
                        default => 'gray',
                    })
                    ->icon(fn($state) => match ($state) {
                        'Terlambat' => 'heroicon-s-exclamation-triangle',
                        'Tepat waktu' => 'heroicon-s-check-circle',
                        default => 'heroicon-s-question-mark-circle',
                    }),

                TextColumn::make('conditions')
                    ->label('Kondisi Buku')
                    ->badge()
                    ->listWithLineBreaks()
                    ->limitList(3)
                    ->expandableLimitedList()
                    ->state(fn($record) => $record->physicalLoanDetails
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

                TextColumn::make('fine_values')
                    ->label('Nominal Denda')
                    ->badge()
                    ->listWithLineBreaks()
                    ->limitList(3)
                    ->expandableLimitedList()
                    ->state(fn($record) => $record->physicalLoanDetails
                        ->filter(fn($d) => $d->returnBook)
                        ->map(function ($d) {

                            $fine = $d->returnBook->fine;

                            if (! $fine || $fine->total_fee <= 0) {
                                return 'Tidak ada denda';
                            }

                            return 'Rp ' . number_format(
                                (float) $fine->total_fee,
                                0,
                                ',',
                                '.'
                            );
                        })
                        ->values()
                        ->all())
                    ->color(
                        fn($state) =>
                        str_starts_with((string) $state, 'Rp')
                            ? 'danger'
                            : 'success'
                    )
                    ->icon(
                        fn($state) =>
                        str_starts_with((string) $state, 'Rp')
                            ? 'heroicon-s-banknotes'
                            : 'heroicon-s-check-badge'
                    ),

                TextColumn::make('fine_statuses')
                    ->label('Status Denda')
                    ->badge()
                    ->listWithLineBreaks()
                    ->limitList(3)
                    ->expandableLimitedList()
                    ->state(fn($record) => $record->physicalLoanDetails
                        ->filter(fn($d) => $d->returnBook)
                        ->map(function ($d) {
                            $fine = $d->returnBook->fine;
                            if (! $fine) {
                                return 'Tidak ada denda';
                            }

                            return $fine->payment_status instanceof PaymentStatus
                                ? $fine->payment_status->name
                                : (string) $fine->payment_status;
                        })
                        ->values()
                        ->all())
                    ->color(fn($state) => match ((string) $state) {
                        'SUCCESS' => 'success',
                        'PENDING' => 'warning',
                        'FAILED', 'ERROR' => 'danger',
                        default => 'gray',
                    })
                    ->icon(fn($state) => match ((string) $state) {
                        'SUCCESS' => 'heroicon-s-check-circle',
                        'PENDING' => 'heroicon-s-clock',
                        'FAILED', 'ERROR' => 'heroicon-s-x-circle',
                        default => 'heroicon-s-minus-circle',
                    }),
            ])
            ->modifyQueryUsing(fn(Builder $query) => $query->with([
                'loanDetails.loan.user',
                'loanDetails.book.authors',
            ]))
            ->filters([
                SelectFilter::make('user_id')
                    ->label('Filter Peminjam')
                    ->placeholder('Semua Pengembalian')
                    ->searchable()
                    ->preload()
                    ->native(false)
                    ->modifyFormFieldUsing(
                        fn(\Filament\Forms\Components\Select $select) => $select->allowHtml()
                    )
                    ->options(function (): array {
                        return User::query()
                            ->whereHas('loans.loanDetails.returnBook')
                            ->orderBy('name')
                            ->get()
                            ->mapWithKeys(fn(User $user) => [
                                $user->id => self::formatUserOption($user),
                            ])
                            ->toArray();
                    })
                    ->modifyQueryUsing(function (Builder $query, array $data): Builder {
                        return $query->when(
                            filled($data['value']),
                            fn(Builder $q) => $q->whereHas(
                                'loanDetails.loan',
                                fn(Builder $lq) => $lq->where('user_id', $data['value'])
                            )
                        );
                    })
                    ->indicateUsing(function (array $data): ?string {
                        if (! filled($data['value'])) {
                            return null;
                        }
                        $user = User::find($data['value']);
                        return $user ? 'User: ' . $user->name : null;
                    }),
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
                    'available' => DB::raw('CASE WHEN available >= 1 THEN available - 1 ELSE 0 END'),
                    'loan' => DB::raw('loan + 1'),
                ]),

            BookCondition::DAMAGED => DB::table('stocks')
                ->where('book_id', $bookId)
                ->update([
                    'damaged' => DB::raw('CASE WHEN damaged >= 1 THEN damaged - 1 ELSE 0 END'),
                    'loan' => DB::raw('loan + 1'),
                ]),

            BookCondition::LOST => DB::table('stocks')
                ->where('book_id', $bookId)
                ->update([
                    'lost' => DB::raw('CASE WHEN lost >= 1 THEN lost - 1 ELSE 0 END'),
                    'loan' => DB::raw('loan + 1'),
                ]),
        };
    }

    /**
     * Format label opsi user untuk dropdown: nama, email, dan avatar (HTML).
     * Filament SelectFilter mendukung HTML dalam option label via allowHtml().
     */
    private static function formatUserOption(User $user): string
    {
        // Ikuti logika getFilamentAvatarUrl() dari model User
        if ($user->avatar) {
            $avatarUrl = asset('storage/' . $user->avatar);
        } elseif ($user->avatar_url) {
            $avatarUrl = $user->avatar_url;
        } else {
            $avatarUrl = 'https://ui-avatars.com/api/?name=' . urlencode($user->name ?? 'User') . '&background=4f46e5&color=fff&size=40';
        }

        $name     = e($user->name ?? '-');
        $email    = e($user->email ?? '');
        $username = $user->username ? '<span style="font-size:0.7rem;color:#9ca3af;">@' . e($user->username) . '</span>' : '';

        return '<div style="display:flex;align-items:center;gap:10px;padding:2px 0;">'
            . '<img src="' . $avatarUrl . '" '
            .     'style="width:34px;height:34px;border-radius:50%;object-fit:cover;flex-shrink:0;border:1px solid #e5e7eb;" '
            .     'onerror="this.src=\'https://ui-avatars.com/api/?name=' . urlencode($user->name ?? 'U') . '&background=4f46e5&color=fff&size=40\'" />'
            . '<div style="display:flex;flex-direction:column;line-height:1.4;min-width:0;">'
            .     '<span style="font-weight:600;font-size:0.875rem;color:#111827;">' . $name . '</span>'
            .     '<span style="font-size:0.75rem;color:#6b7280;">' . $email . '</span>'
            .     $username
            . '</div>'
            . '</div>';
    }
}
