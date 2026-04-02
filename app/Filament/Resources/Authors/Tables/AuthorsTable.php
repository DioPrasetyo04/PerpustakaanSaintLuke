<?php

namespace App\Filament\Resources\Authors\Tables;

use App\Enums\UserGender;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Support\Carbon;
use Propaganistas\LaravelPhone\PhoneNumber;

class AuthorsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('avatar')->size(50)->disk('public')->visibility('public')->circular()->label('Avatar')->alignCenter(),
                TextColumn::make('name')->searchable()->sortable()->label('Nama'),
                TextColumn::make('username')->searchable()->sortable()->label('Username'),
                TextColumn::make('gender')
                    ->label('Jenis Kelamin')
                    ->searchable()
                    ->sortable()
                    ->formatStateUsing(fn($state) => UserGender::from($state)->html())
                    ->html(),
                TextColumn::make('phone')
                    ->label('Phone')
                    ->formatStateUsing(function ($state) {

                        if (!$state) return null;

                        $phone = new PhoneNumber($state);

                        $country = strtolower($phone->getCountry()); // ID
                        $flag = "https://flagcdn.com/20x15/{$country}.png";

                        return "
                            <span style='display:inline-flex;align-items:center;gap:6px'>
                                <img src='{$flag}' width='20' height='15' />
                                <span>{$phone->formatInternational()}</span>
                            </span>
                        ";
                    })
                    ->html()
                    ->searchable()
                    ->sortable(),
                TextColumn::make('nationality')
                    ->label('Country')
                    ->formatStateUsing(function ($state) {

                        if (!$state) return null;

                        $code = strtolower($state);
                        $flag = "https://flagcdn.com/w20/{$code}.png";

                        $countries = new \PragmaRX\Countries\Package\Countries();
                        $country = $countries->where('cca2', strtoupper($state))->first();

                        $name = $country?->name?->common ?? $state;

                        return "
                            <span style='display:inline-flex;align-items:center;gap:6px'>
                                <img src='{$flag}' width='20' height='15' style='border-radius:3px' />
                                <span>{$name}</span>
                            </span>
                        ";
                    })
                    ->html()
                    ->searchable()
                    ->sortable(),
                TextColumn::make('verified_at')->searchable()->sortable()->label('Diverifikasi')->formatStateUsing(fn($state) => $state ? Carbon::parse($state)->format('d F Y') : null),
            ])
            ->filters([
                //
            ])
            ->recordActions([
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
