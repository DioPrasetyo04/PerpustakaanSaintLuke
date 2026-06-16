<?php

namespace App\Filament\Resources\Books\Schemas;

use App\Enums\SocialMedia;
use App\Models\Category;
use App\Models\Publisher;
use Closure;
use Filament\Forms\Components\Toggle;
use Illuminate\Support\HtmlString;
use App\Enums\AssetTypes;
use App\Enums\BookStatus;
use App\Enums\BookType;
use App\Enums\PublishedBooks;
use App\Enums\UserGender;
use App\Models\Author;
use App\Models\Book;
use App\Models\User;
use App\Models\Language;
use App\Models\Type;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\ToggleButtons;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Utilities\Set;
use Filament\Schemas\Components\Wizard;
use Filament\Schemas\Schema;
use Filament\Support\RawJs;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\Repeater;
use Ysfkaya\FilamentPhoneInput\Forms\PhoneInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Utilities\Get;
use Illuminate\Database\Eloquent\Builder;

class BookForm
{
    /**
     * Apakah salah satu tipe terpilih berformat Digital?
     * Buku Digital (atau Digital + Fisik) WAJIB memiliki minimal satu aset.
     */
    protected static function hasDigitalType(Get $get): bool
    {
        $ids = array_filter((array) ($get('types') ?? []));

        return $ids !== [] && Type::whereIn('id', $ids)
            ->where('type', BookType::DIGITAL->value)
            ->exists();
    }

    /**
     * Apakah salah satu tipe terpilih berformat Fisik?
     * Hanya buku Fisik yang membutuhkan manajemen stok.
     */
    protected static function hasPhysicalType(Get $get): bool
    {
        $ids = array_filter((array) ($get('types') ?? []));

        return $ids !== [] && Type::whereIn('id', $ids)
            ->where('type', BookType::FISIK->value)
            ->exists();
    }

    /**
     * Buku Digital murni (Digital tanpa Fisik) tidak memiliki harga jual:
     * field Harga dikunci ke 0 & dinonaktifkan. Buku Fisik (termasuk
     * Digital + Fisik) tetap memerlukan harga untuk perhitungan denda.
     */
    protected static function isDigitalOnly(Get $get): bool
    {
        return self::hasDigitalType($get) && ! self::hasPhysicalType($get);
    }

    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Wizard::make([
                    Wizard\Step::make('Book Information')->description('Information of the books')
                        ->schema([
                            Section::make('Book Information')
                                ->description('Provide the necessary information for the book.')
                                ->schema([
                                    Select::make('types')
                                        ->label('Type Buku')
                                        ->live()
                                        // Buku digital murni: paksa harga ke 0 saat tipe berubah.
                                        ->afterStateUpdated(function (Get $get, Set $set) {
                                            if (self::isDigitalOnly($get)) {
                                                $set('price', 0);
                                            }
                                        })
                                        ->relationship('types', 'type')
                                        ->getOptionLabelFromRecordUsing(function ($record) {
                                            $iconUrl = $record->icon ? asset('storage/' . $record->icon) : null;
                                            $typeEnum = BookType::tryFrom($record->type);

                                            $iconHtml = $iconUrl
                                                ? '<img src="' . $iconUrl . '" style="width:18px;height:18px;border-radius:3px;object-fit:cover" alt="' . e($record->type) . '">'
                                                : ($typeEnum?->icon() ?? '');

                                            $color = $typeEnum?->color() ?? '#374151';
                                            $label = $typeEnum?->label() ?? ucfirst((string) $record->type);

                                            return new HtmlString(
                                                '<span style="display:inline-flex;align-items:center;gap:6px;">'
                                                    . $iconHtml
                                                    . '<span style="color:' . $color . ';font-weight:500;text-transform:capitalize;">' . e($label) . '</span>'
                                                    . '</span>'
                                            );
                                        })
                                        ->allowHtml()
                                        ->multiple()
                                        ->preload()
                                        ->searchable()
                                        ->required()
                                        ->columnSpan(1)
                                        ->createOptionForm([
                                            Section::make('Type Information')
                                                ->description('Choose the type enum and upload its icon.')
                                                ->schema([
                                                    Grid::make(2)->schema([
                                                        Select::make('type')
                                                            ->label('Type')
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
                                        ])
                                        ->createOptionUsing(function (array $data) {
                                            $type = Type::firstOrCreate(
                                                ['type' => $data['type']],
                                                ['icon' => $data['icon'] ?? null]
                                            );

                                            return $type->id;
                                        })
                                        ->createOptionModalHeading('Create Type Form'),
                                    Select::make('categories')->label('Kategori')->relationship('categories', 'name')
                                        ->getOptionLabelFromRecordUsing(function ($record) {
                                            $iconUrl = $record->icon ? asset('storage/' . $record->icon) : null;

                                            $icon = $iconUrl
                                                ? '<img src="' . e($iconUrl) . '" style="width:22px;height:22px;border-radius:4px;object-fit:cover;flex-shrink:0;border:1px solid #e5e7eb;background:#ffffff;" alt="">'
                                                : '<span style="display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;border-radius:4px;background:#fce7f3;color:#9d174d;flex-shrink:0;">'
                                                . '<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'
                                                . '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>'
                                                . '<path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>'
                                                . '</svg>'
                                                . '</span>';

                                            return new HtmlString(
                                                '<span style="display:inline-flex;align-items:center;gap:8px;line-height:1.25;">'
                                                    . $icon
                                                    . '<span style="font-weight:500;color:currentColor;text-transform:capitalize;">' . e($record->name) . '</span>'
                                                    . '</span>'
                                            );
                                        })
                                        ->allowHtml()
                                        ->multiple()
                                        ->preload()
                                        ->searchable()
                                        ->required()
                                        ->columnSpan(1)
                                        ->createOptionForm([
                                            Grid::make(2)->schema([

                                                // NAME
                                                TextInput::make('name')
                                                    ->label('Nama')
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
                                                    ->label('Slug')
                                                    ->maxLength(255)
                                                    ->unique(ignoreRecord: true)
                                                    ->readOnly()
                                                    ->dehydrated()
                                                    ->columnSpan(1),

                                                // ICON
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
                                                    ->directory('categories/icons')
                                                    ->disk('public')
                                                    ->visibility('public')
                                                    ->columnSpanFull(),

                                                // PHOTO (FULL WIDTH)
                                                FileUpload::make('photo')
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
                                                    ->directory('categories/images')
                                                    ->imageResizeMode('cover')
                                                    ->visibility('public')
                                                    ->columnSpanFull(),

                                                // DESCRIPTION (FULL WIDTH)
                                                RichEditor::make('description')
                                                    ->label('Deskripsi')
                                                    ->columnSpanFull(),

                                                // TOGGLE
                                                Toggle::make('is_active')
                                                    ->label('Is Active')
                                                    ->onIcon('heroicon-m-check-badge')
                                                    ->offIcon('heroicon-m-x-circle')
                                                    ->default(true)
                                                    ->columnSpanFull(),
                                            ])
                                        ])->createOptionUsing(function (array $data) {
                                            $category = Category::firstOrCreate($data);
                                            return $category->id;
                                        })
                                        ->createOptionModalHeading('Create Category Form'),
                                    Select::make('publisher_id')
                                        ->label('Penerbit')
                                        ->relationship('publisher', 'name')
                                        ->getOptionLabelFromRecordUsing(function ($record) {
                                            $logoUrl = $record->logo ? asset('storage/' . $record->logo) : null;

                                            $logo = $logoUrl
                                                ? '<img src="' . e($logoUrl) . '" style="width:22px;height:22px;border-radius:4px;object-fit:cover;flex-shrink:0;border:1px solid #e5e7eb;background:#ffffff;vertical-align:middle;" alt="">'
                                                : '<span style="display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;border-radius:4px;background:#fef3c7;color:#92400e;font-weight:700;font-size:11px;flex-shrink:0;vertical-align:middle;">'
                                                . e(mb_strtoupper(mb_substr((string) $record->name, 0, 1)))
                                                . '</span>';

                                            return '<span style="display:inline-flex;align-items:center;gap:8px;">'
                                                . $logo
                                                . '<span style="font-weight:500;color:currentColor;text-transform:capitalize;">' . e($record->name) . '</span>'
                                                . '</span>';
                                        })
                                        ->allowHtml()
                                        ->searchable(['name', 'email'])
                                        ->preload()
                                        ->required()
                                        ->columnSpan(1)
                                        ->createOptionForm([
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
                                                            ->acceptedFileTypes([
                                                                'image/png',
                                                                'image/jpeg',
                                                                'image/svg+xml',
                                                                'image/gif',
                                                            ])
                                                            ->maxSize(2048)
                                                            ->helperText('Format yang diperbolehkan: PNG, JPG, JPEG, SVG, GIF. Maksimal ukuran 2MB.')
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
                                                            ->label('Username / Text')
                                                            ->columnSpan(1),
                                                    ])
                                                    ->columns(3)
                                                    ->defaultItems(0)
                                                    ->addActionLabel('Tambah Social Media')
                                                    ->reorderable()
                                                    ->collapsible()
                                            ])->columnSpanFull() // 2 kolom utama
                                        ])->createOptionUsing(function (array $data) {
                                            $publisher = Publisher::firstOrCreate($data);
                                            return $publisher->id;
                                        })
                                        ->createOptionModalHeading('Create Publisher Form'),
                                    TextInput::make('title')
                                        ->label('Judul Buku')
                                        ->live()
                                        ->maxLength(255)
                                        ->required()
                                        ->columnSpan(1)
                                        ->afterStateUpdated(function (Set $set, $state) {
                                            if (filled($state)) {
                                                $set('slug', generateSlug($state, Book::class));
                                                $set('book_code', generateUniqueCode($state, Book::class, 'book_code'));
                                            } else {
                                                $set('slug', null);
                                            }
                                        }),
                                    TextInput::make('slug')
                                        ->label('Slug Buku')
                                        ->maxLength(255)
                                        ->unique(ignoreRecord: true)
                                        ->readOnly(),
                                    TextInput::make('book_code')
                                        ->label('Kode Buku')
                                        ->maxLength(255)
                                        ->unique(ignoreRecord: true)
                                        ->readOnly(),
                                    TextInput::make('publication_year')
                                        ->label('Tahun Publikasi')
                                        ->numeric()
                                        ->maxValue(date('Y'))
                                        ->default(date('Y'))
                                        ->placeholder('2026')
                                        ->required(),
                                    TextInput::make('isbn')
                                        ->label('ISBN')
                                        ->maxLength(255)
                                        ->columnSpan(1),
                                    Select::make('added_by')
                                        ->label('Ditambahkan Oleh')
                                        ->relationship(
                                            name: 'addedBy',
                                            titleAttribute: 'name',
                                            modifyQueryUsing: fn(Builder $query) => $query->whereHas('roles', function ($q) {
                                                $q->where('name', 'admin')->orWhere('name', 'manager')->orWhere('name', 'writer');
                                            }),
                                        )
                                        ->getOptionLabelFromRecordUsing(function ($record) {
                                            $avatarUrl = $record->avatar ? asset('storage/' . $record->avatar) : null;

                                            $avatar = $avatarUrl
                                                ? '<img src="' . e($avatarUrl) . '" style="width:28px;height:28px;border-radius:9999px;object-fit:cover;flex-shrink:0;border:1px solid #e5e7eb;" alt="">'
                                                : '<span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:9999px;background:#dbeafe;color:#1e40af;font-weight:600;font-size:11px;flex-shrink:0;">'
                                                . e(mb_strtoupper(mb_substr((string) $record->name, 0, 1)))
                                                . '</span>';

                                            return new HtmlString(
                                                '<span style="display:inline-flex;align-items:center;gap:8px;line-height:1.25;">'
                                                    . $avatar
                                                    . '<span style="display:inline-flex;flex-direction:column;min-width:0;">'
                                                    . '<span style="font-weight:600;color:currentColor;font-size:13px;">' . e($record->name) . '</span>'
                                                    . '<span style="font-size:11px;color:#6b7280;">' . e($record->email) . '</span>'
                                                    . '</span>'
                                                    . '</span>'
                                            );
                                        })
                                        ->getOptionLabelUsing(function ($value) {
                                            $record = User::find($value);
                                            if (! $record) return (string) $value;

                                            $avatarUrl = $record->avatar ? asset('storage/' . $record->avatar) : null;

                                            $avatar = $avatarUrl
                                                ? '<img src="' . e($avatarUrl) . '" style="width:28px;height:28px;border-radius:9999px;object-fit:cover;flex-shrink:0;border:1px solid #e5e7eb;" alt="">'
                                                : '<span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:9999px;background:#dbeafe;color:#1e40af;font-weight:600;font-size:11px;flex-shrink:0;">'
                                                . e(mb_strtoupper(mb_substr((string) $record->name, 0, 1)))
                                                . '</span>';

                                            return new HtmlString(
                                                '<span style="display:inline-flex;align-items:center;gap:8px;line-height:1.25;">'
                                                    . $avatar
                                                    . '<span style="display:inline-flex;flex-direction:column;min-width:0;">'
                                                    . '<span style="font-weight:600;color:currentColor;font-size:13px;">' . e($record->name) . '</span>'
                                                    . '<span style="font-size:11px;color:#6b7280;">' . e($record->email) . '</span>'
                                                    . '</span>'
                                                    . '</span>'
                                            );
                                        })
                                        ->allowHtml()
                                        ->preload()
                                        ->dehydrated()
                                        ->default(fn() => auth()->id())
                                        ->searchable(['name', 'username', 'email'])
                                        ->required()
                                        ->columnSpan(1),
                                    Select::make('authors')
                                        ->label('Penulis')
                                        ->relationship(
                                            name: 'authors',
                                            titleAttribute: 'name',
                                            modifyQueryUsing: fn(Builder $query) => $query->whereHas('roles', function ($q) {
                                                $q->where('name', 'writer')->orWhere('name', 'admin')->orWhere('name', 'manager');
                                            }),
                                        )
                                        ->getOptionLabelFromRecordUsing(function ($record) {
                                            $avatarUrl = $record->avatar ? asset('storage/' . $record->avatar) : null;

                                            $avatar = $avatarUrl
                                                ? '<img src="' . e($avatarUrl) . '" style="width:28px;height:28px;border-radius:9999px;object-fit:cover;flex-shrink:0;border:1px solid #e5e7eb;" alt="">'
                                                : '<span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:9999px;background:#e5e7eb;color:#374151;font-weight:600;font-size:11px;flex-shrink:0;">'
                                                . e(mb_strtoupper(mb_substr((string) $record->name, 0, 1)))
                                                . '</span>';

                                            $username = $record->username ? '@' . $record->username : '';

                                            return new HtmlString(
                                                '<span style="display:inline-flex;align-items:center;gap:8px;line-height:1.25;">'
                                                    . $avatar
                                                    . '<span style="display:inline-flex;flex-direction:column;min-width:0;">'
                                                    . '<span style="font-weight:600;color:currentColor;display:inline-flex;align-items:center;">'
                                                    . e($record->name)
                                                    . '</span>'
                                                    . ($username ? '<span style="font-size:11px;color:#6b7280;">' . e($username) . '</span>' : '')
                                                    . '</span>'
                                                    . '</span>'
                                            );
                                        })
                                        ->allowHtml()
                                        ->multiple()
                                        ->searchable(['name', 'username'])
                                        ->preload()
                                        ->required()
                                        ->createOptionForm([
                                            Section::make('Author Information')
                                                ->description('Provide the necessary information for the author.')
                                                ->schema([
                                                    Grid::make(2)->schema([
                                                        TextInput::make('name')->live()->afterStateUpdated(function (Set $set, $state) {
                                                            if (filled($state)) {
                                                                $set('username', generateUsername($state));
                                                            } else {
                                                                $set('username', null);
                                                            }
                                                        })->required(),
                                                        TextInput::make('username')->unique(ignoreRecord: true)->readOnly()->disabled()->dehydrated(),
                                                        PhoneInput::make('phone')
                                                            ->label('Phone')
                                                            ->defaultCountry('id')
                                                            ->separateDialCode()
                                                            ->showFlags(),
                                                        Select::make('gender')
                                                            ->label('Gender')
                                                            ->options(UserGender::optionViews())
                                                            ->allowHtml()
                                                            ->getOptionLabelUsing(fn($value) => UserGender::from($value)->html())
                                                            ->searchable(),
                                                        DatePicker::make('date_of_birth')->label('Date Of Birth'),
                                                        Select::make('nationality')->label('Country')->options(countryOptions())->allowHtml()->searchable(),
                                                        RichEditor::make('bio')->label('Biography')->columnSpanFull(),
                                                        FileUpload::make('avatar')
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
                                                            ->directory('authors')
                                                            ->disk('public')
                                                            ->visibility('public')
                                                            ->columnSpanFull(),
                                                    ]),
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
                                                            ->required()
                                                            ->columnSpan(1),

                                                        TextInput::make('url')
                                                            ->label('URL')
                                                            ->url()
                                                            ->columnSpan(1),

                                                        TextInput::make('username')
                                                            ->label('Username / Text')
                                                            ->columnSpan(1),
                                                    ])
                                                    ->columns(3)
                                                    ->defaultItems(0)
                                                    ->addActionLabel('Tambah Social Media')
                                                    ->reorderable()
                                                    ->collapsible()
                                            ])->columnSpanFull()
                                        ])->createOptionUsing(function (array $data) {
                                            $author = Author::firstOrCreate(
                                                ['username' => $data['username'] ?? null],
                                                $data
                                            );

                                            // Pastikan author punya role "writer" agar langsung bisa
                                            // dipilih sebagai penulis buku (untuk author yang baru,
                                            // role sudah otomatis lewat Author::booted(); baris ini
                                            // menutup kasus author lama hasil firstOrCreate).
                                            if (! $author->hasRole('writer')) {
                                                $author->assignRole('writer');
                                            }

                                            return $author->id;
                                        })
                                        ->createOptionModalHeading('Create Author Form')
                                        ->columnSpanFull(),
                                    RichEditor::make('synopsis')
                                        ->label('Sinopsis')
                                        ->columnSpanFull(),
                                    TextInput::make('number_of_pages')
                                        ->label('Jumlah Halaman')
                                        ->numeric()
                                        ->columnSpan(1),
                                    Select::make('language_id')
                                        ->label('Bahasa')
                                        ->relationship('language', 'language')
                                        ->getOptionLabelFromRecordUsing(function ($record) {
                                            $flagUrl = $record->photo ? asset('storage/' . $record->photo) : null;

                                            return
                                                "<div style='display:flex;align-items:center;gap:6px'>
                                                " . ($flagUrl ? "<img src='{$flagUrl}' width='20' height='15' style='border-radius:3px' />" : "") . "
                                                <span>{$record->language}</span>
                                                </div>";
                                        })
                                        ->allowHtml()
                                        ->searchable()
                                        ->preload()
                                        ->required()
                                        ->createOptionForm([
                                            Section::make('language')->schema([
                                                TextInput::make('language')->maxLength(255)->live()->afterStateUpdated(function (Set $set, $state) {
                                                    if (filled($state)) {
                                                        $set('code', generateUniqueCode($state, Language::class, 'code'));
                                                    } else {
                                                        $set('code', null);
                                                    }
                                                })->required()->columnSpan(1),
                                                TextInput::make('code')->maxLength(255)->unique(ignoreRecord: true)->readOnly()->disabled()->dehydrated(),
                                                FileUpload::make('photo')
                                                    ->image()
                                                    ->acceptedFileTypes([
                                                        'image/png',
                                                        'image/jpeg',
                                                        'image/svg+xml',
                                                        'image/gif',
                                                    ])
                                                    ->maxSize(2048)
                                                    ->helperText('Format yang diperbolehkan: PNG, JPG, JPEG, SVG, GIF. Maksimal ukuran 2MB.')
                                                    ->directory('languages')
                                                    ->disk('public')
                                                    ->visibility('public')
                                                    ->columnSpanFull(),

                                            ])->label('Create Language'),
                                        ])
                                        ->createOptionUsing(function (array $data) {
                                            $language = Language::firstOrCreate($data);
                                            return $language->id;
                                        }),
                                    TextInput::make('classification_number')
                                        ->label('Nomor Klasifikasi Buku')
                                        ->maxLength(255)
                                        ->placeholder('e.g. 813.54')
                                        ->columnSpan(1),
                                    TextInput::make('volume')
                                        ->label('Jilid')
                                        ->maxLength(255)
                                        ->placeholder('e.g. 1')
                                        ->columnSpan(1),
                                    TextInput::make('location_book')
                                        ->label('Lokasi Buku')
                                        ->maxLength(255)
                                        ->placeholder('e.g. Rak A-3, Lantai 2')
                                        ->columnSpan(1),
                                    Select::make('status')
                                        ->label('Status')
                                        ->options(BookStatus::formOptionViews())
                                        ->getOptionLabelUsing(fn($value) => BookStatus::from($value)->html())
                                        ->allowHtml()
                                        ->native(false)
                                        ->searchable()
                                        ->default(BookStatus::AVAILABLE->value)
                                        ->columnSpan(1),
                                    FileUpload::make('cover')
                                        ->label('Cover Buku')
                                        ->image()
                                        ->disk('public')
                                        ->directory('books/cover')
                                        ->acceptedFileTypes([
                                            'image/png',
                                            'image/jpeg',
                                            'image/svg+xml',
                                            'image/webp',
                                            'image/gif',
                                        ])
                                        ->maxSize(2048)
                                        ->helperText('Format yang diperbolehkan: PNG, JPG, JPEG, SVG, WEBP, GIF. Maksimal ukuran 2MB.')
                                        ->columnSpanFull(),
                                    ToggleButtons::make('is_published')->options(PublishedBooks::options())->default(PublishedBooks::PUBLISH->value)->colors([
                                        'Published' => 'success',
                                        'Unpublished' => 'danger'
                                    ])->icons([
                                        'Published' => 'heroicon-o-check-circle',
                                        'Unpublished' => 'heroicon-o-pencil'
                                    ])->columnSpan(1)->inline(),
                                    Toggle::make('is_spotlight')
                                        ->label('Jadikan Buku Sorotan (Beranda)')
                                        ->helperText('Tampil di section "Pilihan Pustakawan" pada Beranda. Hanya satu buku yang bisa aktif — mengaktifkan ini otomatis menonaktifkan buku sorotan lainnya.')
                                        ->onIcon('heroicon-m-star')
                                        ->offIcon('heroicon-m-star')
                                        ->onColor('warning')
                                        ->default(false)
                                        ->columnSpan(1),
                                    // TextInput::make('price')
                                    //     ->label('Price')
                                    //     ->prefix('Rp')
                                    //     ->mask(
                                    //         fn(Mask $mask) =>
                                    //         $mask
                                    //             ->numeric()
                                    //             ->thousandsSeparator('.')
                                    //     )
                                    //     ->dehydrateStateUsing(fn($state) => str_replace('.', '', $state))
                                    //     ->numeric()
                                    //     ->required()
                                    //     ->columnSpan(2),
                                    TextInput::make('price')
                                        ->label('Harga')
                                        ->prefix('Rp')
                                        ->mask(
                                            RawJs::make("
                                                \$input.replace(/[^0-9]/g, '')
                                                    .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
                                            ")
                                        )
                                        // Buku digital murni tidak punya harga: nonaktifkan input
                                        // dan kunci nilainya ke 0. Tetap di-dehydrate agar 0
                                        // tetap tersimpan ke database (field disabled secara
                                        // default tidak ikut terkirim).
                                        ->disabled(fn(Get $get): bool => self::isDigitalOnly($get))
                                        ->dehydrated()
                                        ->helperText(fn(Get $get): ?string => self::isDigitalOnly($get)
                                            ? 'Buku digital tidak memiliki harga — otomatis 0.'
                                            : null)
                                        ->mutateStateForValidationUsing(
                                            fn($state, Get $get) => self::isDigitalOnly($get)
                                                ? 0
                                                : (int) str_replace('.', '', (string) $state)
                                        )
                                        ->dehydrateStateUsing(
                                            fn($state, Get $get) => self::isDigitalOnly($get)
                                                ? 0
                                                : (int) str_replace('.', '', (string) $state)
                                        )
                                        ->rules(['required', 'integer'])
                                        ->columnSpan(1),
                                ])->columns(3),
                        ]),
                    Wizard\Step::make('Resource Buku')->description('Detail Resource Buku Digital')
                        // Aset hanya relevan untuk buku Digital. Tampilkan step ini bila
                        // minimal satu tipe terpilih = Digital (mis. Digital, atau
                        // Digital + Fisik). Sembunyikan untuk Fisik saja atau saat
                        // belum ada tipe yang dipilih.
                        ->visible(fn(Get $get): bool => self::hasDigitalType($get))
                        ->schema([
                            Section::make('Resource Buku')->description('Resource hanya wajib untuk buku berformat Digital. Buku Fisik saja boleh tanpa resource.')
                                ->schema([
                                    Repeater::make('assets')
                                        ->label('Resource Digital')
                                        ->relationship('assets')
                                        ->helperText(fn(Get $get): string => self::hasDigitalType($get)
                                            ? 'Buku Digital wajib memiliki minimal satu aset (mis. PDF / e-book).'
                                            : 'Opsional untuk buku Fisik. Tambahkan aset hanya bila tersedia versi digital.')
                                        ->required(fn(Get $get): bool => self::hasDigitalType($get))
                                        ->minItems(fn(Get $get): int => self::hasDigitalType($get) ? 1 : 0)
                                        ->schema([
                                            Select::make('type')
                                                ->label('Type Resource')
                                                ->options(AssetTypes::options())
                                                ->live()
                                                ->afterStateUpdated(fn(Set $set) => $set('utility_path', null))
                                                ->required()
                                                ->columnSpan(1),
                                            FileUpload::make('utility_path')
                                                ->key(fn($get) => 'upload-' . $get('type'))
                                                ->label('Asset')
                                                ->helperText(
                                                    function ($get) {
                                                        if (! $get('type')) {
                                                            return 'Select type first';
                                                        }

                                                        $asset = AssetTypes::from($get('type'));
                                                        $maxMb = (int) ($asset->maxSize() / 1024);

                                                        return new HtmlString(
                                                            '<div class="text-sm text-danger-600 dark:text-danger-400">'
                                                                . e($asset->description())
                                                                . ' &middot; Maksimal ukuran file ' . $maxMb . 'MB'
                                                                . '</div>'
                                                        );
                                                    }
                                                )
                                                ->disk('public')
                                                ->directory('books/assets')
                                                ->live()
                                                ->acceptedFileTypes(
                                                    fn($get) =>
                                                    $get('type')
                                                        ? AssetTypes::from($get('type'))->allowedMimes()
                                                        : []
                                                )
                                                ->maxSize(
                                                    fn($get) =>
                                                    $get('type')
                                                        ? AssetTypes::from($get('type'))->maxSize()
                                                        : null
                                                )
                                                ->visible(fn($get) => filled($get('type')))
                                                ->required()
                                                ->columnSpan(2),
                                        ])
                                        ->columns(3)
                                        ->addActionLabel('Tambah Resource')
                                        ->reorderable()
                                        ->columnSpanFull(),
                                ]),
                        ]),
                    Wizard\Step::make('Stock Books Information')
                        ->description('This is stock of books')
                        // Manajemen stok hanya relevan untuk buku Fisik. Tampilkan
                        // step ini bila minimal satu tipe terpilih = Fisik (mis. Fisik,
                        // atau Fisik + Digital). Sembunyikan untuk Digital saja atau
                        // saat belum ada tipe yang dipilih.
                        ->visible(fn(Get $get): bool => self::hasPhysicalType($get))
                        ->schema([
                            Section::make('Stock Books')
                                ->relationship('stock')
                                ->schema([

                                    TextInput::make('total')
                                        ->label('Total Stock')
                                        ->numeric()
                                        ->required()
                                        ->live()
                                        ->rules([
                                            fn(Get $get): Closure => function ($attribute, $value, $fail) use ($get) {

                                                $available = (int) $get('available');
                                                $loan = (int) $get('loan');
                                                $lost = (int) $get('lost');
                                                $damaged = (int) $get('damaged');

                                                $sum = $available + $loan + $lost + $damaged;

                                                if ($sum !== (int) $value) {
                                                    $fail("Total harus {$sum}, tidak sinkron data");
                                                }
                                            }
                                        ])
                                        ->afterStateUpdated(function (Set $set, $state) {

                                            // ketika total diisi maka available otomatis mengikuti
                                            $set('available', (int) $state);

                                            // reset field lainnya
                                            $set('loan', 0);
                                            $set('lost', 0);
                                            $set('damaged', 0);

                                            // jika total kosong
                                            if (blank($state)) {
                                                $set('available', 0);
                                                $set('loan', 0);
                                                $set('lost', 0);
                                                $set('damaged', 0);
                                            }
                                        })
                                        ->columnSpanFull(),

                                    TextInput::make('available')
                                        ->numeric()
                                        ->required()
                                        ->live()
                                        ->default(0),

                                    TextInput::make('loan')
                                        ->numeric()
                                        ->required()
                                        ->live()
                                        ->default(0),

                                    TextInput::make('lost')
                                        ->numeric()
                                        ->required()
                                        ->live()
                                        ->default(0),

                                    TextInput::make('damaged')
                                        ->numeric()
                                        ->required()
                                        ->live()
                                        ->default(0),

                                ])
                                ->columns(2),
                        ])
                ])->columnSpanFull(),
            ]);
    }
}
