<?php

namespace App\Filament\Resources\Users\Schemas;

use App\Enums\SocialMedia;
use App\Enums\UserType;
use App\Models\User;
use App\Notifications\AccountApprovedNotification;
use Filament\Forms\Components\CheckboxList;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Utilities\Set;
use Filament\Schemas\Components\Wizard;
use Filament\Schemas\Components\Wizard\Step;
use Filament\Schemas\Schema;
use Illuminate\Support\Facades\Auth;
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
                                        ->showFlags(),
                                    DatePicker::make('date_of_birth')->label('Tanggal Ulang Tahun')->nullable(),
                                    Textarea::make('address')->label('Alamat')->string()->nullable(),
                                    FileUpload::make('avatar')
                                        ->disk('public')
                                        ->directory('users')
                                        ->visibility('public')
                                        ->image()
                                        // Hanya gambar: jpg, jpeg, png, svg, gif. Selain itu ditolak.
                                        ->acceptedFileTypes([
                                            'image/jpeg',
                                            'image/png',
                                            'image/svg+xml',
                                            'image/gif',
                                        ])
                                        // Maksimal ukuran file 2MB (nilai dalam kilobita).
                                        ->maxSize(2048),
                                    Select::make('type')
                                        ->label('Tingkat Pendidikan')
                                        ->options(UserType::options())
                                        ->native(false)
                                        ->searchable()
                                        ->live()
                                        ->placeholder('Pilih tingkat pendidikan')
                                        ->afterStateUpdated(function (Set $set, $state) {
                                            if ($state !== UserType::OTHER->value) {
                                                $set('type_other', null);
                                            }
                                        })
                                        ->columnSpanFull(),
                                    TextInput::make('type_other')
                                        ->label('Jabatan lainnya')
                                        ->placeholder('Tulis jabatan lainnya')
                                        ->maxLength(100)
                                        ->columnSpanFull()
                                        ->visible(fn(\Filament\Schemas\Components\Utilities\Get $get) => $get('type') === UserType::OTHER->value)
                                        ->required(fn(\Filament\Schemas\Components\Utilities\Get $get) => $get('type') === UserType::OTHER->value),
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
                                            ->native(false)
                                            // Wajib hanya bila baris ditambahkan; social media
                                            // secara keseluruhan tetap opsional (lihat defaultItems 0).
                                            ->required()
                                            ->columnSpan(1),

                                        TextInput::make('url')
                                            ->label('URL')
                                            ->url()
                                            ->columnSpan(1),

                                        TextInput::make('username')
                                            ->string()
                                            ->label('Username / Text')
                                            ->columnSpan(1),
                                    ])
                                    ->columns(3)
                                    // Social media opsional: boleh kosong (tanpa baris). Jika
                                    // admin tidak menambah baris, tidak ada data yang di-insert.
                                    ->defaultItems(0)
                                    ->addActionLabel('Tambah Social Media')
                                    ->reorderable()
                                    ->collapsible()
                            ]),
                        ]),
                    Step::make('Roles & Permissions')->description('Information Roles & Permissions User')
                        ->schema([
                            Section::make('Status Persetujuan')->description('Kelola status persetujuan akun user')->schema([
                                Grid::make(2)->schema([
                                    Toggle::make('is_approved')
                                        ->label('Disetujui')
                                        ->helperText('Aktifkan untuk menyetujui akun user ini agar bisa mengakses panel admin.')
                                        ->afterStateUpdated(function (bool $state, Set $set, $record) {
                                            if ($state) {
                                                $set('approved_at', now());

                                                if ($record instanceof User && ! $record->is_approved) {
                                                    $record->approve(Auth::user());
                                                    $record->notify(new AccountApprovedNotification());
                                                }
                                            } else {
                                                $set('approved_at', null);
                                            }
                                        })
                                        ->live(),
                                    DatePicker::make('approved_at')
                                        ->label('Disetujui Pada')
                                        ->nullable()
                                        ->default(now())
                                        ->visibleOn('edit'),
                                ]),
                            ]),
                            Section::make('Give Roles & Permissions To User')->description('Roles & Permissions To Access Maintain Information & Modification Data')->schema([
                                CheckboxList::make('roles')
                                    ->label('Roles')
                                    ->relationship('roles', 'name')
                                    ->searchable()
                                    ->bulkToggleable()
                                    ->columns(3)
                                    ->gridDirection('row')
                                    ->columnSpanFull(),
                                CheckboxList::make('permissions')
                                    ->label('Permissions')
                                    ->relationship('permissions', 'name')
                                    ->searchable()
                                    ->bulkToggleable()
                                    ->columns(3)
                                    ->gridDirection('row')
                                    ->columnSpanFull(),
                            ])
                        ]),
                ])->columnSpanFull(),
            ]);
    }
}
