<?php

namespace App\Filament\Resources\Loans\Schemas;

use App\Models\Loan;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Utilities\Set;
use Filament\Schemas\Schema;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Carbon;

class LoanForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Loan Information')
                    ->description('Provide the necessary information for the loan')
                    ->schema([
                        Grid::make(2)->schema([
                            Select::make('user_id')->relationship('user', 'name', fn(Builder $query) => $query->whereDoesntHave('roles', function ($q) {
                                $q->where('name', 'admin');
                            }))->searchable()->preload()->live()->afterStateUpdated(function (Set $set, $state) {
                                if (filled($state)) {
                                    $set('loan_code', generateUniqueCode('Loan', Loan::class, 'loan_code'));
                                } else {
                                    $set('loan_code', null);
                                }
                            })->required(),
                            Select::make('book_id')->relationship('book', 'title')->searchable()->preload()->required(),
                            TextInput::make('loan_code')->readOnly()->disabled()->dehydrated()->columnSpanFull(),
                            DatePicker::make('loan_date')->live()->afterStateUpdated(function (Set $set, $state) {
                                if ($state) {
                                    $set('due_date', Carbon::parse($state)->addDays(7));
                                } else {
                                    $set('due_date', null);
                                }
                            })->required(),
                            DatePicker::make('due_date')->live()->required(),
                        ]),
                    ])->columnSpanFull(),
            ]);
    }
}
