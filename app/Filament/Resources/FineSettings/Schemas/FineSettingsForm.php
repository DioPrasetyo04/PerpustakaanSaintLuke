<?php

namespace App\Filament\Resources\FineSettings\Schemas;

use App\Enums\DiscountType;
use Closure;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Utilities\Get;
use Filament\Schemas\Components\Utilities\Set;
use Filament\Schemas\Schema;

class FineSettingsForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Pengaturan Denda Keterlambatan')
                    ->description('Atur biaya denda untuk keterlambatan pengembalian buku per hari.')
                    ->icon('heroicon-o-clock')
                    ->schema([
                        TextInput::make('late_fee_per_day')
                            ->label('Biaya Denda Per Hari')
                            ->required()
                            ->numeric()
                            ->minValue(0)
                            ->prefix(fn(Get $get) => $get('late_discount_type') === 'percentage' ? '%' : 'Rp')
                            ->placeholder(fn(Get $get) => $get('late_discount_type') === 'percentage' ? 'Contoh: 10' : 'Contoh: 5000'),
                    ]),

                Section::make('Pengaturan Denda Kerusakan Buku')
                    ->description('Atur biaya denda untuk buku yang dikembalikan dalam kondisi rusak.')
                    ->icon('heroicon-o-exclamation-triangle')
                    ->schema([
                        Grid::make(2)->schema([
                            Select::make('damage_discount_type')
                                ->label('Tipe Perhitungan')
                                ->options(DiscountType::options())
                                ->required()
                                ->native(false)
                                ->live()
                                ->prefixIcon(fn(Get $get) => DiscountType::tryFrom($get('damage_discount_type'))?->icon())
                                ->prefixIconColor(fn(Get $get) => DiscountType::tryFrom($get('damage_discount_type'))?->color())
                                ->afterStateUpdated(fn(Set $set) => $set('damage_fee_book', null))
                                ->placeholder('Pilih tipe perhitungan'),

                            TextInput::make('damage_fee_book')
                                ->label('Biaya Denda Kerusakan')
                                ->required()
                                ->numeric()
                                ->minValue(0)
                                ->live()
                                ->prefix(fn(Get $get) => $get('damage_discount_type') === 'percentage' ? '%' : 'Rp')
                                ->placeholder(fn(Get $get) => $get('damage_discount_type') === 'percentage' ? 'Contoh: 50' : 'Contoh: 25000')
                                ->rules([
                                    fn(Get $get): Closure => function (string $attribute, $value, Closure $fail) use ($get) {
                                        if ($get('damage_discount_type') !== 'percentage') return;

                                        if ($value > 100) {
                                            $fail('Persentase denda kerusakan tidak boleh melebihi 100%.');
                                        }
                                    },
                                ]),
                        ]),
                    ]),

                Section::make('Pengaturan Denda Kehilangan Buku')
                    ->description('Atur biaya denda untuk buku yang hilang atau tidak dikembalikan.')
                    ->icon('heroicon-o-x-circle')
                    ->schema([
                        Grid::make(2)->schema([
                            Select::make('lost_discount_type')
                                ->label('Tipe Perhitungan')
                                ->options(DiscountType::options())
                                ->required()
                                ->native(false)
                                ->live()
                                ->prefixIcon(fn(Get $get) => DiscountType::tryFrom($get('lost_discount_type'))?->icon())
                                ->prefixIconColor(fn(Get $get) => DiscountType::tryFrom($get('lost_discount_type'))?->color())
                                ->afterStateUpdated(fn(Set $set) => $set('lost_fee_book', null))
                                ->placeholder('Pilih tipe perhitungan'),

                            TextInput::make('lost_fee_book')
                                ->label('Biaya Denda Kehilangan')
                                ->required()
                                ->numeric()
                                ->minValue(0)
                                ->live()
                                ->prefix(fn(Get $get) => $get('lost_discount_type') === 'percentage' ? '%' : 'Rp')
                                ->placeholder(fn(Get $get) => $get('lost_discount_type') === 'percentage' ? 'Contoh: 100' : 'Contoh: 50000')
                                ->rules([
                                    fn(Get $get): Closure => function (string $attribute, $value, Closure $fail) use ($get) {
                                        if ($get('lost_discount_type') !== 'percentage') return;

                                        if ($value > 100) {
                                            $fail('Persentase denda kehilangan tidak boleh melebihi 100%.');
                                        }
                                    },
                                ]),
                        ]),
                    ]),
                Section::make('Pengaturan Batas Peminjaman')
                    ->description('Atur batas peminjaman buku.')
                    ->icon('heroicon-o-clock')
                    ->schema([
                        TextInput::make('loan_duration_days')
                            ->label('Durasi Peminjaman')
                            ->required()
                            ->numeric()
                            ->minValue(1)
                            ->suffix('hari')
                            ->default(14),
                    ]),
            ]);
    }
}
