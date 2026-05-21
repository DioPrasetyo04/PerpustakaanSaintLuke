<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Artisan;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolePermissionSeeder extends Seeder
{
    // Sumber daya yang HANYA bisa diakses Admin (Manajemen Pengguna)
    private const USER_MGMT_ENTITIES = ['User', 'Role', 'Permission', 'RouteAccess'];

    // Sumber daya Katalog Buku (Writer dapat akses)
    private const BOOK_CATALOG_ENTITIES = ['Book', 'Author', 'Category', 'Publisher'];

    // Widget/page yang hanya relevan untuk buku (Writer)
    private const WRITER_VIEWS = [
        'View:AuthorsChart',
        'View:BookChart',
        'View:CategoryChart',
        'View:PublishersChart',
        'View:StatusOfBooks',
        'View:CustomAccountWidget',
    ];

    // Widget/page khusus admin
    private const ADMIN_ONLY_VIEWS = [
        'View:FineChart',
        'View:FineConditionChart',
    ];

    public function run(): void
    {
        Artisan::call('permission:cache-reset');

        foreach (['admin', 'manager', 'writer', 'user', 'member'] as $name) {
            Role::findOrCreate($name, 'web');
        }

        $allPermissions   = Permission::pluck('name')->all();
        $adminRole        = Role::findByName('admin',   'web');
        $managerRole      = Role::findByName('manager', 'web');
        $writerRole       = Role::findByName('writer',  'web');

        // ── Admin: semua permission ──────────────────────────────────────
        $adminRole->syncPermissions($allPermissions);

        // ── Manager: semua permission kecuali Manajemen Pengguna ─────────
        $managerPermissions = array_filter($allPermissions, function (string $perm) {
            foreach (self::USER_MGMT_ENTITIES as $entity) {
                if (str_ends_with($perm, ':' . $entity)) {
                    return false;
                }
            }
            return true;
        });

        $managerRole->syncPermissions(array_values($managerPermissions));

        // ── Writer: hanya Katalog Buku + widget buku + dashboard ─────────
        $writerPermissions = array_filter($allPermissions, function (string $perm) {
            foreach (self::BOOK_CATALOG_ENTITIES as $entity) {
                if (str_ends_with($perm, ':' . $entity)) {
                    return true;
                }
            }
            if (in_array($perm, self::WRITER_VIEWS, true)) {
                return true;
            }
            return false;
        });

        $writerRole->syncPermissions(array_values($writerPermissions));

        Artisan::call('permission:cache-reset');

        $this->command->info('✅ Roles & permissions seeded:');
        $this->command->info('   admin   → ' . $adminRole->permissions()->count() . ' permissions (all)');
        $this->command->info('   manager → ' . $managerRole->permissions()->count() . ' permissions (minus user management)');
        $this->command->info('   writer  → ' . $writerRole->permissions()->count() . ' permissions (book catalog only)');
    }
}
