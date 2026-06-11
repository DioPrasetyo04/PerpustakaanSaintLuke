<?php

namespace App\Filament\Resources\Authors\Schemas;

use App\Enums\SocialMedia;
use App\Enums\UserGender;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Utilities\Set;
use Filament\Schemas\Components\Wizard;
use Filament\Schemas\Components\Wizard\Step;
use Filament\Schemas\Schema;
use Ysfkaya\FilamentPhoneInput\Forms\PhoneInput;

class AuthorForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Wizard::make([
                    Step::make('Data Penulis')
                        ->description('Informasi Data Penulis')
                        ->schema([
                            Section::make('Data Penulis')->description('Informasi Data Penulis')->schema([
                                Grid::make(3)->schema([
                                    TextInput::make('name')->label('Nama')->maxLength(255)->live()->afterStateUpdated(function (Set $set, $state) {
                                        if (filled($state)) {
                                            $set('username', generateUsername($state));
                                        } else {
                                            $set('username', null);
                                        }
                                    })
                                        ->afterStateHydrated(function (Set $set, $state) {
                                            if (filled($state)) {
                                                $set('username', generateUsername($state));
                                            } else {
                                                $set('username', null);
                                            }
                                        })
                                        ->required(),
                                    TextInput::make('username')->readOnly()->dehydrated(),
                                    PhoneInput::make('phone')
                                        ->label('Phone')
                                        ->defaultCountry('id')
                                        ->separateDialCode()
                                        ->showFlags(),
                                    Grid::make(2)->schema([
                                        Select::make('gender')
                                            ->label('Gender')
                                            ->options(UserGender::optionViews())
                                            ->allowHtml()
                                            ->getOptionLabelUsing(fn($value) => UserGender::from($value)->html())
                                            ->searchable(),
                                        Select::make('nationality')->label('Country')->options(countryOptions())->allowHtml()->searchable(),
                                    ])->columnSpanFull(),
                                    RichEditor::make('bio')->label('biography')->maxLength(255)->columnSpanFull(),
                                    FileUpload::make('avatar')
                                        ->label('Photo')
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
                                        ->visibility('public')
                                        ->directory('authors')
                                        ->columnSpanFull(),
                                ]),
                            ]),
                        ]),
                    Step::make('Social Media Penulis')
                        ->description('Information Social Media Penulis')
                        ->schema([
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
                                        ->required()
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
                                ->defaultItems(0)
                                ->addActionLabel('Tambah Social Media')
                                ->reorderable()
                                ->collapsible()
                        ]),
                ])->columnSpanFull()
            ]);
    }
}
