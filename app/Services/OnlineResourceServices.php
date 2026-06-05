<?php

namespace App\Services;

use App\Http\Resources\OnlineResourceResource;
use App\Interface\OnlineResourceInterfaceRepositories;
use Illuminate\Support\Collection;

class OnlineResourceServices
{
    protected $onlineResourceRepositories;

    public function __construct(OnlineResourceInterfaceRepositories $onlineResourceRepositories)
    {
        $this->onlineResourceRepositories = $onlineResourceRepositories;
    }

    public function getActiveResourcesRaw(array $filters): Collection
    {
        return $this->onlineResourceRepositories->getActiveResources($filters);
    }

    public function transformResources(Collection $resources): array
    {
        return OnlineResourceResource::collection($resources)->resolve();
    }
}
