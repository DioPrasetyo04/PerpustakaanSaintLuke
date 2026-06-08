<?php

namespace App\Interface;

use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

interface HomeInterfaceRepositories
{
    public function getAllBooksHomePage(array $filters, int $perPage, int $page): LengthAwarePaginator;

    /**
     * Buku trending: diurutkan rating tertinggi, lalu abjad judul bila rating sama.
     */
    public function getTrendingBooks(int $limit): Collection;

    /**
     * Buku Sorotan/Pilihan Pustakawan (dipilih dari Filament). Fallback ke
     * buku dengan rating tertinggi bila belum ada yang ditandai.
     */
    public function getSpotlightBook(): ?\App\Models\Book;

    public function getAllCategoriesHomePage(array $filters, int $perPage, int $page): LengthAwarePaginator;

    public function getAllInformationsHomePage(array $filters, int $perPage, int $page): LengthAwarePaginator;

    public function getLiveLoanActivities(int $limit): array;

    public function getFeaturedPublishers(int $perPage, int $page): LengthAwarePaginator;

    public function getCountOfAllBooks(): int;

    public function getCountOfAllVisitors(): int;

    public function getCountOfAllUserVerified(): int;

    public function getVisitChart(): array;
    public function getBookChart(): array;
    public function getCategoryPieChart(): array;
    public function getMemberChart(): array;
}
