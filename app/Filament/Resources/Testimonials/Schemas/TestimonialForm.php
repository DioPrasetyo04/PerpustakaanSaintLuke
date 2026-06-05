<?php

namespace App\Filament\Resources\Testimonials\Schemas;

use App\Models\Testimonial;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Utilities\Set;
use Filament\Schemas\Schema;

class TestimonialForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Informasi Testimoni')
                    ->description('Video testimoni anggota/siswa/alumni yang ditampilkan di halaman Beranda.')
                    ->schema([
                        Grid::make(2)->schema([
                            TextInput::make('name')
                                ->label('Nama')
                                ->live(onBlur: true)
                                ->maxLength(255)
                                ->required()
                                ->afterStateUpdated(function (Set $set, $state) {
                                    $set('slug', filled($state) ? generateSlug($state, Testimonial::class) : null);
                                })
                                ->columnSpan(1),

                            TextInput::make('slug')
                                ->label('Slug')
                                ->maxLength(255)
                                ->unique(ignoreRecord: true)
                                ->readOnly()
                                ->dehydrated()
                                ->columnSpan(1),

                            TextInput::make('role')
                                ->label('Peran / Keterangan')
                                ->placeholder('mis. Siswa Kelas XII, Alumni, Guru')
                                ->maxLength(255)
                                ->columnSpan(1),

                            TextInput::make('sort_order')
                                ->label('Urutan')
                                ->numeric()
                                ->default(0)
                                ->columnSpan(1),

                            Textarea::make('description')
                                ->label('Deskripsi')
                                ->rows(3)
                                ->maxLength(2000)
                                ->columnSpanFull(),

                            FileUpload::make('video')
                                ->label('Video Testimoni')
                                ->acceptedFileTypes(['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime'])
                                ->disk('public')
                                ->visibility('public')
                                ->directory('testimonials/videos')
                                ->maxSize(51200) // 50 MB
                                ->required()
                                ->helperText('Format: MP4, WebM, OGG, atau MOV. Maksimal 50 MB.')
                                ->columnSpanFull(),

                            FileUpload::make('thumbnail')
                                ->label('Thumbnail / Poster (opsional)')
                                ->image()
                                ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])
                                ->disk('public')
                                ->visibility('public')
                                ->directory('testimonials/thumbnails')
                                ->maxSize(2048)
                                ->helperText('Gambar poster yang tampil sebelum video diputar.')
                                ->columnSpanFull(),

                            Toggle::make('is_active')
                                ->label('Tampilkan testimoni ini')
                                ->onIcon('heroicon-m-check-badge')
                                ->offIcon('heroicon-m-x-circle')
                                ->default(true)
                                ->columnSpanFull(),
                        ]),
                    ])->columnSpanFull(),
            ]);
    }
}
