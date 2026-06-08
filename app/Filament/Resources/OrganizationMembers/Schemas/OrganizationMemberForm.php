<?php

namespace App\Filament\Resources\OrganizationMembers\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class OrganizationMemberForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Anggota Struktur Organisasi')
                    ->description('Profil pengurus & staf perpustakaan yang ditampilkan di halaman Struktur Organisasi.')
                    ->schema([
                        Grid::make(2)->schema([
                            TextInput::make('name')
                                ->label('Nama Lengkap')
                                ->placeholder('mis. Bapak Yohanes Pramono, S.Si., M.Pd.')
                                ->maxLength(255)
                                ->required()
                                ->columnSpan(1),

                            TextInput::make('role')
                                ->label('Jabatan')
                                ->placeholder('mis. Kepala Perpustakaan')
                                ->maxLength(255)
                                ->required()
                                ->columnSpan(1),

                            TextInput::make('specialization')
                                ->label('Bidang / Spesialisasi (opsional)')
                                ->placeholder('mis. Literasi Digital, Sirkulasi & Anggota')
                                ->maxLength(255)
                                ->columnSpan(1),

                            TextInput::make('sort_order')
                                ->label('Urutan')
                                ->helperText('Angka kecil tampil lebih dulu.')
                                ->numeric()
                                ->default(0)
                                ->columnSpan(1),

                            FileUpload::make('photo')
                                ->label('Foto')
                                ->image()
                                ->avatar()
                                ->imageEditor()
                                ->imageEditorAspectRatios(['1:1', '3:4', '4:5'])
                                ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])
                                ->disk('public')
                                ->visibility('public')
                                ->directory('organization/photos')
                                ->maxSize(2048)
                                ->helperText('Format JPG/PNG/WebP, maks 2 MB. Kosongkan untuk memakai avatar inisial otomatis.')
                                ->columnSpanFull(),

                            Toggle::make('is_featured')
                                ->label('Jadikan kartu sorotan (pimpinan)')
                                ->helperText('Tampil sebagai kartu profil besar di bagian atas halaman.')
                                ->onIcon('heroicon-m-star')
                                ->offIcon('heroicon-m-user')
                                ->default(false)
                                ->columnSpan(1),

                            Toggle::make('is_active')
                                ->label('Tampilkan anggota ini')
                                ->onIcon('heroicon-m-check-badge')
                                ->offIcon('heroicon-m-x-circle')
                                ->default(true)
                                ->columnSpan(1),
                        ]),
                    ])->columnSpanFull(),
            ]);
    }
}
