<?php

namespace App\Filament\Resources\Announcements\Schemas;

use App\Enums\Days;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\TimePicker;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;

class AnnouncementForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Informasi Announcement')
                    ->description('Isi data announcement perpustakaan per hari')
                    ->schema([
                        Grid::make(2)->schema([
                            Select::make('days')
                                ->label('Hari')
                                ->options(Days::options())
                                ->required()
                                ->unique(ignoreRecord: true)
                                ->native(false)
                                ->columnSpan(1),

                            TextInput::make('title')
                                ->label('Judul Announcement')
                                ->default('Announcement Perpustakaan')
                                ->required()
                                ->maxLength(255)
                                ->columnSpan(1),
                        ]),

                        Grid::make(2)->schema([
                            TimePicker::make('open_time')
                                ->label('Jam Buka')
                                ->required()
                                ->seconds(false)
                                ->columnSpan(1),

                            TimePicker::make('close_time')
                                ->label('Jam Tutup')
                                ->required()
                                ->seconds(false)
                                ->columnSpan(1),
                        ]),

                        FileUpload::make('photo')
                            ->label('Foto Perpustakaan (per Hari)')
                            ->acceptedFileTypes([
                                'image/png',
                                'image/jpeg',
                                'image/svg+xml',
                                'image/webp',
                                'image/gif',
                            ])
                            ->image()
                            ->disk('public')
                            ->visibility('public')
                            ->maxSize(2048)
                            ->directory('announcements')
                            ->required()
                            ->helperText('Format: PNG, JPG, JPEG, SVG, WEBP, GIF. Maksimal 2 MB.')
                            ->columnSpanFull(),

                        RichEditor::make('description')
                            ->label('Deskripsi Announcement')
                            ->maxLength(1000)
                            ->columnSpanFull(),

                        Toggle::make('is_active')
                            ->label('Status Aktif')
                            ->onIcon(Heroicon::ShieldCheck)
                            ->offIcon(Heroicon::XCircle)
                            ->onColor('success')
                            ->offColor('danger')
                            ->default(true),
                    ])
                    ->columnSpanFull(),
            ]);
    }
}
