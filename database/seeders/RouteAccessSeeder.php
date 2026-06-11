<?php

namespace Database\Seeders;

use App\Filament\Resources\RouteAccesses\Schemas\RouteAccessForm;
use App\Models\RouteAccess;
use Filament\Facades\Filament;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RouteAccessSeeder extends Seeder
{
    /**
     * Bangun katalog Route Access dari panel admin.
     *
     * Untuk SETIAP resource Filament dibuat satu baris route_access yang
     * mencatat:
     *   - route_name    : nama route index resource (mis. filament.admin.resources.books.index)
     *   - role_ids      : seluruh role yang boleh MEMBUKA resource (punya ViewAny:Entity)
     *   - permission_ids: seluruh permission milik entity tsb (termasuk permission chart-nya)
     *
     * Idempotent (updateOrCreate) sehingga aman dijalankan ulang setiap kali
     * ada resource/permission baru.
     */
    public function run(): void
    {
        $permissions = Permission::all();

        if ($permissions->isEmpty()) {
            $this->command?->warn('⚠️  Tidak ada permission. Jalankan AdminUserSeeder / shield:generate terlebih dulu.');
            return;
        }

        // 1. Kelompokkan permission id berdasarkan base entity (chart dilebur ke induk).
        //    contoh: ViewAny:Book, View:BookChart → keduanya masuk grup "Book".
        $permIdsByEntity = [];
        foreach ($permissions as $permission) {
            $entity     = Str::afterLast($permission->name, ':');
            $baseEntity = RouteAccessForm::getBaseEntity($entity);

            $permIdsByEntity[$baseEntity][] = $permission->id;
        }

        // 2. Muat role beserta permission-nya untuk menentukan siapa yang boleh membuka.
        $roles = Role::with('permissions')->get();

        // 3. Iterasi seluruh resource yang terdaftar di panel admin.
        $panel    = Filament::getPanel('admin');
        $synced   = 0;
        $keepKeys = [];

        foreach ($panel->getResources() as $resourceClass) {
            $entity  = class_basename($resourceClass::getModel());
            $permIds = $permIdsByEntity[$entity] ?? [];

            // Lewati resource yang tidak punya permission (mis. belum di-generate shield).
            if ($permIds === []) {
                continue;
            }

            // Role yang dapat MEMBUKA resource = punya permission ViewAny:Entity.
            $viewAnyName = 'ViewAny:' . $entity;
            $roleIds = $roles
                ->filter(fn (Role $role) => $role->permissions->contains('name', $viewAnyName))
                ->pluck('id')
                ->map(fn ($id) => (int) $id)
                ->values()
                ->all();

            $routeName     = $resourceClass::getRouteBaseName() . '.index';
            $keepKeys[]    = $routeName;

            RouteAccess::updateOrCreate(
                ['route_name' => $routeName],
                [
                    'role_ids'       => $roleIds,
                    'permission_ids' => array_values(array_unique(array_map('intval', $permIds))),
                ],
            );

            $synced++;
        }

        $this->command?->info("✅ Route access tersinkron: {$synced} resource.");
    }
}
