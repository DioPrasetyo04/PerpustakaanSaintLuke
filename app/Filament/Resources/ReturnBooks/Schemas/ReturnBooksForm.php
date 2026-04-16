<?php

namespace App\Filament\Resources\ReturnBooks\Schemas;

use App\Enums\BookCondition;
use App\Models\Loan;
use App\Models\ReturnBook;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\Hidden;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\ToggleButtons;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Utilities\Set;
use Filament\Schemas\Components\Wizard;
use Filament\Schemas\Components\Wizard\Step;
use Filament\Schemas\Schema;
use Illuminate\Database\Eloquent\Builder;

class ReturnBooksForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Wizard::make([
                    Step::make('Return Book Data Information')->description('All the information of the return book')->schema([
                        Section::make('Return Book  Information')->description('Provide Informations Return Book')->schema([
                            Grid::make(2)->schema([
                                Select::make('user_id')->relationship('user', 'name', function (Builder $query) {
                                    $query->whereDoesntHave('roles', function ($q) {
                                        $q->whereIn('name', ['admin', 'manager', 'writer']);
                                    });
                                })->searchable(['name', 'username', 'email', 'phone', 'address', 'date_of_birth'])->preload()->live()->label('User Name')->afterStateUpdated(function (Set $set, $state) {
                                    if (filled($state)) {
                                        $loan = Loan::query()->where('user_id', $state)->whereDoesntHave('returnBook')->with('book')->first();

                                        if ($loan) {
                                            $set('loan_id', $loan->id);
                                            $set('loan_code', $loan->loan_code);
                                            $set('book_id', $loan->book_id);
                                            $set('book_title', $loan->book->title);
                                            $set('return_book_code', generateUniqueCode('return_book', ReturnBook::class, 'return_book_code'));
                                        } else {
                                            $set('loan_id', null);
                                            $set('loan_code', null);
                                            $set('book_id', null);
                                            $set('book_title', null);
                                        }
                                    } else {
                                        $set('return_book_code', null);
                                        $set('loan_id', null);
                                        $set('loan_code', null);
                                        $set('book_id', null);
                                        $set('book_title', null);
                                        return;
                                    }
                                })->afterStateHydrated(function (Set $set, $state, $record) {

                                    if ($record) {
                                        $loan = $record->loan?->load('book');

                                        if ($loan) {
                                            $set('loan_id', $loan->id);
                                            $set('loan_code', $loan->loan_code);
                                            $set('book_id', $loan->book_id);
                                            $set('book_title', $loan->book->title);
                                            $set('return_book_code', generateUniqueCode('return_book', ReturnBook::class, 'return_book_code'));
                                        }

                                        return;
                                    }

                                    // fallback create
                                    if (filled($state)) {
                                        $loan = Loan::query()
                                            ->where('user_id', $state)
                                            ->whereDoesntHave('returnBook')
                                            ->with('book')
                                            ->first();

                                        if ($loan) {
                                            $set('loan_id', $loan->id);
                                            $set('loan_code', $loan->loan_code);
                                            $set('book_id', $loan->book_id);
                                            $set('book_title', $loan->book->title);
                                            $set('return_book_code', generateUniqueCode('return_book', ReturnBook::class, 'return_book_code'));
                                        }
                                    }
                                })->required(),
                                Hidden::make('book_id')->dehydrated(),
                                TextInput::make('book_title')->label('Book Title')->readOnly()->disabled(),
                                TextInput::make('loan_code')->label('Loan Code')->readOnly()->disabled(),
                                Hidden::make('loan_id')->dehydrated(),
                                TextInput::make('return_book_code')->label('Return Book Code')->readOnly()->disabled()->dehydrated(),
                                DatePicker::make('return_date')->label('Tanggal Pengembalian')->required()->columnSpanFull(),
                            ])
                        ])->columnSpanFull(),
                    ]),
                    Step::make('Return Book Condition Information')
                        ->description('All the information of the return book condition')
                        ->schema([
                            Section::make('Return Book Condition Information')
                                ->description('Provide Informations Return Book Condition')
                                ->relationship('returnBookCheck')
                                ->dehydrated()
                                ->schema([
                                    Grid::make(2)->schema([
                                        Select::make('condition')
                                            ->options(BookCondition::options())
                                            ->formatStateUsing(function ($state) {
                                                if (!$state || !BookCondition::tryFrom($state)) {
                                                    return null;
                                                }

                                                return BookCondition::from($state)->html();
                                            })
                                            ->native(false)
                                            ->allowHtml()
                                            ->required(),

                                        RichEditor::make('notes')
                                            ->maxLength(255)
                                            ->label('Notes Book'),
                                    ])
                                ])
                        ]),
                    Step::make('Review Book')
                        ->description('User review after reading book')
                        ->schema([
                            Section::make('Review Book')
                                ->description('User review after reading book')
                                ->dehydrated()
                                ->schema([
                                    ToggleButtons::make('rating')
                                        ->label('Rating Buku')
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
                                        ->dehydrateStateUsing(fn($state) => (float) $state)
                                        ->afterStateHydrated(function ($state, $record, $set) {
                                            if ($record && $record->review) {
                                                $set('rating', $record->review->rating);
                                            }
                                        })
                                        ->inline()
                                        ->required(),

                                    RichEditor::make('comment')
                                        ->label('Komentar')
                                        ->afterStateHydrated(function ($state, $record, $set) {
                                            if ($record && $record->review) {
                                                $set('comment', $record->review->comment);
                                            }
                                        })
                                        ->columnSpanFull(),
                                ])
                        ])
                ])->columnSpanFull()
            ]);
    }
}
