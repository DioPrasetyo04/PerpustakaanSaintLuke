<?php

namespace App\Filament\Resources\Permissions\Pages;

use App\Filament\Resources\Permissions\PermissionResource;
use Filament\Notifications\Notification;
use Filament\Resources\Pages\CreateRecord;
use Illuminate\Database\Eloquent\Model;
use Spatie\Permission\Models\Permission;

class CreatePermission extends CreateRecord
{
    protected static string $resource = PermissionResource::class;

    protected function handleRecordCreation(array $data): Model
    {
        $created = 0;
        $skipped = 0;

        foreach ($data['permissions'] as $permissionData) {

            $exists = Permission::where('name', $permissionData['name'])
                ->where('guard_name', $permissionData['guard_name'])
                ->exists();

            if ($exists) {
                $skipped++;
                continue;
            }

            Permission::create([
                'name' => $permissionData['name'],
                'guard_name' => $permissionData['guard_name'],
            ]);

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

        return new Permission();
    }


    protected function getRedirectUrl(): string
    {
        return static::getResource()::getUrl('index');
    }
}
