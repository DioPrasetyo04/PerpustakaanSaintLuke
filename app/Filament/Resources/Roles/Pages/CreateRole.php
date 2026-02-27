<?php

namespace App\Filament\Resources\Roles\Pages;

use App\Filament\Resources\Roles\RoleResource;
use Filament\Notifications\Notification;
use Filament\Resources\Pages\CreateRecord;
use Illuminate\Database\Eloquent\Model;
use Spatie\Permission\Models\Role;

class CreateRole extends CreateRecord
{
    protected static string $resource = RoleResource::class;

    // alur submit form

    // submit form
    // ↓
    // validate
    // ↓
    // beforeValidate()
    // ↓
    // beforeCreate()
    // ↓
    // handleRecordCreation()
    // ↓
    // afterCreate()
    // ↓
    // redirect

    // logic untuk create data berdasarkan data array
    protected function handleRecordCreation(array $data): Model
    {
        $created = 0;
        $skipped = 0;

        foreach ($data['roles'] as $roleData) {

            $exists = Role::where('name', $roleData['name'])
                ->where('guard_name', $roleData['guard_name'])
                ->exists();

            if ($exists) {
                $skipped++;
                continue;
            }

            $role = Role::create([
                'name' => $roleData['name'],
                'guard_name' => $roleData['guard_name'],
            ]);

            // Sync permissions kalau ada
            if (!empty($roleData['permissions'])) {
                $role->syncPermissions($roleData['permissions']);
            }

            $created++;
        }

        if ($created > 0) {
            Notification::make()
                ->title('Berhasil')
                ->body("$created role berhasil dibuat.")
                ->success()
                ->send();
        }

        if ($skipped > 0) {
            Notification::make()
                ->title('Perhatian')
                ->body("$skipped role sudah ada dan dilewati.")
                ->warning()
                ->send();
        }

        return new Role();
    }

    protected function getRedirectUrl(): string
    {
        return static::getResource()::getUrl('index');
    }
}
