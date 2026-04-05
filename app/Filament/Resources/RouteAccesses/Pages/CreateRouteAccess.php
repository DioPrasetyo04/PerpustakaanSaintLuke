<?php

namespace App\Filament\Resources\RouteAccesses\Pages;

use App\Filament\Resources\RouteAccesses\RouteAccessResource;
use App\Models\RouteAccess;
use Filament\Resources\Pages\CreateRecord;

class CreateRouteAccess extends CreateRecord
{
    protected static string $resource = RouteAccessResource::class;

    protected function handleRecordCreation(array $data): \Illuminate\Database\Eloquent\Model
    {
        $roles = $data['role_id'] ?? [];
        $permissions = $data['permission_id'] ?? [];

        $firstRecord = null;

        foreach ($roles as $roleId) {
            foreach ($permissions as $permissionId) {
                $record = RouteAccess::create([
                    'route_name' => $data['route_name'],
                    'role_id' => $roleId,
                    'permission_id' => $permissionId,
                ]);

                $firstRecord ??= $record;
            }
        }

        return $firstRecord;
    }
}
