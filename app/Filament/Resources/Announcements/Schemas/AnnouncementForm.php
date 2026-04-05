<?php

namespace App\Filament\Resources\Announcements\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\TextInput;
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
                Section::make('Popup Announcement Information')->description('Provide necessary information for the announcement popup')->schema([
                    Grid::make(2)->schema([
                        FileUpload::make('photo')->label('Photo Of Announcement')->acceptedFileTypes(['jpg', 'jpeg', 'png', 'webp', 'gif'])->image()->disk('public')->visibility('public')->maxSize('2048')->directory('announcements')->required(),
                        RichEditor::make('message')->label('Message Announcement')->maxLength(255)->required(),
                        TextInput::make('url')->label('Url Announcement')->url()->required(),
                        Toggle::make('is_active')->label('Status')->onIcon(Heroicon::ShieldCheck)->offIcon(Heroicon::XCircle)->onColor('success')->offColor('danger'),
                    ])
                ])->columnSpanFull(),
            ]);
    }
}
