<?php

namespace App\Filament\Resources\Categories\Schemas;

use App\Models\Category;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
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

                        // NAME
                        TextInput::make('name')
                            ->label('Name Of Category')
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
                            ->label('Slug Of Category')
                            ->maxLength(255)
                            ->unique(ignoreRecord: true)
                            ->readOnly()
                            ->dehydrated()
                            ->columnSpan(1),

                        // ICON
                        FileUpload::make('icon')
                            ->label('Icon Of Categories')
                            ->image()
                            ->maxSize(1024) // 1MB
                            ->directory('categories/icons')
                            ->disk('public')
                            ->visibility('public')
                            ->columnSpanFull(),

                        // PHOTO (FULL WIDTH)
                        FileUpload::make('photo')
                            ->label('Photo Of Categories')
                            ->image()
                            ->maxSize(4096) // 4MB
                            ->disk('public')
                            ->directory('categories/images')
                            ->imageResizeMode('cover')
                            ->visibility('public')
                            ->columnSpanFull(),

                        // DESCRIPTION (FULL WIDTH)
                        RichEditor::make('description')
                            ->label('Description Of Categories')
                            ->columnSpanFull(),

                        // TOGGLE
                        Toggle::make('is_active')
                            ->label('Is Active')
                            ->onIcon('heroicon-m-check-badge')
                            ->offIcon('heroicon-m-x-circle')
                            ->default(true)
                            ->columnSpanFull(),

                    ])
                    ->columns(2), // 2 kolom utama
            ]);
    }
}
