<?php

declare(strict_types=1);

namespace App\Policies;

use Illuminate\Foundation\Auth\User as AuthUser;
use App\Models\Information;
use Illuminate\Auth\Access\HandlesAuthorization;

class InformationPolicy
{
    use HandlesAuthorization;
    
    public function viewAny(AuthUser $authUser): bool
    {
        return $authUser->can('ViewAny:Information');
    }

    public function view(AuthUser $authUser, Information $information): bool
    {
        return $authUser->can('View:Information');
    }

    public function create(AuthUser $authUser): bool
    {
        return $authUser->can('Create:Information');
    }

    public function update(AuthUser $authUser, Information $information): bool
    {
        return $authUser->can('Update:Information');
    }

    public function delete(AuthUser $authUser, Information $information): bool
    {
        return $authUser->can('Delete:Information');
    }

    public function deleteAny(AuthUser $authUser): bool
    {
        return $authUser->can('DeleteAny:Information');
    }

    public function restore(AuthUser $authUser, Information $information): bool
    {
        return $authUser->can('Restore:Information');
    }

    public function forceDelete(AuthUser $authUser, Information $information): bool
    {
        return $authUser->can('ForceDelete:Information');
    }

    public function forceDeleteAny(AuthUser $authUser): bool
    {
        return $authUser->can('ForceDeleteAny:Information');
    }

    public function restoreAny(AuthUser $authUser): bool
    {
        return $authUser->can('RestoreAny:Information');
    }

    public function replicate(AuthUser $authUser, Information $information): bool
    {
        return $authUser->can('Replicate:Information');
    }

    public function reorder(AuthUser $authUser): bool
    {
        return $authUser->can('Reorder:Information');
    }

}