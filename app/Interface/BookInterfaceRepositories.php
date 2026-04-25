<?php


namespace App\Interface;

use Illuminate\Pagination\LengthAwarePaginator;

interface BookInterfaceRepositories
{
    public function getDetailBook(string $slug);

    public function getRecomendedBook(int $perPage, int $page): LengthAwarePaginator;

    public function getReviewBook(array $filters, string $slug, int $perPage, int $page): LengthAwarePaginator;
}
