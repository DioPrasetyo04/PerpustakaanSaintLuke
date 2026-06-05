<?php

namespace App\Filament\Resources\OnlineResources\Schemas;

use App\Enums\OnlineResourceType;
use App\Models\OnlineResource;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Utilities\Set;
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
                                ->live(onBlur: true)
                                ->maxLength(255)
                                ->required()
                                ->afterStateUpdated(function (Set $set, $state) {
                                    $set('slug', filled($state) ? generateSlug($state, OnlineResource::class) : null);
                                })
                                ->columnSpan(1),

                            TextInput::make('slug')
                                ->label('Slug')
                                ->maxLength(255)
                                ->unique(ignoreRecord: true)
                                ->readOnly()
                                ->dehydrated()
                                ->columnSpan(1),

                            Select::make('type')
                                ->label('Tipe')
                                ->options(OnlineResourceType::options())
                                ->native(false)
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

                            TextInput::make('tag')
                                ->label('Tag')
                                ->maxLength(255)
                                ->columnSpan(1),

                            Select::make('palette')
                                ->label('Palet Warna')
                                ->options(array_combine(range(0, 7), array_map(fn ($i) => "Palet {$i}", range(0, 7))))
                                ->default(0)
                                ->native(false)
                                ->columnSpan(1),

                            TextInput::make('url')
                                ->label('URL')
                                ->url()
                                ->required()
                                ->columnSpanFull(),

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
