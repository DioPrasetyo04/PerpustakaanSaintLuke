<?php

namespace App\Interface;

use Illuminate\Pagination\LengthAwarePaginator;

interface InformationRepositoriesInterface
{
    public function getAllInformations(array $filters, int $perPage, int $page): LengthAwarePaginator;

    public function getDetailInformation(string $slug);
}
