<?php

namespace App\Interface;

use Illuminate\Pagination\LengthAwarePaginator;

interface HomeInterfaceRepositories
{
    public function getAllBooksHomePage(array $filters, int $perPage, int $page): LengthAwarePaginator;

    public function getAllCategoriesHomePage(array $filters, int $perPage, int $page): LengthAwarePaginator;

    public function getAllInformationsHomePage(array $filters, int $perPage, int $page): LengthAwarePaginator;

    public function getLiveLoanActivities(int $limit): array;

    public function getFeaturedPublishers(int $limit): array;

    public function getCountOfAllBooks(): int;

    public function getCountOfAllVisitors(): int;

    public function getCountOfAllUserVerified(): int;

    public function getVisitChart(): array;
    public function getBookChart(): array;
    public function getCategoryPieChart(): array;
    public function getMemberChart(): array;
}
