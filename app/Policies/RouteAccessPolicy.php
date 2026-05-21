<?php

declare(strict_types=1);

namespace App\Policies;

use Illuminate\Foundation\Auth\User as AuthUser;
use App\Models\RouteAccess;
use Illuminate\Auth\Access\HandlesAuthorization;

class RouteAccessPolicy
{
    use HandlesAuthorization;
    
    public function viewAny(AuthUser $authUser): bool
    {
        return $authUser->can('ViewAny:RouteAccess');
    }

    public function view(AuthUser $authUser, RouteAccess $routeAccess): bool
    {
        return $authUser->can('View:RouteAccess');
    }

    public function create(AuthUser $authUser): bool
    {
        return $authUser->can('Create:RouteAccess');
    }

    public function update(AuthUser $authUser, RouteAccess $routeAccess): bool
    {
        return $authUser->can('Update:RouteAccess');
    }

    public function delete(AuthUser $authUser, RouteAccess $routeAccess): bool
    {
        return $authUser->can('Delete:RouteAccess');
    }

    public function deleteAny(AuthUser $authUser): bool
    {
        return $authUser->can('DeleteAny:RouteAccess');
    }

    public function restore(AuthUser $authUser, RouteAccess $routeAccess): bool
    {
        return $authUser->can('Restore:RouteAccess');
    }

    public function forceDelete(AuthUser $authUser, RouteAccess $routeAccess): bool
    {
        return $authUser->can('ForceDelete:RouteAccess');
    }

    public function forceDeleteAny(AuthUser $authUser): bool
    {
        return $authUser->can('ForceDeleteAny:RouteAccess');
    }

    public function restoreAny(AuthUser $authUser): bool
    {
        return $authUser->can('RestoreAny:RouteAccess');
    }

    public function replicate(AuthUser $authUser, RouteAccess $routeAccess): bool
    {
        return $authUser->can('Replicate:RouteAccess');
    }

    public function reorder(AuthUser $authUser): bool
    {
        return $authUser->can('Reorder:RouteAccess');
    }

}