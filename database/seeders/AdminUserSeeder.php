<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Permission;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Generate SELURUH permission Filament (resource, page, widget) bila belum ada.
        //    Tanpa langkah ini permissions table kosong → admin tidak punya akses resource
        //    apa pun. Pakai --option=permissions agar file Policy di app/Policies TIDAK
        //    ditimpa (policy sudah ada di repo).
        if (Permission::count() === 0) {
            Artisan::call('shield:generate', [
                '--all' => true,
                '--option' => 'permissions',
                '--panel' => 'admin',
                '--no-interaction' => true,
            ]);
            $this->command->info('🛡️  Shield permissions generated: ' . Permission::count());
        }

        // 2. Sinkronkan role → permission (admin = semua, manager/writer = subset).
        //    Ini yang membuat role 'admin' benar-benar mendapat seluruh resource Filament.
        $this->call(RolePermissionSeeder::class);

        // 2b. Bangun katalog Route Access (route mana dibuka role apa + permission-nya).
        //     Wajib SETELAH RolePermissionSeeder agar role sudah punya permission.
        $this->call(RouteAccessSeeder::class);

        // 3. Buat / perbarui user super admin dan tetapkan role admin.
        $email = 'admin@perpustakaan-saint-luke.id';

        $admin = User::where('email', $email)->first();
        if (! $admin) {
            $admin = User::factory()->admin()->create();
        }

        $admin->syncRoles(['admin']);

        // Bersihkan cache permission agar akses langsung berlaku tanpa relogin.
        Artisan::call('permission:cache-reset');

        $this->command->info('Admin user: ' . $email . ' | password: Admin@12345');
        $this->command->info('Role admin → ' . $admin->getAllPermissions()->count() . ' permissions (semua resource Filament).');
    }
}
