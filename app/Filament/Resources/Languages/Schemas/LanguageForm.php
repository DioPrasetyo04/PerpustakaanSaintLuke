<?php

namespace App\Filament\Resources\Languages\Schemas;

use App\Models\Language;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Utilities\Set;
use Filament\Schemas\Schema;

class LanguageForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Informasi Bahasa')
                    ->description('Kelola bahasa beserta kode dan icon bendera-nya.')
                    ->schema([
                        Grid::make(2)->schema([
                            TextInput::make('language')
                                ->label('Nama Bahasa')
                                ->maxLength(255)
                                ->live()
                                ->afterStateUpdated(function (Set $set, $state) {
                                    if (filled($state)) {
                                        $set('code', generateUniqueCode($state, Language::class, 'code'));
                                    } else {
                                        $set('code', null);
                                    }
                                })
                                ->required()
                                ->unique(ignoreRecord: true)
                                ->columnSpan(1),

                            TextInput::make('code')
                                ->label('Kode Bahasa')
                                ->maxLength(255)
                                ->unique(ignoreRecord: true)
                                ->readOnly()
                                ->dehydrated()
                                ->columnSpan(1),

                            FileUpload::make('photo')
                                ->label('Icon / Bendera')
                                ->image()
                                ->acceptedFileTypes([
                                    'image/png',
                                    'image/jpeg',
                                    'image/svg+xml',
                                    'image/gif',
                                ])
                                ->maxSize(2048)
                                ->helperText('Format yang diperbolehkan: PNG, JPG, JPEG, SVG, GIF. Maksimal ukuran 2MB.')
                                ->directory('languages')
                                ->disk('public')
                                ->visibility('public')
                                ->columnSpanFull(),
                        ]),
                    ])->columnSpanFull(),
            ]);
    }
}
