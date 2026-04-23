<?php

namespace App\Services;

use App\Http\Resources\BookResource;
use App\Interface\ResourceInterfaceRepositories;
use Illuminate\Pagination\LengthAwarePaginator;

class ResourceServices
{
    protected $resourceServices;
    public function __construct(ResourceInterfaceRepositories $resourcesRepositories)
    {
        $this->resourceServices = $resourcesRepositories;
    }
    public function getAllDataRaw(array $filters, int $perPage, int $page): LengthAwarePaginator
    {
        return $this->resourceServices->getAllData($filters, $perPage, $page);
    }

    public function transformBooksData(LengthAwarePaginator $paginator)
    {
        return paginateResource($paginator, BookResource::class);
    }
}
