<?php

declare(strict_types=1);

namespace App\Policies;

use Illuminate\Foundation\Auth\User as AuthUser;
use App\Models\FineSettings;
use Illuminate\Auth\Access\HandlesAuthorization;

class FineSettingsPolicy
{
    use HandlesAuthorization;
    
    public function viewAny(AuthUser $authUser): bool
    {
        return $authUser->can('ViewAny:FineSettings');
    }

    public function view(AuthUser $authUser, FineSettings $fineSettings): bool
    {
        return $authUser->can('View:FineSettings');
    }

    public function create(AuthUser $authUser): bool
    {
        return $authUser->can('Create:FineSettings');
    }

    public function update(AuthUser $authUser, FineSettings $fineSettings): bool
    {
        return $authUser->can('Update:FineSettings');
    }

    public function delete(AuthUser $authUser, FineSettings $fineSettings): bool
    {
        return $authUser->can('Delete:FineSettings');
    }

    public function deleteAny(AuthUser $authUser): bool
    {
        return $authUser->can('DeleteAny:FineSettings');
    }

    public function restore(AuthUser $authUser, FineSettings $fineSettings): bool
    {
        return $authUser->can('Restore:FineSettings');
    }

    public function forceDelete(AuthUser $authUser, FineSettings $fineSettings): bool
    {
        return $authUser->can('ForceDelete:FineSettings');
    }

    public function forceDeleteAny(AuthUser $authUser): bool
    {
        return $authUser->can('ForceDeleteAny:FineSettings');
    }

    public function restoreAny(AuthUser $authUser): bool
    {
        return $authUser->can('RestoreAny:FineSettings');
    }

    public function replicate(AuthUser $authUser, FineSettings $fineSettings): bool
    {
        return $authUser->can('Replicate:FineSettings');
    }

    public function reorder(AuthUser $authUser): bool
    {
        return $authUser->can('Reorder:FineSettings');
    }

}