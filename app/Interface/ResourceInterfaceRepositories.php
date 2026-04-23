<?php

namespace App\Interface;

use Illuminate\Pagination\LengthAwarePaginator;

interface ResourceInterfaceRepositories
{
    public function getAllData(array $filters, int $perPage, int $page): LengthAwarePaginator;
}
