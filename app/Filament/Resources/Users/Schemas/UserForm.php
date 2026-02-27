<?php

namespace App\Filament\Resources\Users\Schemas;

use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Utilities\Set;
use Filament\Schemas\Components\Wizard;
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
                    Wizard\Step::make('Data Users')->description('Information Profile User')
                        ->schema([
                            Section::make('Main Profile')->description('Main Profile Information Of User')->schema([
                                Grid::make(3)->schema([
                                    TextInput::make('name')->string()->minLength(3)->maxLength(255)->live()->afterStateUpdated(function (Set $set, $state) {
                                        if (filled($state)) {
                                            $set('username', generateUsername($state));
                                        } else {
                                            $set('username', null);
                                        }
                                    }),
                                    TextInput::make('username')->string()->live()->unique()->readOnly()->disabled()->dehydrated(),
                                    TextInput::make('email')->email()->unique()->required(true),
                                ]),
                                Grid::make(2)->schema([
                                    DatePicker::make('email_verified_at')->nullable(),
                                    TextInput::make('password')->password()->revealable()->string()->required(),
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
                        ]),
                    Wizard\Step::make('Roles & Permissions')->description('Information Roles & Permissions User')
                        ->schema([
                            Section::make('Give Roles & Permissions To User')->description('Roles & Permissions To Access Maintain Information & Modification Data')->schema([
                                Grid::make(2)->schema([
                                    Select::make('roles_of_user')->multiple()->relationship('roles', 'name')->preload(),
                                    Select::make('permissions_of_user')->multiple()->relationship('permissions', 'name')->preload(),
                                ])
                            ])
                        ]),
                ])->columnSpanFull(),
            ]);
    }
}
