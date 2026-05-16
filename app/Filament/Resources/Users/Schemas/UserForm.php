<?php

namespace App\Filament\Resources\Users\Schemas;

use App\Enums\SocialMedia;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Utilities\Set;
use Filament\Schemas\Components\Wizard;
use Filament\Schemas\Components\Wizard\Step;
use Filament\Schemas\Schema;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Ysfkaya\FilamentPhoneInput\Forms\PhoneInput;

class UserForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Wizard::make([
                    Step::make('Data Users')->description('Information Profile User')
                        ->schema([
                            Section::make('Main Profile')->description('Main Profile Information Of User')->schema([
                                Grid::make(3)->schema([
                                    TextInput::make('name')->string()->minLength(3)->maxLength(255)->live()->afterStateUpdated(function (Set $set, $state) {
                                        if (filled($state)) {
                                            $set('username', generateUsername($state));
                                        } else {
                                            $set('username', null);
                                        }
                                    })->afterStateHydrated(function (Set $set, $state) {
                                        if (filled($state)) {
                                            $set('username', generateUsername($state));
                                        } else {
                                            $set('username', null);
                                        }
                                    }),
                                    TextInput::make('username')->string()->live()->unique()->readOnly()->disabled()->dehydrated(),
                                    TextInput::make('email')->email()->unique()->required(fn($operation) => $operation === 'create'),
                                ]),
                                Grid::make(2)->schema([
                                    DatePicker::make('email_verified_at')->nullable(),
                                    TextInput::make('password')->password()->revealable()->string()->required(fn($operation) => $operation === 'create')->dehydrated(fn($state) => filled($state))
                                        ->minLength(8),
                                ]),
                            ]),
                            Section::make('Addtional Profile')->description('Addtional Profile Information Of User')->schema([
                                Grid::make(2)->schema([
                                    PhoneInput::make('phone')
                                        ->label('Phone')
                                        ->defaultCountry('id')
                                        ->separateDialCode()
                                        ->showFlags()
                                        ->required(),
                                    DatePicker::make('date_of_birth')->label('Tanggal Ulang Tahun')->nullable(),
                                    Textarea::make('address')->label('Alamat')->string()->nullable(),
                                    FileUpload::make('avatar')->disk('public')->directory('users')->visibility('public')
                                ])
                            ]),
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
                                            ->required()
                                            ->native(false)
                                            ->columnSpan(1),

                                        TextInput::make('url')
                                            ->label('URL')
                                            ->required()
                                            ->url()
                                            ->columnSpan(1),

                                        TextInput::make('username')
                                            ->label('Username / Text')
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
                        ]),
                    Step::make('Roles & Permissions')->description('Information Roles & Permissions User')
                        ->schema([
                            Section::make('Give Roles & Permissions To User')->description('Roles & Permissions To Access Maintain Information & Modification Data')->schema([
                                Grid::make(2)->schema([
                                    Select::make('roles')->multiple()->relationship('roles', 'name')->preload()->nullable(),
                                    Select::make('permissions')->multiple()->relationship('permissions', 'name')->preload()->nullable(),
                                ])
                            ])
                        ]),
                ])->columnSpanFull(),
            ]);
    }
}
