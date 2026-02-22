<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RouteAccess extends Model
{
    /** @use HasFactory<\Database\Factories\RouteAccesFactory> */
    use HasFactory;

    protected $table = 'route_accesses';

    protected $fillable = [
        'route_name',
        'role_id',
        'permission_id'
    ];

    public function role(): BelongsTo
    {
        return $this->belongsTo(Role::class, 'role_id');
    }

    public function permission(): BelongsTo
    {
        return $this->belongsTo(Permission::class, 'permission_id');
    }
}
