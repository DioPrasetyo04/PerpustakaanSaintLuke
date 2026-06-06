<?php

namespace App\Filament\Resources\Events\Schemas;

use App\Models\Event;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Utilities\Set;
use Filament\Schemas\Schema;

class EventForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Informasi Acara')
                    ->description('Agenda & jadwal kegiatan perpustakaan yang ditampilkan di halaman Beranda.')
                    ->schema([
                        Grid::make(2)->schema([
                            TextInput::make('title')
                                ->label('Judul Acara')
                                ->live(onBlur: true)
                                ->maxLength(255)
                                ->required()
                                ->afterStateUpdated(function (Set $set, $state) {
                                    $set('slug', filled($state) ? generateSlug($state, Event::class) : null);
                                })
                                ->columnSpan(1),

                            TextInput::make('slug')
                                ->label('Slug')
                                ->maxLength(255)
                                ->unique(ignoreRecord: true)
                                ->readOnly()
                                ->dehydrated()
                                ->columnSpan(1),

                            TextInput::make('category')
                                ->label('Kategori / Tag')
                                ->placeholder('mis. Klub Baca, Workshop, Diskusi')
                                ->maxLength(255)
                                ->columnSpan(1),

                            TextInput::make('location')
                                ->label('Lokasi')
                                ->placeholder('mis. Ruang Baca Utama')
                                ->maxLength(255)
                                ->columnSpan(1),

                            DateTimePicker::make('start_at')
                                ->label('Mulai')
                                ->seconds(false)
                                ->native(false)
                                ->required()
                                ->columnSpan(1),

                            DateTimePicker::make('end_at')
                                ->label('Selesai (opsional)')
                                ->seconds(false)
                                ->native(false)
                                ->afterOrEqual('start_at')
                                ->columnSpan(1),

                            Textarea::make('description')
                                ->label('Deskripsi')
                                ->rows(3)
                                ->maxLength(2000)
                                ->columnSpanFull(),
                        ]),
                    ])->columnSpanFull(),

                Section::make('Kapasitas & Pendaftaran')
                    ->schema([
                        Grid::make(3)->schema([
                            TextInput::make('capacity')
                                ->label('Kapasitas Kursi')
                                ->numeric()
                                ->minValue(0)
                                ->placeholder('Kosongkan jika tanpa batas')
                                ->helperText('Total kursi tersedia.')
                                ->columnSpan(1),

                            TextInput::make('seats_taken')
                                ->label('Kursi Terisi')
                                ->numeric()
                                ->minValue(0)
                                ->default(0)
                                ->helperText('Jumlah pendaftar saat ini.')
                                ->columnSpan(1),

                            TextInput::make('sort_order')
                                ->label('Urutan')
                                ->numeric()
                                ->default(0)
                                ->columnSpan(1),

                            TextInput::make('registration_url')
                                ->label('Tautan Pendaftaran (opsional)')
                                ->url()
                                ->placeholder('https://...')
                                ->maxLength(255)
                                ->columnSpanFull(),
                        ]),
                    ])->columnSpanFull(),

                Section::make('Media & Status')
                    ->schema([
                        FileUpload::make('thumbnail')
                            ->label('Poster / Gambar Acara (opsional)')
                            ->image()
                            ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])
                            ->disk('public')
                            ->visibility('public')
                            ->directory('events/thumbnails')
                            ->maxSize(2048)
                            ->helperText('Gambar tampil sebagai latar kartu acara.')
                            ->columnSpanFull(),

                        Toggle::make('is_active')
                            ->label('Tampilkan acara ini')
                            ->onIcon('heroicon-m-check-badge')
                            ->offIcon('heroicon-m-x-circle')
                            ->default(true)
                            ->columnSpanFull(),
                    ])->columnSpanFull(),
            ]);
    }
}
