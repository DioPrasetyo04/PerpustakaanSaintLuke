<?php

namespace App\Filament\Resources\Types\Schemas;

use App\Enums\BookType;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class TypeForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Informasi Tipe Buku')
                    ->description('Pilih tipe buku dan unggah icon yang mewakilinya.')
                    ->schema([
                        Grid::make(2)->schema([
                            Select::make('type')
                                ->label('Tipe')
                                ->options(BookType::options())
                                ->allowHtml()
                                ->getOptionLabelUsing(fn($value) => BookType::from($value)->html())
                                ->native(false)
                                ->searchable()
                                ->unique(table: 'types', column: 'type', ignoreRecord: true)
                                ->required()
                                ->columnSpan(1),
                            FileUpload::make('icon')
                                ->label('Icon')
                                ->image()
                                ->acceptedFileTypes([
                                    'image/png',
                                    'image/jpeg',
                                    'image/svg+xml',
                                    'image/webp',
                                    'image/gif',
                                ])
                                ->maxSize(2048)
                                ->helperText('Format yang diperbolehkan: PNG, JPG, JPEG, SVG, WEBP, GIF. Maksimal ukuran 2MB.')
                                ->directory('types/icons')
                                ->disk('public')
                                ->visibility('public')
                                ->imageResizeMode('cover')
                                ->columnSpan(1),
                        ]),
                    ])->columnSpanFull(),
            ]);
    }
}
