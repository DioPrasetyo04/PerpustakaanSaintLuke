<?php

namespace App\Filament\Resources\Books\Schemas;

use Closure;
use Illuminate\Support\HtmlString;
use App\Enums\AssetTypes;
use App\Enums\BookStatus;
use App\Enums\PublishedBooks;
use App\Enums\UserGender;
use App\Models\Author;
use App\Models\Book;
use App\Models\Language;
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

class BookForm
{
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
                                    TextInput::make('title')
                                        ->label('Title Of Book')
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
                                        ->label('Slug Of Book')
                                        ->maxLength(255)
                                        ->unique(ignoreRecord: true)
                                        ->readOnly(),
                                    TextInput::make('book_code')
                                        ->label('Book Code')
                                        ->maxLength(255)
                                        ->unique(ignoreRecord: true)
                                        ->readOnly(),
                                    // DatePicker::make('publication_year')
                                    //     ->label('Publication Year')
                                    //     ->displayFormat('Y')
                                    //     ->columnSpan(1),
                                    DatePicker::make('publication_year')
                                        ->label('Publication Year')
                                        ->default(now())
                                        // ->format('dddd-MMM')
                                        ->displayFormat('d F Y')
                                        ->required()
                                        ->columnSpan(1),
                                    TextInput::make('isbn')
                                        ->label('ISBN')
                                        ->maxLength(255)
                                        ->columnSpan(1),
                                    Select::make('added_by')
                                        ->label('Added By')
                                        ->relationship('addedBy', 'name')
                                        ->preload()
                                        ->dehydrated()
                                        ->default(fn() => auth()->id())
                                        ->searchable()
                                        ->required()
                                        ->columnSpan(1),
                                    Select::make('authors')
                                        ->label('Authors')
                                        ->relationship('authors', 'name')
                                        ->multiple()
                                        ->searchable()
                                        ->preload()
                                        ->required()
                                        ->createOptionForm([
                                            Grid::make(3)->schema([
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
                                                    ->showFlags()
                                                    ->required(),
                                                Select::make('gender')
                                                    ->label('Gender')
                                                    ->options(UserGender::optionViews())
                                                    ->allowHtml()
                                                    ->getOptionLabelUsing(fn($value) => UserGender::from($value)->html())
                                                    ->searchable()
                                                    ->required(),
                                                DatePicker::make('date_of_birth')->label('Date Of Birth')->required(),
                                                Select::make('nationality')->label('Country')->options(countryOptions())->allowHtml()->searchable()->required(),
                                                FileUpload::make('avatar')->image()->maxSize(2048)->directory('authors')->disk('public')->visibility('public')->columnSpanFull(),
                                                Textarea::make('bio')->label('Biography')->columnSpanFull(),
                                                // DatePicker::make('verified_at')->label('Verified At')->displayFormat('Y-m-d')->columnSpanFull(),
                                            ]),
                                        ])->label('Author')->createOptionUsing(function (array $data) {
                                            $author = Author::firstOrCreate($data);
                                            return $author->id;
                                        })
                                        ->createOptionModalHeading('Create Author Form')
                                        ->columnSpanFull(),
                                    RichEditor::make('synopsis')
                                        ->label('Synopsis')
                                        ->columnSpanFull(),
                                    TextInput::make('number_of_pages')
                                        ->label('Number Of Pages')
                                        ->numeric()
                                        ->columnSpan(1),
                                    Select::make('publisher_id')
                                        ->label('Publisher')
                                        ->relationship('publisher', 'name')
                                        ->preload()
                                        ->required()
                                        ->columnSpan(1),
                                    Select::make('status')
                                        ->label('Status')
                                        ->options(
                                            BookStatus::options()
                                        )
                                        ->default(BookStatus::AVAILABLE)
                                        ->columnSpan(1),
                                    Select::make('language_id')
                                        ->label('Language')
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
                                                FileUpload::make('photo')->image()->maxSize(2048)->directory('languages')->disk('public')->visibility('public')->columnSpanFull(),
                                            ])->label('Create Language'),
                                        ])
                                        ->createOptionUsing(function (array $data) {
                                            $language = Language::firstOrCreate($data);
                                            return $language->id;
                                        })
                                        ->columnSpanFull(),
                                    FileUpload::make('cover')->image()->disk('public')->directory('books/cover')->maxSize(2048)->columnSpanFull(),
                                    ToggleButtons::make('is_published')->options(PublishedBooks::options())->default(PublishedBooks::PUBLISH->value)->colors([
                                        'Published' => 'success',
                                        'Unpublished' => 'danger'
                                    ])->icons([
                                        'Published' => 'heroicon-o-check-circle',
                                        'Unpublished' => 'heroicon-o-pencil'
                                    ])->columnSpan(1)->inline(),
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
                                        ->label('Price')
                                        ->prefix('Rp')
                                        ->mask(
                                            RawJs::make("
                                                \$input.replace(/[^0-9]/g, '')
                                                    .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
                                            ")
                                        )
                                        ->mutateStateForValidationUsing(
                                            fn($state) => (int) str_replace('.', '', $state)
                                        )
                                        ->dehydrateStateUsing(
                                            fn($state) => (int) str_replace('.', '', $state)
                                        )
                                        ->rules(['required', 'integer'])
                                        ->columnSpan(1),
                                    Select::make('categories')->relationship('categories', 'name')->multiple()->preload()->searchable()->required()->columnSpan(1),
                                ])->columns(3),
                        ]),
                    Wizard\Step::make('Asset Books Information')->description('Asset Of Books')
                        ->schema([
                            Section::make('Asset Books')->description('This is asset of books etc: pdf, image, audio, more...')
                                ->schema([
                                    Repeater::make('assets')
                                        ->label('Assets')
                                        ->relationship('assets')
                                        ->schema([
                                            Select::make('type')
                                                ->label('Type Asset')
                                                ->options(AssetTypes::options())
                                                ->live()
                                                ->afterStateUpdated(fn(Set $set) => $set('utility_path', null))
                                                ->required()
                                                ->columnSpan(1),
                                            FileUpload::make('utility_path')
                                                ->key(fn($get) => 'upload-' . $get('type'))
                                                ->label('Asset')
                                                ->helperText(
                                                    fn($get) =>
                                                    $get('type')
                                                        ? new HtmlString(
                                                            '<div class="text-sm text-danger-600 dark:text-danger-400">'
                                                                . AssetTypes::from($get('type'))->description()
                                                                . '</div>'
                                                        )
                                                        : 'Select type first'
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
                                                ->visible(fn($get) => filled($get('type')))
                                                ->required()
                                                ->columnSpan(2),
                                        ])
                                        ->columns(3)
                                        ->addActionLabel('Add Asset')
                                        ->reorderable()
                                        ->columnSpanFull(),
                                ]),
                        ]),
                    Wizard\Step::make('Stock Books Information')
                        ->description('This is stock of books')
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
                                        ->columnSpanFull(),

                                    TextInput::make('available')
                                        ->numeric()
                                        ->required()
                                        ->live(),

                                    TextInput::make('loan')
                                        ->numeric()
                                        ->required()
                                        ->live()
                                        ->readOnly(
                                            fn(Get $get) =>
                                            $get('loan') > 0
                                        )
                                        ->disabled(
                                            fn(Get $get) =>
                                            $get('loan') > 0
                                        ),

                                    TextInput::make('lost')
                                        ->numeric()
                                        ->required()
                                        ->live()
                                        ->readOnly(
                                            fn(Get $get) =>
                                            $get('lost') > 0
                                        )
                                        ->disabled(
                                            fn(Get $get) =>
                                            $get('lost') > 0
                                        ),

                                    TextInput::make('damaged')
                                        ->numeric()
                                        ->required()
                                        ->live()
                                        ->readOnly(
                                            fn(Get $get) =>
                                            $get('damaged') > 0
                                        )
                                        ->disabled(
                                            fn(Get $get) =>
                                            $get('damaged') > 0
                                        ),

                                ])
                                ->columns(2),
                        ])
                ])->columnSpanFull(),
            ]);
    }
}
