<?php

declare(strict_types=1);

namespace App\Policies;

use Illuminate\Foundation\Auth\User as AuthUser;
use App\Models\OrganizationMember;
use Illuminate\Auth\Access\HandlesAuthorization;

class OrganizationMemberPolicy
{
    use HandlesAuthorization;
    
    public function viewAny(AuthUser $authUser): bool
    {
        return $authUser->can('ViewAny:OrganizationMember');
    }

    public function view(AuthUser $authUser, OrganizationMember $organizationMember): bool
    {
        return $authUser->can('View:OrganizationMember');
    }

    public function create(AuthUser $authUser): bool
    {
        return $authUser->can('Create:OrganizationMember');
    }

    public function update(AuthUser $authUser, OrganizationMember $organizationMember): bool
    {
        return $authUser->can('Update:OrganizationMember');
    }

    public function delete(AuthUser $authUser, OrganizationMember $organizationMember): bool
    {
        return $authUser->can('Delete:OrganizationMember');
    }

    public function deleteAny(AuthUser $authUser): bool
    {
        return $authUser->can('DeleteAny:OrganizationMember');
    }

    public function restore(AuthUser $authUser, OrganizationMember $organizationMember): bool
    {
        return $authUser->can('Restore:OrganizationMember');
    }

    public function forceDelete(AuthUser $authUser, OrganizationMember $organizationMember): bool
    {
        return $authUser->can('ForceDelete:OrganizationMember');
    }

    public function forceDeleteAny(AuthUser $authUser): bool
    {
        return $authUser->can('ForceDeleteAny:OrganizationMember');
    }

    public function restoreAny(AuthUser $authUser): bool
    {
        return $authUser->can('RestoreAny:OrganizationMember');
    }

    public function replicate(AuthUser $authUser, OrganizationMember $organizationMember): bool
    {
        return $authUser->can('Replicate:OrganizationMember');
    }

    public function reorder(AuthUser $authUser): bool
    {
        return $authUser->can('Reorder:OrganizationMember');
    }

}