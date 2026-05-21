<?php

namespace App\Filament\Resources\RouteAccesses\Schemas;

use Filament\Forms\Components\CheckboxList;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Utilities\Set;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RouteAccessForm
{
    public static function configure(Schema $schema): Schema
    {
        $roleOptions = Role::orderBy('name')
            ->pluck('name', 'id')
            ->mapWithKeys(fn ($name, $id) => [(string) $id => Str::ucfirst($name)])
            ->all();

        // Build per-base-entity groups (chart entities merge into their parent)
        $normalizedGroups = [];

        foreach (Permission::all() as $p) {
            $entity     = Str::afterLast($p->name, ':');
            $action     = Str::beforeLast($p->name, ':');
            $baseEntity = self::getBaseEntity($entity);
            $isChart    = $entity !== $baseEntity;

            $normalizedGroups[$baseEntity][(string) $p->id] = [
                'label' => $isChart
                    ? 'Chart · ' . Str::ucfirst($action)
                    : Str::ucfirst($action),
                'sort' => ($isChart ? 'z_' : '') . $action,
            ];
        }

        ksort($normalizedGroups);

        $entitySections = [];

        foreach ($normalizedGroups as $baseEntity => $items) {
            uasort($items, fn ($a, $b) => strcmp($a['sort'], $b['sort']));

            $options  = array_map(fn ($item) => $item['label'], $items);
            $count    = \count($options);
            $fieldKey = self::getGroupFieldKey($baseEntity);

            $entitySections[] = Section::make($baseEntity)
                ->description("{$count} permission tersedia")
                ->schema([
                    CheckboxList::make($fieldKey)
                        ->hiddenLabel()
                        ->options($options)
                        ->columns(5)
                        ->gridDirection('row')
                        ->bulkToggleable()
                        ->searchable(),
                ])
                ->collapsible();
        }

        return $schema->components([
            Section::make('Informasi Route')
                ->description('Nama route yang akan dikonfigurasi hak aksesnya')
                ->schema([
                    TextInput::make('route_name')
                        ->label('Route Name')
                        ->placeholder('contoh: admin/loans/create')
                        ->live()
                        ->afterStateUpdated(fn (Set $set, $state) => $set('route_name', Str::slug($state, '/')))
                        ->required()
                        ->columnSpanFull(),
                ]),

            Section::make('Peran yang Diizinkan')
                ->description('Centang role mana saja yang dapat mengakses route ini')
                ->schema([
                    CheckboxList::make('role_ids')
                        ->hiddenLabel()
                        ->options($roleOptions)
                        ->columns(5)
                        ->gridDirection('row')
                        ->bulkToggleable()
                        ->required(),
                ]),

            Section::make('Izin Akses')
                ->description('Centang permission yang diperlukan, dikelompokkan per sumber daya.')
                ->schema($entitySections)
                ->columnSpanFull(),
        ]);
    }

    /**
     * Normalize chart entity names to their parent resource.
     * AuthorsChart → Author, BookChart → Book, CategoryChart → Category
     */
    public static function getBaseEntity(string $entity): string
    {
        if (str_ends_with($entity, 'Chart')) {
            $base = substr($entity, 0, -5);
            if (str_ends_with($base, 's')) {
                $base = substr($base, 0, -1);
            }

            return $base;
        }

        return $entity;
    }

    public static function getGroupFieldKey(string $entity): string
    {
        return 'perm_group_' . Str::slug($entity, '_');
    }

    public static function splitPermissionIds(array $permissionIds): array
    {
        $allPermissions = Permission::all();

        // Initialize all group fields using base entities
        $groups = [];
        foreach ($allPermissions as $p) {
            $baseEntity = self::getBaseEntity(Str::afterLast($p->name, ':'));
            $fieldKey   = self::getGroupFieldKey($baseEntity);
            if (! isset($groups[$fieldKey])) {
                $groups[$fieldKey] = [];
            }
        }

        // Populate with selected IDs
        foreach ($permissionIds as $id) {
            $perm = $allPermissions->firstWhere('id', (int) $id);
            if ($perm) {
                $baseEntity = self::getBaseEntity(Str::afterLast($perm->name, ':'));
                $groups[self::getGroupFieldKey($baseEntity)][] = (string) $id;
            }
        }

        return $groups;
    }

    public static function mergePermissionIds(array $data): array
    {
        $permissionIds = [];

        foreach (array_keys($data) as $key) {
            if (str_starts_with($key, 'perm_group_') && \is_array($data[$key])) {
                $permissionIds = array_merge($permissionIds, $data[$key]);
                unset($data[$key]);
            }
        }

        $data['permission_ids'] = array_values(array_unique($permissionIds));

        return $data;
    }
}
