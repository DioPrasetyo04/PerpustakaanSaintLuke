<?php

namespace App\Filament\Resources\Books\Schemas;

use App\Enums\AssetTypes;
use App\Models\Book;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Utilities\Set;
use Filament\Schemas\Components\Wizard;
use App\Models\Language;
use Filament\Forms\Components\FileUpload;
use Filament\Schemas\Schema;
use App\Enums\BookStatus;
use App\Enums\PublishedBooks;
use Filament\Forms\Components\ToggleButtons;

class BookForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Wizard::make([
                    Wizard\Step::make('Book Information')
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
                                    DatePicker::make('publication_year')
                                        ->label('Publication Year')
                                        ->displayFormat('Y')
                                        ->columnSpan(1),
                                    TextInput::make('isbn')
                                        ->label('ISBN')
                                        ->numeric()
                                        ->maxLength(255)
                                        ->columnSpan(1),
                                    Select::make('author_id')
                                        ->label('Author')
                                        ->relationship('author', 'name')
                                        ->preload()
                                        ->disabled()
                                        ->dehydrated()
                                        ->default(fn() => auth()->id())
                                        ->required()
                                        ->columnSpan(1),
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
                                    ])->columnSpanFull(),
                                ])->columns(3),
                        ]),
                    Wizard\Step::make('Asset Books Information')
                        ->schema([
                            Section::make('Asset Books')->description('This is asset of books etc: pdf, image, audio, more...')->schema([
                                Select::make('type')->label('Type Asset')->options(AssetTypes::options())->live()->afterStateUpdated(fn(Set $set) => $set('utility_path', null))->required(),
                                FileUpload::make('utility_path')
                                    ->key(fn($get) => 'upload-' . $get('type'))
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
                            ])
                        ]),
                    Wizard\Step::make('Stock Books Information')
                        ->schema([
                            // ...
                        ]),
                ]),
            ]);
    }
}
