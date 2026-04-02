<?php

namespace App\Filament\Resources\Roles\Pages;

use App\Filament\Resources\Roles\RoleResource;
use Filament\Notifications\Notification;
use Filament\Resources\Pages\CreateRecord;
use Spatie\Permission\Models\Role;

class CreateRole extends CreateRecord
{
    protected static string $resource = RoleResource::class;

    protected function handleRecordCreation(array $data): \Illuminate\Database\Eloquent\Model
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

            if (!empty($roleData['permissions'])) {
                $role->syncPermissions($roleData['permissions']);
            }

            $created++;
        }

        // notif sukses
        if ($created > 0) {
            Notification::make()
                ->title('Berhasil')
                ->body("$created role berhasil dibuat.")
                ->success()
                ->send();
        }

        // notif skip
        if ($skipped > 0) {
            Notification::make()
                ->title('Perhatian')
                ->body("$skipped role sudah ada dan dilewati.")
                ->warning()
                ->send();
        }

        // return record pertama (WAJIB)
        return Role::latest()->first();
    }

    protected function getRedirectUrl(): string
    {
        return static::getResource()::getUrl('index');
    }
}
