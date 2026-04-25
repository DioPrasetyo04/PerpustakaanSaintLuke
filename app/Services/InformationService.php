<?php

namespace App\Services;

use App\Http\Resources\InformationResource;
use App\Interface\InformationRepositoriesInterface;
use Illuminate\Pagination\LengthAwarePaginator;

class InformationService
{
    protected $informationService;

    public function __construct(InformationRepositoriesInterface $informationRepositories)
    {
        $this->informationService = $informationRepositories;
    }

    public function getAllInformations(array $filters, int $perPage, int $page): LengthAwarePaginator
    {
        return $this->informationService->getAllInformations($filters, $perPage, $page);
    }

    public function getDetailInformation(string $slug)
    {
        return $this->informationService->getDetailInformation($slug);
    }

    public function transformDataInformations(LengthAwarePaginator $paginator)
    {
        return paginateResource($paginator, InformationResource::class);
    }
}
