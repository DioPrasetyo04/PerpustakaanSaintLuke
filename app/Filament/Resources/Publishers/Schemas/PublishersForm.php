<?php

namespace App\Filament\Resources\Publishers\Schemas;

use App\Enums\SocialMedia;
use App\Models\Publisher;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Grid;
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
                        Grid::make(2)->schema([
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
                                ->directory('publishers/logos')
                                ->imageResizeMode('cover')
                                ->columnSpanFull(),

                            Toggle::make('is_active')
                                ->label('activate this publisher')
                                ->onIcon('heroicon-m-check-badge')
                                ->offIcon('heroicon-m-x-circle')
                                ->default(true)
                                ->columnSpanFull(),

                        ])
                    ])->columnSpanFull(),
                Section::make('Social Media')->description('Social Media Information of User')->schema([
                    Repeater::make('socialmedia')
                        ->relationship()
                        ->schema([
                            Select::make('platform')
                                ->label('Platform')
                                ->options(SocialMedia::options())
                                ->allowHtml()
                                ->getOptionLabelUsing(fn($value) => SocialMedia::from($value)->html())
                                ->searchable()
                                ->native(false)
                                ->columnSpan(1),

                            TextInput::make('url')
                                ->label('URL')
                                ->url()
                                ->columnSpan(1),

                            TextInput::make('username')
                                ->label('Username')
                                ->columnSpan(1),
                        ])
                        ->columns(3)
                        ->defaultItems(1)
                        ->minItems(1)
                        ->afterStateHydrated(function ($component, $state) {
                            if (blank($state)) {
                                $component->state([
                                    []
                                ]);
                            }
                        })
                        ->addActionLabel('Tambah Social Media')
                        ->reorderable()
                        ->collapsible()
                ])->columnSpanFull() // 2 kolom utama
            ]);
    }
}
