<?php

namespace App\Filament\Resources\OnlineResources;

use App\Filament\Resources\OnlineResources\Pages\CreateOnlineResources;
use App\Filament\Resources\OnlineResources\Pages\EditOnlineResources;
use App\Filament\Resources\OnlineResources\Pages\ListOnlineResources;
use App\Filament\Resources\OnlineResources\Schemas\OnlineResourcesForm;
use App\Filament\Resources\OnlineResources\Tables\OnlineResourcesTable;
use App\Enums\OnlineResourceType;
use App\Models\OnlineResource;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class OnlineResourcesResource extends Resource
{
    protected static ?string $model = OnlineResource::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::GlobeAlt;

    protected static string|\UnitEnum|null $navigationGroup = 'Katalog Buku';

    protected static ?int $navigationSort = 6;

    protected static ?string $navigationLabel = 'Sumber Daring';

    protected static ?string $modelLabel = 'Sumber Daring';

    protected static ?string $pluralModelLabel = 'Sumber Daring';

    protected static ?string $recordTitleAttribute = 'title';

    public static function form(Schema $schema): Schema
    {
        return OnlineResourcesForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return OnlineResourcesTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListOnlineResources::route('/'),
            'create' => CreateOnlineResources::route('/create'),
            'edit' => EditOnlineResources::route('/{record}/edit'),
        ];
    }

    /**
     * Saat menyimpan: bila tipe "Lainnya", pakai nilai dari "type_other"
     * sebagai tipe sebenarnya. Field bantu type_other tidak disimpan.
     */
    public static function resolveCustomType(array $data): array
    {
        if (($data['type'] ?? null) === 'Lainnya') {
            $custom = trim((string) ($data['type_other'] ?? ''));
            $data['type'] = $custom !== '' ? $custom : 'Lainnya';
        }

        unset($data['type_other']);

        return $data;
    }

    /**
     * Saat memuat form edit: bila tipe tersimpan bukan salah satu tipe baku,
     * tampilkan sebagai "Lainnya" + isi field "type_other".
     */
    public static function expandCustomType(array $data): array
    {
        $known = array_keys(OnlineResourceType::options());

        if (filled($data['type'] ?? null) && ! in_array($data['type'], $known, true)) {
            $data['type_other'] = $data['type'];
            $data['type'] = 'Lainnya';
        }

        return $data;
    }
}
