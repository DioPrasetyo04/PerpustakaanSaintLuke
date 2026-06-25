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
use Filament\Tables\Filters\Filter;
use Filament\Tables\Filters\SelectFilter;
use Filament\Forms\Components\DatePicker;
use Illuminate\Database\Eloquent\Builder;
use App\Models\User;
use Illuminate\Support\HtmlString;
use Illuminate\Support\Carbon;

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

                        foreach ($loanDetails as $index => $detail) {

                            $book = $detail->book;

                            if (! $book) {
                                continue;
                            }

                            $stock = $book->stock;
                            $title = e($book->title);

                            // ── Cover / Avatar ────────────────────────────────────
                            $initial  = e(mb_strtoupper(mb_substr($book->title, 0, 1)));
                            $coverUrl = $book->cover ? asset('storage/' . $book->cover) : null;

                            if ($coverUrl) {
                                $coverHtml = "
                                <img src='{$coverUrl}'
                                     style='width:36px;height:48px;border-radius:6px;object-fit:cover;
                                            border:1px solid #e5e7eb;flex-shrink:0;'
                                     onerror=\"this.style.display='none';this.nextElementSibling.style.display='flex';\"
                                />
                                <span style='display:none;width:36px;height:48px;border-radius:6px;
                                             background:#e0e7ff;color:#3730a3;font-weight:700;
                                             font-size:16px;align-items:center;justify-content:center;
                                             flex-shrink:0;'>{$initial}</span>";
                            } else {
                                $coverHtml = "
                                <span style='display:flex;width:36px;height:48px;border-radius:6px;
                                             background:#e0e7ff;color:#3730a3;font-weight:700;
                                             font-size:16px;align-items:center;justify-content:center;
                                             flex-shrink:0;'>{$initial}</span>";
                            }

                            // ── Buku digital — tanpa stock ─────────────────────────
                            if (! $stock) {
                                $cards[] = "
                                <details style='border:1px solid #fecaca;border-radius:10px;
                                               background:#fef2f2;overflow:hidden;
                                               width:100%;min-width:190px;box-sizing:border-box;'>
                                    <summary style='padding:10px 12px;cursor:pointer;list-style:none;
                                                   display:flex;align-items:center;gap:10px;user-select:none;'
                                             onmouseover=\"this.style.background='#fee2e2'\"
                                             onmouseout=\"this.style.background=''\">
                                        {$coverHtml}
                                        <span style='font-weight:600;font-size:13px;color:#dc2626;
                                                     line-height:1.3;flex:1;min-width:0;
                                                     overflow:hidden;display:-webkit-box;
                                                     -webkit-line-clamp:2;-webkit-box-orient:vertical;'>{$title}</span>
                                        <svg style='width:12px;height:12px;color:#dc2626;flex-shrink:0;'
                                             fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                            <path stroke-linecap='round' stroke-linejoin='round'
                                                  stroke-width='2' d='M19 9l-7 7-7-7'/>
                                        </svg>
                                    </summary>
                                    <div style='padding:10px 12px;font-size:12px;color:#dc2626;
                                               font-weight:500;border-top:1px solid #fecaca;'>
                                        📱 Buku Digital — Tidak ada stok fisik
                                    </div>
                                </details>";
                                continue;
                            }

                            // ── Stock values ───────────────────────────────────────
                            $available = $stock->available;
                            $total     = $stock->total;
                            $loan      = $stock->loan;
                            $lost      = $stock->lost;
                            $damaged   = $stock->damaged;

                            $availColor  = $available > 0 ? '#15803d' : '#dc2626';
                            $availBg     = $available > 0 ? '#f0fdf4' : '#fef2f2';
                            $availBorder = $available > 0 ? '#86efac' : '#fca5a5';

                            $cards[] = "
                            <details style='border:1px solid #e5e7eb;border-radius:12px;
                                           background:#ffffff;overflow:hidden;
                                           width:100%;min-width:190px;box-sizing:border-box;
                                           box-shadow:0 1px 4px rgba(0,0,0,.08);'>
                                <summary style='padding:12px 14px;cursor:pointer;list-style:none;
                                               display:flex;align-items:center;gap:12px;user-select:none;'
                                         onmouseover=\"this.style.background='#f9fafb'\"
                                         onmouseout=\"this.style.background=''\">
                                    {$coverHtml}
                                    <span style='font-weight:600;font-size:14px;color:#111827;
                                                 line-height:1.4;flex:1;min-width:0;
                                                 overflow:hidden;display:-webkit-box;
                                                 -webkit-line-clamp:2;-webkit-box-orient:vertical;'>{$title}</span>
                                    <svg style='width:14px;height:14px;color:#9ca3af;flex-shrink:0;'
                                         fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path stroke-linecap='round' stroke-linejoin='round'
                                              stroke-width='2.5' d='M19 9l-7 7-7-7'/>
                                    </svg>
                                </summary>

                                <div style='padding:12px 14px;border-top:1px solid #f3f4f6;'>

                                    <!-- Tersedia -->
                                    <div style='background:{$availBg};border:1px solid {$availBorder};
                                               color:{$availColor};border-radius:8px;padding:9px 12px;
                                               text-align:center;margin-bottom:10px;
                                               display:flex;align-items:center;justify-content:center;gap:8px;'>
                                        <svg style='width:18px;height:18px;flex-shrink:0;' fill='none'
                                             stroke='currentColor' viewBox='0 0 24 24'>
                                            <path stroke-linecap='round' stroke-linejoin='round' stroke-width='2'
                                                  d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'/>
                                        </svg>
                                        <span style='font-size:16px;font-weight:800;letter-spacing:-.3px;'>{$available}</span>
                                        <span style='font-size:13px;font-weight:500;opacity:.8;'>/ {$total} tersedia</span>
                                    </div>

                                    <!-- Grid 3 kolom: dipinjam | hilang | rusak -->
                                    <div style='display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;'>

                                        <!-- Dipinjam -->
                                        <div style='background:#1d4ed8;color:#fff;border-radius:8px;
                                                   padding:10px 6px;text-align:center;'>
                                            <svg style='width:20px;height:20px;margin:0 auto 5px;display:block;'
                                                 fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                <path stroke-linecap='round' stroke-linejoin='round' stroke-width='1.8'
                                                      d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'/>
                                            </svg>
                                            <div style='font-size:22px;font-weight:800;line-height:1;letter-spacing:-.5px;'>{$loan}</div>
                                            <div style='font-size:11px;font-weight:500;margin-top:4px;opacity:.9;letter-spacing:.2px;'>dipinjam</div>
                                        </div>

                                        <!-- Hilang -->
                                        <div style='background:#d97706;color:#fff;border-radius:8px;
                                                   padding:10px 6px;text-align:center;'>
                                            <svg style='width:20px;height:20px;margin:0 auto 5px;display:block;'
                                                 fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                <path stroke-linecap='round' stroke-linejoin='round' stroke-width='1.8'
                                                      d='M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'/>
                                            </svg>
                                            <div style='font-size:22px;font-weight:800;line-height:1;letter-spacing:-.5px;'>{$lost}</div>
                                            <div style='font-size:11px;font-weight:500;margin-top:4px;opacity:.9;letter-spacing:.2px;'>hilang</div>
                                        </div>

                                        <!-- Rusak -->
                                        <div style='background:#dc2626;color:#fff;border-radius:8px;
                                                   padding:10px 6px;text-align:center;'>
                                            <svg style='width:20px;height:20px;margin:0 auto 5px;display:block;'
                                                 fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                <path stroke-linecap='round' stroke-linejoin='round' stroke-width='1.8'
                                                      d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'/>
                                            </svg>
                                            <div style='font-size:22px;font-weight:800;line-height:1;letter-spacing:-.5px;'>{$damaged}</div>
                                            <div style='font-size:11px;font-weight:500;margin-top:4px;opacity:.9;letter-spacing:.2px;'>rusak</div>
                                        </div>

                                    </div>
                                </div>
                            </details>";
                        }

                        if (empty($cards)) {
                            return new HtmlString('<span style="color:#9ca3af;font-size:12px;">—</span>');
                        }

                        // Kolom grid dinamis: 1, 2, atau maks 3 — tidak ada kolom kosong
                        $cols     = min(count($cards), 3);
                        $gridCols = implode(' ', array_fill(0, $cols, '1fr'));
                        $minW     = ($cols * 200) . 'px';

                        return new HtmlString(
                            "<div style='display:grid;grid-template-columns:{$gridCols};
                                         gap:8px;align-items:start;
                                         width:100%;min-width:{$minW};'>"
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
            ->groups([
                \Filament\Tables\Grouping\Group::make('user.name')
                    ->label('Peminjam')
                    ->collapsible(),
            ])
            ->defaultGroup('user.name')
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

                Filter::make('loan_date')
                    ->label('Tanggal Pinjam')
                    ->form([
                        DatePicker::make('loan_date_from')->label('Tanggal Pinjam Dari'),
                        DatePicker::make('loan_date_until')->label('Tanggal Pinjam Sampai'),
                    ])
                    ->query(function (Builder $query, array $data): Builder {
                        return $query
                            ->when($data['loan_date_from'] ?? null, fn(Builder $q, $date) => $q->whereHas('loanDetails', fn($sub) => $sub->whereDate('loan_date', '>=', $date)))
                            ->when($data['loan_date_until'] ?? null, fn(Builder $q, $date) => $q->whereHas('loanDetails', fn($sub) => $sub->whereDate('loan_date', '<=', $date)));
                    })
                    ->indicateUsing(function (array $data): array {
                        $indicators = [];
                        if ($data['loan_date_from'] ?? null) {
                            $indicators[] = 'Tanggal Pinjam Dari: ' . Carbon::parse($data['loan_date_from'])->format('d M Y');
                        }
                        if ($data['loan_date_until'] ?? null) {
                            $indicators[] = 'Tanggal Pinjam Sampai: ' . Carbon::parse($data['loan_date_until'])->format('d M Y');
                        }
                        return $indicators;
                    }),

                Filter::make('due_date')
                    ->label('Tanggal Jatuh Tempo')
                    ->form([
                        DatePicker::make('due_date_from')->label('Jatuh Tempo Dari'),
                        DatePicker::make('due_date_until')->label('Jatuh Tempo Sampai'),
                    ])
                    ->query(function (Builder $query, array $data): Builder {
                        return $query
                            ->when($data['due_date_from'] ?? null, fn(Builder $q, $date) => $q->whereHas('loanDetails', fn($sub) => $sub->whereDate('due_date', '>=', $date)))
                            ->when($data['due_date_until'] ?? null, fn(Builder $q, $date) => $q->whereHas('loanDetails', fn($sub) => $sub->whereDate('due_date', '<=', $date)));
                    })
                    ->indicateUsing(function (array $data): array {
                        $indicators = [];
                        if ($data['due_date_from'] ?? null) {
                            $indicators[] = 'Jatuh Tempo Dari: ' . Carbon::parse($data['due_date_from'])->format('d M Y');
                        }
                        if ($data['due_date_until'] ?? null) {
                            $indicators[] = 'Jatuh Tempo Sampai: ' . Carbon::parse($data['due_date_until'])->format('d M Y');
                        }
                        return $indicators;
                    }),

                SelectFilter::make('status')
                    ->label('Status Pinjaman')
                    ->options(LoanStatus::options()),
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
