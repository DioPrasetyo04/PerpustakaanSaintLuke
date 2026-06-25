<?php

namespace App\Filament\Resources\Fines\Tables;

use App\Enums\PaymentStatus;
use App\Models\User;
use App\Services\MidtransService;
use Filament\Actions\Action;
use Filament\Forms\Components\Select;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Grouping\Group;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Carbon;
use Filament\Notifications\Notification;

class FinesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->modifyQueryUsing(fn($query) => $query
                ->with([
                    'returnBook.loanDetail.loan.user',
                    'returnBook.loanDetail.book',
                ])
                ->join(
                    'return_books',
                    'fines.return_book_id', '=', 'return_books.id'
                )
                ->join(
                    'loan_details',
                    'return_books.loan_user_id', '=', 'loan_details.id'
                )
                ->join(
                    'loans',
                    'loan_details.loan_id', '=', 'loans.id'
                )
                ->join(
                    'users',
                    'loans.user_id', '=', 'users.id'
                )
                ->select('fines.*', 'users.name as user_name')
            )
            ->columns([
                ImageColumn::make('returnBook.loanDetail.loan.user.avatar')
                    ->size(70)
                    ->disk('public')
                    ->visibility('public')
                    ->circular()
                    ->label('Avatar')
                    ->alignCenter(),

                TextColumn::make('returnBook.loanDetail.loan.user.name')
                    ->searchable()
                    ->sortable()
                    ->label('Peminjam'),

                TextColumn::make('returnBook.loanDetail.book.title')
                    ->searchable()
                    ->sortable()
                    ->label('Buku'),

                ImageColumn::make('returnBook.loanDetail.book.cover')->disk('public')->visibility('public')->size(70)->circular()->label('Cover Book'),

                TextColumn::make('returnBook.return_date')
                    ->formatStateUsing(fn($state) => $state ? Carbon::parse($state)->format('d F Y') : '-')
                    ->sortable()
                    ->label('Tanggal Pengembalian'),

                TextColumn::make('returnBook.loanDetail.due_date')
                    ->formatStateUsing(fn($state) => $state ? Carbon::parse($state)->format('d F Y') : '-')
                    ->sortable()
                    ->label('Jatuh Tempo'),

                TextColumn::make('late_fee')
                    ->formatStateUsing(fn($state) => moneyFormatter($state))
                    ->sortable()
                    ->searchable()
                    ->color('danger')
                    ->size('md')
                    ->label('Denda Keterlambatan'),

                TextColumn::make('other_fee')
                    ->formatStateUsing(fn($state) => moneyFormatter($state))
                    ->color('danger')
                    ->size('md')
                    ->searchable()
                    ->sortable()
                    ->label('Denda Lainnya'),

                TextColumn::make('total_fee')
                    ->formatStateUsing(fn($state) => moneyFormatter($state))
                    ->sortable()
                    ->size('lg')
                    ->weight('bold')
                    ->color('danger')
                    ->label('Total Denda'),

                TextColumn::make('payment_status')
                    ->badge()
                    ->formatStateUsing(fn(PaymentStatus $state) => $state->value)
                    ->color(fn(PaymentStatus $state) => match ($state) {
                        PaymentStatus::PENDING => 'warning',
                        PaymentStatus::SUCCESS => 'success',
                        PaymentStatus::FAILED  => 'danger',
                        PaymentStatus::ERROR   => 'danger',
                    })
                    ->size('md')
                    ->weight('bold')
                    ->label('Status Pembayaran'),

                TextColumn::make('fine_date')
                    ->formatStateUsing(fn($state) => $state ? Carbon::parse($state)->format('d F Y') : '-')
                    ->sortable()
                    ->label('Tanggal Denda'),
            ])
            ->groups([
                Group::make('user_name')
                    ->label('Peminjam')
                    ->collapsible(),
            ])
            ->defaultGroup('user_name')
            ->filters([
                SelectFilter::make('payment_status')
                    ->options(
                        collect(PaymentStatus::cases())
                            ->mapWithKeys(fn($case) => [$case->value => $case->value])
                            ->toArray()
                    )
                    ->label('Status Pembayaran')
                    ->placeholder('— Semua Status —'),

                SelectFilter::make('user_id')
                    ->label('Filter Peminjam')
                    ->placeholder('— Semua Peminjam —')
                    ->searchable()
                    ->preload()
                    ->native(false)
                    ->modifyFormFieldUsing(
                        fn(Select $select) => $select->allowHtml()
                    )
                    ->options(function (): array {
                        return User::query()
                            ->whereHas('loans.loanDetails.returnBook.fine')
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
                            fn(Builder $q) => $q->where('loans.user_id', $data['value'])
                        );
                    })
                    ->indicateUsing(function (array $data): ?string {
                        if (! filled($data['value'])) {
                            return null;
                        }
                        $user = User::find($data['value']);
                        return $user ? 'Peminjam: ' . $user->name : null;
                    }),
            ])
            ->recordActions([
                Action::make('pay')
                    ->label('Bayar')
                    ->icon('heroicon-o-credit-card')
                    ->color('purple')
                    ->visible(fn($record) => $record->payment_status === PaymentStatus::PENDING)
                    ->action(function ($record, $livewire) {

                        try {
                            $snapToken = MidtransService::getSnapToken($record);

                            $livewire->dispatch('midtrans-pay', snapToken: $snapToken);
                        } catch (\Exception $e) {

                            Notification::make()
                                ->title('Error Midtrans')
                                ->body($e->getMessage())
                                ->danger()
                                ->send();
                        }
                    }),
            ])
            ->defaultSort('created_at', 'desc');
    }

    /**
     * Format label opsi user untuk dropdown: nama, email, dan avatar (HTML).
     * Filament SelectFilter mendukung HTML dalam option label via allowHtml().
     */
    private static function formatUserOption(User $user): string
    {
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
