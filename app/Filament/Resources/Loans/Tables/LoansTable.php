<?php

namespace App\Filament\Resources\Loans\Tables;

use App\Enums\LoanBookStatus;
use App\Enums\LoanStatus;
use App\Enums\LoanType;
use App\Filament\Resources\ReturnBooks\ReturnBooksResource;
use App\Models\Loan;
use App\Services\DigitalAutoReturnService;
use Filament\Actions\Action;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Notifications\Notification;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Filament\Tables\Filters\SelectFilter;
use Illuminate\Database\Eloquent\Builder;
use App\Models\User;
use Illuminate\Support\HtmlString;

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

                ImageColumn::make('loanDetails.book.cover')
                    ->label('Cover Book')
                    ->disk('public')
                    ->imageSize(50)
                    ->circular()
                    ->stacked()
                    ->overlap(0)
                    ->ring(2),

                TextColumn::make('loanDetails.book.title')
                    ->label('Buku Dipinjam')
                    ->badge()
                    ->color('info')
                    ->listWithLineBreaks()
                    ->limitList(3)
                    ->expandableLimitedList(),

                TextColumn::make('id')
                    ->label('Stock')
                    ->html()
                    ->formatStateUsing(function ($state, $record): HtmlString {

                        $cards = [];

                        $loanDetails = $record->loanDetails
                            ->filter(fn($detail) => $detail->book)
                            ->unique('book_id')
                            ->values();

                        foreach ($loanDetails as $detail) {

                            $book = $detail->book;

                            if (! $book) {
                                continue;
                            }

                            $stock = $book->stock;

                            // Buku digital
                            if (! $stock) {

                                $cards[] = "
                                <div style='padding:8px;border:1px solid #fecaca;border-radius:8px;background:#fef2f2'>
                                    <div style='font-weight:600'>{$book->title}</div>
                                    <div style='color:#dc2626;font-size:12px'>
                                        Stock 0 (Buku Digital)
                                    </div>
                                </div>";

                                continue;
                            }

                            $cards[] = <<<HTML
                        <div style="
                            width:160px;
                            border:1px solid #e5e7eb;
                            border-radius:10px;
                            padding:10px;
                            background:#fff;
                        ">

                            <div style="
                                font-size:14px;
                                font-weight:700;
                                color:#111827;
                                margin-bottom:10px;
                            ">
                                {$book->title}
                            </div>

                            <div style="
                                background:#f0fdf4;
                                border:1px solid #86efac;
                                color:#16a34a;
                                border-radius:8px;
                                padding:6px;
                                text-align:center;
                                font-size:13px;
                                margin-bottom:8px;
                            ">
                                {$stock->available}/{$stock->total} tersedia
                            </div>

                            <div style="display:flex;flex-direction:column;gap:4px;">

                                <div style="
                                    background:#2563eb;
                                    color:white;
                                    border-radius:6px;
                                    padding:4px;
                                    text-align:center;
                                    font-size:12px;
                                ">
                                    {$stock->loan} dipinjam
                                </div>

                                <div style="
                                    background:#facc15;
                                    color:#78350f;
                                    border-radius:6px;
                                    padding:4px;
                                    text-align:center;
                                    font-size:12px;
                                ">
                                    {$stock->lost} hilang
                                </div>

                                <div style="
                                    background:#dc2626;
                                    color:white;
                                    border-radius:6px;
                                    padding:4px;
                                    text-align:center;
                                    font-size:12px;
                                ">
                                    {$stock->damaged} rusak
                                </div>

                            </div>

                        </div>
                        HTML;
                        }

                        return new HtmlString(
                            '<div style="display:flex;flex-direction:column;gap:8px">'
                                . implode('', $cards)
                                . '</div>'
                        );
                    }),

                TextColumn::make('loanDetails.status')
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

                TextColumn::make('loanDetails.loan_type')
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

                TextColumn::make('loan_details_count')
                    ->counts('loanDetails')
                    ->label('Total Buku')
                    ->badge()
                    ->color('gray')
                    ->alignCenter()
                    ->sortable(),

                TextColumn::make('loanDetails.loan_date')
                    ->label('Tanggal Pinjam')
                    ->date()
                    ->badge()
                    ->color('gray')
                    ->listWithLineBreaks()
                    ->limitList(3)
                    ->expandableLimitedList(),

                TextColumn::make('loanDetails.due_date')
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
            // Tampilkan semua peminjaman, termasuk yang bertipe digital. Akses
            // baca buku digital dapat ditutup admin lewat aksi "Tutup Akses".
            ->modifyQueryUsing(fn(Builder $query) => $query->with([
                'user',
                'loanDetails',
                'loanDetails.book',
                'loanDetails.book.stock',
                'loanDetails.book.authors',
                'loanDetails.returnBook',
            ]))
            ->filters([
                SelectFilter::make('user_id')
                    ->label('Filter Peminjam')
                    ->placeholder('— Semua Peminjam —')
                    ->searchable()
                    ->preload()
                    ->native(false)
                    ->modifyFormFieldUsing(
                        fn(\Filament\Forms\Components\Select $select) => $select->allowHtml()
                    )
                    ->options(function (): array {
                        return User::query()
                            ->whereHas('loans')
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
                            fn(Builder $q) => $q->where('user_id', $data['value'])
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
                Action::make('return_book')
                    ->label('Pengembalian Buku')
                    ->icon(Heroicon::OutlinedArrowUturnLeft)
                    ->color('success')
                    ->url(fn($record) => ReturnBooksResource::getUrl('create', ['loan_id' => $record->id]))
                    // Hanya untuk pinjaman FISIK yang belum dikembalikan. Pinjaman
                    // digital dikembalikan otomatis/oleh pengguna sendiri, jadi tidak
                    // perlu (dan tidak boleh) diproses lewat loket pengembalian staf.
                    // ->visible(fn($record) => $record->loanDetails()
                    //     ->where(function ($q) {
                    //         $q->where('loan_type', '!=', LoanType::DIGITAL->value)
                    //             ->orWhereNull('loan_type');
                    //     })
                    //     ->whereDoesntHave('returnBook')
                    //     ->exists()),
                    ->visible(fn($record) => $record->loanDetails()
                        ->physical()
                        ->whereDoesntHave('returnBook')
                        ->exists()),
                Action::make('revoke_digital_access')
                    ->label('Tutup Akses')
                    ->icon(Heroicon::OutlinedLockClosed)
                    ->color('danger')
                    ->requiresConfirmation()
                    ->modalHeading('Tutup Akses Buku Digital')
                    ->modalDescription('Pengguna tidak akan bisa membuka buku digital ini lagi sampai meminjam kembali. Pengembalian dicatat otomatis dengan kondisi BAIK.')
                    ->modalSubmitActionLabel('Ya, Tutup Akses')
                    // Hanya untuk pinjaman DIGITAL yang aksesnya masih aktif
                    // (belum dikembalikan). Pinjaman fisik tetap memakai tombol
                    // "Pengembalian Buku" lewat loket pengembalian staf.
                    ->visible(fn($record) => $record->loanDetails()
                        ->where('loan_type', LoanType::DIGITAL->value)
                        ->whereDoesntHave('returnBook')
                        ->exists())
                    ->action(function ($record) {
                        $details = $record->loanDetails()
                            ->where('loan_type', LoanType::DIGITAL->value)
                            ->whereDoesntHave('returnBook')
                            ->get();

                        if ($details->isEmpty()) {
                            Notification::make()
                                ->icon('heroicon-s-information-circle')
                                ->color('warning')
                                ->title('Tidak ada akses digital aktif')
                                ->body('Semua buku digital pada peminjaman ini sudah ditutup aksesnya.')
                                ->send();

                            return;
                        }

                        $service = app(DigitalAutoReturnService::class);
                        foreach ($details as $detail) {
                            $service->autoReturn($detail, 'Akses ditutup oleh admin');
                        }

                        $record->recomputeStatus();

                        Notification::make()
                            ->icon('heroicon-s-lock-closed')
                            ->color('success')
                            ->title('Akses digital ditutup')
                            ->body('Pengguna tidak dapat mengakses buku digital ini sampai meminjam kembali.')
                            ->send();
                    }),
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
