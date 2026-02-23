<?php

namespace App\Filament\Resources\Publishers\Schemas;

use App\Models\Publisher;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Utilities\Set;
use Filament\Schemas\Schema;
use Ysfkaya\FilamentPhoneInput\Forms\PhoneInput;

class PublishersForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([

                Section::make('Publisher Information')
                    ->description('Provide the necessary information for the publisher.')
                    ->schema([

                        // NAME
                        TextInput::make('name')
                            ->label('Name')
                            ->live()
                            ->maxLength(255)
                            ->afterStateUpdated(function (Set $set, $state) {
                                if (filled($state)) {
                                    $set('slug', generateSlug($state, Publisher::class));
                                } else {
                                    $set('slug', null);
                                }
                            })
                            ->required()
                            ->columnSpan(1),

                        // SLUG
                        TextInput::make('slug')
                            ->label('Slug')
                            ->maxLength(255)
                            ->unique(ignoreRecord: true)
                            ->readOnly()
                            ->dehydrated()
                            ->columnSpan(1),

                        TextInput::make('email')
                            ->label('Email')
                            ->email()
                            ->maxLength(255)
                            ->columnSpan(1),

                        PhoneInput::make('phone')
                            ->label('Phone')
                            ->defaultCountry('id')
                            ->separateDialCode()
                            ->showFlags()
                            ->required()
                            ->columnSpan(1),


                        Textarea::make('address')
                            ->label('Address')
                            ->maxLength(65535)
                            ->columnSpanFull(),

                        // PHOTO (FULL WIDTH)
                        FileUpload::make('logo')
                            ->label('Logo')
                            ->image()
                            ->maxSize(4096) // 4MB
                            ->disk('public')
                            ->visibility('public')
                            ->directory('Publishers/logos')
                            ->imageResizeMode('cover')
                            ->columnSpanFull(),

                        Toggle::make('is_active')
                            ->label('activate this publisher')
                            ->onIcon('heroicon-m-check-badge')
                            ->offIcon('heroicon-m-x-circle')
                            ->default(true)
                            ->columnSpanFull(),

                    ])
                    ->columns(2), // 2 kolom utama
            ]);
    }
}
