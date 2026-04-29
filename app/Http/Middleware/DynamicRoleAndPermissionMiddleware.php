<?php

namespace App\Http\Middleware;

use App\Models\RouteAccess;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Spatie\Permission\Exceptions\UnauthorizedException;
use Symfony\Component\HttpFoundation\Response;

class DynamicRoleAndPermissionMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = auth()->user();

        if (!$user) {
            throw new UnauthorizedException(403, 'Unauthenticated');
        }

        $routeName = Route::currentRouteName();

        $routeAccesses = RouteAccess::with(['role', 'permission'])
            ->where('route_name', $routeName)
            ->get();

        if ($routeAccesses->isEmpty()) {
            throw new UnauthorizedException(403, 'No access configuration');
        }

        $roles = $routeAccesses->pluck('role.name')->filter()->unique()->toArray();
        $permissions = $routeAccesses->pluck('permission.name')->filter()->unique()->toArray();

        if (
            (!empty($roles) && $user->hasAnyRole($roles)) ||
            (!empty($permissions) && $user->canAny($permissions))
        ) {
            return $next($request);
        }

        throw UnauthorizedException::forRolesOrPermissions($roles, $permissions);
    }
}
