<?php

namespace App\Filament\Resources\Categories\Schemas;

use App\Models\Category;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Utilities\Set;
use Filament\Schemas\Schema;

class CategoriesForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([

                Section::make('Category Information')
                    ->description('Provide the necessary information for the category.')
                    ->schema([
                        Grid::make(2)->schema([

                            // NAME
                            TextInput::make('name')
                                ->label('Nama Kategori')
                                ->live()
                                ->maxLength(255)
                                ->afterStateUpdated(function (Set $set, $state) {
                                    if (filled($state)) {
                                        $set('slug', generateSlug($state, Category::class));
                                    } else {
                                        $set('slug', null);
                                    }
                                })
                                ->required()
                                ->columnSpan(1),

                            // SLUG
                            TextInput::make('slug')
                                ->label('Slug Kategori')
                                ->maxLength(255)
                                ->unique(ignoreRecord: true)
                                ->readOnly()
                                ->dehydrated()
                                ->columnSpan(1),

                            // ICON
                            FileUpload::make('icon')
                                ->label('Icon Kategori')
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
                                ->directory('categories/icons')
                                ->disk('public')
                                ->visibility('public')
                                ->columnSpanFull(),

                            // PHOTO (FULL WIDTH)
                            FileUpload::make('photo')
                                ->label('Photo Kategori')
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
                                ->disk('public')
                                ->directory('categories/images')
                                ->imageResizeMode('cover')
                                ->visibility('public')
                                ->columnSpanFull(),

                            // DESCRIPTION (FULL WIDTH)
                            RichEditor::make('description')
                                ->label('Description Kategori')
                                ->columnSpanFull(),

                            // TOGGLE
                            Toggle::make('is_active')
                                ->label('Is Active')
                                ->onIcon('heroicon-m-check-badge')
                                ->offIcon('heroicon-m-x-circle')
                                ->default(true)
                                ->columnSpanFull(),
                        ])
                    ])
                    ->columnSpanFull(), // 2 kolom utama
            ]);
    }
}
