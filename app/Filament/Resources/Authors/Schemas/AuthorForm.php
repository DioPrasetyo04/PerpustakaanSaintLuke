<?php

namespace App\Filament\Resources\Authors\Schemas;

use App\Enums\SocialMedia;
use App\Enums\UserGender;
use Filament\Forms\Components\DatePicker;
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
                    Step::make('Author Data')
                        ->description('Information Author Data ')
                        ->schema([
                            Section::make('Author Information')->description('Provide the necessary information for the author books')->schema([
                                Grid::make(3)->schema([
                                    TextInput::make('name')->label('Author Name')->maxLength(255)->live()->afterStateUpdated(function (Set $set, $state) {
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
                                        ->showFlags()
                                        ->required(),
                                    Select::make('gender')
                                        ->label('Gender')
                                        ->options(UserGender::options())
                                        ->allowHtml()
                                        ->getOptionLabelUsing(fn($value) => UserGender::from($value)->html())
                                        ->searchable()
                                        ->required(),
                                    Select::make('nationality')->label('Country')->options(countryOptions())->allowHtml()->searchable()->required(),
                                    DatePicker::make('verified_at')->label('Tanggal Verifikasi')->displayFormat('d F Y'),
                                    RichEditor::make('bio')->label('biography')->maxLength(255)->columnSpanFull(),
                                    FileUpload::make('avatar')->label('Photo')->acceptedFileTypes(['jpg', 'jpeg', 'png', 'webp', 'gif'])->image()->disk('public')->visibility('public')->required()->columnSpanFull(),
                                ]),
                            ]),
                        ]),
                    Step::make('Social Media Author')
                        ->description('Information Scoial Media Author')
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
                                        ->required()
                                        ->native(false)
                                        ->columnSpan(1),

                                    TextInput::make('url')
                                        ->label('URL')
                                        ->url()
                                        ->required()
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
                        ]),
                ])->columnSpanFull()
            ]);
    }
}
