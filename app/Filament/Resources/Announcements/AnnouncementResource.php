<?php

namespace App\Filament\Resources\Announcements;

use App\Enums\Days;
use App\Filament\Resources\Announcements\Pages\CreateAnnouncement;
use App\Filament\Resources\Announcements\Pages\EditAnnouncement;
use App\Filament\Resources\Announcements\Pages\ListAnnouncements;
use App\Filament\Resources\Announcements\Schemas\AnnouncementForm;
use App\Filament\Resources\Announcements\Tables\AnnouncementsTable;
use App\Models\Announcement;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class AnnouncementResource extends Resource
{
    protected static ?string $model = Announcement::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::Megaphone;

    protected static string|\UnitEnum|null $navigationGroup = 'Informasi';

    protected static ?int $navigationSort = 31;

    protected static ?string $recordTitleAttribute = 'title';

    protected static ?string $modelLabel = 'Pengumuman';

    protected static ?string $pluralModelLabel = 'Pengumuman';

    public static function form(Schema $schema): Schema
    {
        return AnnouncementForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return AnnouncementsTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [];
    }

    /**
     * Allow creation until all 7 days are covered (unique constraint per day).
     */
    public static function canCreate(): bool
    {
        $existingDays = Announcement::query()
            ->withoutTrashed()
            ->pluck('days')
            ->map(fn($d) => $d instanceof Days ? $d->value : $d)
            ->toArray();

        return count($existingDays) < count(Days::cases());
    }

    public static function getPages(): array
    {
        return [
            'index'  => ListAnnouncements::route('/'),
            'create' => CreateAnnouncement::route('/create'),
            'edit'   => EditAnnouncement::route('/{record}/edit'),
        ];
    }
}
