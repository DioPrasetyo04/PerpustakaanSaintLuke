<?php

namespace App\Repositories;

use App\Interface\OrganizationInterfaceRepositories;
use App\Models\OrganizationMember;
use App\Support\Cache\CacheTags;
use App\Support\Cache\QueryCache;
use Illuminate\Support\Collection;

class OrganizationRepositories implements OrganizationInterfaceRepositories
{
    public function getActiveMembers(): Collection
    {
        return QueryCache::remember(
            'organization:members:active',
            [CacheTags::ORGANIZATION],
            fn (): Collection => OrganizationMember::query()
                ->active()
                ->orderByDesc('is_featured')
                ->orderBy('sort_order')
                ->orderBy('id')
                ->get([
                    'id',
                    'name',
                    'role',
                    'specialization',
                    'photo',
                    'is_featured',
                ])
        );
    }
}
