<?php

namespace App\Filament\Resources\ReturnBooks\Schemas;

use App\Enums\BookCondition;
use App\Models\User;
use App\Models\Loan;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\Hidden;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\ToggleButtons;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Utilities\Get;
use Filament\Schemas\Components\Utilities\Set;
use Filament\Schemas\Components\Wizard;
use Filament\Schemas\Components\Wizard\Step;
use Filament\Schemas\Schema;
use Illuminate\Database\Eloquent\Model;

class ReturnBooksForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Wizard::make([
                    Step::make('Data Peminjaman')
                        ->description('Informasi peminjam dan kode peminjaman')
                        ->schema([
                            Section::make('Informasi Peminjaman')
                                ->description('Data peminjaman yang akan diproses pengembaliannya')
                                ->schema([
                                    Grid::make(2)->schema([
                                        Select::make('user_id')
                                            ->label('Peminjam')
                                            ->searchable()
                                            ->options(function (?Model $record) {
                                                $query = User::query();
                                                if ($record && $record->exists) {
                                                    $query->where(function ($q) use ($record) {
                                                        $q->whereHas('loans.loanDetails', fn($sub) => $sub->whereDoesntHave('returnBook'))
                                                          ->orWhere('id', $record->user_id);
                                                    });
                                                } else {
                                                    $query->whereHas('loans.loanDetails', fn($sub) => $sub->whereDoesntHave('returnBook'));
                                                }
                                                return $query->pluck('name', 'id');
                                            })
                                            ->live()
                                            ->afterStateUpdated(function (Set $set) {
                                                $set('loan_id', null);
                                                $set('returns', []);
                                            })
                                            ->required()
                                            ->disabledOn('edit'),

                                        Select::make('loan_id')
                                            ->label('Kode Pinjam')
                                            ->searchable()
                                            ->options(function (Get $get, ?Model $record) {
                                                $userId = $get('user_id');
                                                if (! $userId) {
                                                    return [];
                                                }
                                                $query = Loan::where('user_id', $userId);
                                                if ($record && $record->exists) {
                                                    $query->where(function($q) use ($record) {
                                                        $q->whereHas('loanDetails', fn($sub) => $sub->whereDoesntHave('returnBook'))
                                                          ->orWhere('id', $record->id);
                                                    });
                                                } else {
                                                    $query->whereHas('loanDetails', fn($sub) => $sub->whereDoesntHave('returnBook'));
                                                }
                                                return $query->pluck('loan_code', 'id');
                                            })
                                            ->live()
                                            ->afterStateUpdated(function ($state, Set $set) {
                                                if (! $state) {
                                                    $set('returns', []);
                                                    return;
                                                }

                                                $loan = Loan::with([
                                                    'loanDetails' => fn($query) => $query
                                                        ->physical()
                                                        ->with([
                                                            'book',
                                                            'returnBook',
                                                            'review',
                                                        ]),
                                                ])->find($state);

                                                if (! $loan) {
                                                    $set('returns', []);
                                                    return;
                                                }

                                                $returns = $loan->loanDetails
                                                    ->filter(fn($detail) => ! $detail->returnBook)
                                                    ->values()
                                                    ->map(fn($detail) => [
                                                        'loan_detail_id' => $detail->id,
                                                        'book_id' => $detail->book_id,
                                                        'book_title' => $detail->book?->title,
                                                        'return_date' => now()->toDateString(),
                                                        'condition' => BookCondition::GOOD->value,
                                                        'notes' => null,
                                                        'has_review' => false,
                                                        'rating' => null,
                                                        'comment' => null,
                                                    ])
                                                    ->all();

                                                $set('returns', $returns);
                                            })
                                            ->required()
                                            ->disabledOn('edit'),
                                    ]),
                                ])->columnSpanFull(),
                        ]),

                    Step::make('Pengembalian Buku')
                        ->description('Hapus item jika buku belum akan dikembalikan (tetap BORROWED)')
                        ->schema([
                            Section::make('Daftar Buku')
                                ->description('Setiap buku memiliki tanggal pengembalian dan kondisi tersendiri. Hapus item dari daftar jika buku tersebut belum akan dikembalikan.')
                                ->schema([
                                    Repeater::make('returns')
                                        ->label('Buku')
                                        ->hiddenLabel()
                                        ->schema([
                                            Hidden::make('return_book_id')->dehydrated(),
                                            Hidden::make('loan_detail_id')->dehydrated(),
                                            Hidden::make('book_id')->dehydrated(),
                                            Hidden::make('has_review')->dehydrated(false),

                                            Grid::make(2)->schema([
                                                TextInput::make('book_title')
                                                    ->label('Buku')
                                                    ->readOnly()
                                                    ->disabled()
                                                    ->dehydrated(false)
                                                    ->columnSpan(2),

                                                DatePicker::make('return_date')
                                                    ->label('Tanggal Pengembalian')
                                                    ->default(now())
                                                    ->required()
                                                    ->columnSpan(1),

                                                Select::make('condition')
                                                    ->label('Kondisi Buku')
                                                    ->options(BookCondition::options())
                                                    ->formatStateUsing(function ($state) {
                                                        if (! $state || ! BookCondition::tryFrom($state)) {
                                                            return null;
                                                        }
                                                        return BookCondition::from($state)->html();
                                                    })
                                                    ->native(false)
                                                    ->allowHtml()
                                                    ->default(BookCondition::GOOD->value)
                                                    ->required()
                                                    ->columnSpan(1),

                                                RichEditor::make('notes')
                                                    ->label('Catatan Kondisi (opsional)')
                                                    ->maxLength(255)
                                                    ->columnSpanFull(),
                                            ]),

                                            Section::make('Review Buku (Opsional)')
                                                ->description('Berikan rating dan komentar untuk buku ini')
                                                ->collapsible()
                                                ->collapsed()
                                                // Sembunyikan form review jika peminjam sudah pernah
                                                // memberikan review untuk buku ini sebelumnya.
                                                ->visible(fn(Get $get): bool => ! $get('has_review'))
                                                ->schema([
                                                    ToggleButtons::make('rating')
                                                        ->label('Rating')
                                                        ->options([
                                                            '1'   => '⭐',
                                                            '1.5' => '⭐✨',
                                                            '2'   => '⭐⭐',
                                                            '2.5' => '⭐⭐✨',
                                                            '3'   => '⭐⭐⭐',
                                                            '3.5' => '⭐⭐⭐✨',
                                                            '4'   => '⭐⭐⭐⭐',
                                                            '4.5' => '⭐⭐⭐⭐✨',
                                                            '5'   => '⭐⭐⭐⭐⭐',
                                                        ])
                                                        ->inline(),

                                                    RichEditor::make('comment')
                                                        ->label('Komentar')
                                                        ->columnSpanFull(),
                                                ])->columnSpanFull(),
                                        ])
                                        ->itemLabel(fn(array $state): ?string => $state['book_title'] ?? 'Buku')
                                        ->addable(false)
                                        ->deletable()
                                        ->reorderable(false)
                                        ->collapsible()
                                        ->collapsed(false)
                                        ->minItems(1)
                                        ->columnSpanFull(),
                                ])->columnSpanFull(),
                        ]),
                ])->columnSpanFull(),
            ]);
    }
}
