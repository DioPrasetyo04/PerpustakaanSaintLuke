<?php

namespace App\Filament\Resources\RouteAccesses\Pages;

use App\Filament\Resources\RouteAccesses\RouteAccessResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditRouteAccess extends EditRecord
{
    protected static string $resource = RouteAccessResource::class;

    protected function handleRecordUpdate($record, array $data): \Illuminate\Database\Eloquent\Model
    {
        $roles = $data['role_id'] ?? [];
        $permissions = $data['permission_id'] ?? [];

        // kombinasi baru dari form
        $newCombinations = collect($roles)->crossJoin($permissions)
            ->map(fn($item) => [
                'route_name' => $data['route_name'],
                'role_id' => $item[0],
                'permission_id' => $item[1],
            ]);

        // ambil data lama
        $existing = \App\Models\RouteAccess::where('route_name', $record->route_name)->get();

        // delete yang tidak ada di form
        foreach ($existing as $old) {
            $exists = $newCombinations->first(
                fn($new) =>
                $new['role_id'] == $old->role_id &&
                    $new['permission_id'] == $old->permission_id
            );

            if (!$exists) {
                $old->delete();
            }
        }

        // insert yang baru
        foreach ($newCombinations as $new) {
            \App\Models\RouteAccess::firstOrCreate($new);
        }

        return $record;
    }

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
