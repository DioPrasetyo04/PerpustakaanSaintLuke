<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RouteAccess extends Model
{
    /** @use HasFactory<\Database\Factories\RouteAccesFactory> */
    use HasFactory;

    protected $table = 'route_accesses';

    protected $fillable = [
        'route_name',
        'role_ids',
        'permission_ids',
    ];

    protected $casts = [
        'role_ids'       => 'array',
        'permission_ids' => 'array',
    ];

    public function getRoleNamesAttribute(): string
    {
        return Role::whereIn('id', $this->role_ids ?? [])->pluck('name')->join(', ');
    }

    public function getPermissionNamesAttribute(): string
    {
        return Permission::whereIn('id', $this->permission_ids ?? [])->pluck('name')->join(', ');
    }
}
