<?php

namespace App\Filament\Resources\OnlineResources\Schemas;

use App\Enums\OnlineResourceType;
use Filament\Forms\Components\ColorPicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Utilities\Get;
use Filament\Schemas\Schema;

class OnlineResourcesForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Informasi Sumber Daring')
                    ->description('Sumber bacaan daring dari perpustakaan / mitra lain yang ditampilkan di halaman Sumber.')
                    ->schema([
                        Grid::make(2)->schema([
                            TextInput::make('title')
                                ->label('Judul')
                                ->maxLength(255)
                                ->required()
                                ->columnSpan(1),

                            Select::make('format')
                                ->label('Format Akses')
                                ->options([
                                    'Web' => 'Web (akses terbuka)',
                                    'Eksternal' => 'Eksternal (kredensial sekolah)',
                                ])
                                ->native(false)
                                ->default('Web')
                                ->columnSpan(1),

                            Select::make('type')
                                ->label('Tipe')
                                ->options(OnlineResourceType::options() + ['Lainnya' => 'Lainnya'])
                                ->native(false)
                                ->live()
                                ->required()
                                ->columnSpan(1),

                            TextInput::make('type_other')
                                ->label('Tipe Lainnya')
                                ->placeholder('Tulis tipe sumber yang diinginkan')
                                ->maxLength(255)
                                ->visible(fn(Get $get) => $get('type') === 'Lainnya')
                                ->required(fn(Get $get) => $get('type') === 'Lainnya')
                                ->columnSpan(1),

                            TextInput::make('tag')
                                ->label('Tag')
                                ->maxLength(255)
                                ->columnSpan(1),

                            ColorPicker::make('color')
                                ->label('Warna Kartu')
                                ->helperText('Warna latar kartu sumber di halaman Sumber (kode hex).')
                                ->default('#0F3D2E')
                                ->required()
                                ->columnSpan(1),

                            TextInput::make('url')
                                ->label('URL')
                                ->url()
                                ->required()
                                ->columnSpan(1),

                            Textarea::make('description')
                                ->label('Deskripsi')
                                ->rows(3)
                                ->maxLength(1000)
                                ->columnSpanFull(),

                            TextInput::make('sort_order')
                                ->label('Urutan')
                                ->numeric()
                                ->default(0)
                                ->columnSpan(1),

                            Toggle::make('is_active')
                                ->label('Aktifkan sumber ini')
                                ->onIcon('heroicon-m-check-badge')
                                ->offIcon('heroicon-m-x-circle')
                                ->default(true)
                                ->columnSpan(1),
                        ]),
                    ])->columnSpanFull(),
            ]);
    }
}
