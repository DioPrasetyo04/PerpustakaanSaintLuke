<?php

namespace App\Interface;

use Illuminate\Pagination\LengthAwarePaginator;

interface CatalogInterfaceRepositories
{
    public function getAllBooks(array $filters, int $perPage, int $page): LengthAwarePaginator;
    public function getAllCategories(array $filters, int $perPage, int $page): LengthAwarePaginator;
    public function getAllAuthors(array $filters, int $perPage, int $page): LengthAwarePaginator;
    public function getAllPublishers(array $filters, int $perPage, int $page): LengthAwarePaginator;
    public function getBooksByCategory(string $categorySlug, array $filters, int $perPage, int $page): LengthAwarePaginator;
    public function getBooksByAuthor(string $authorUsername, array $filters, int $perPage, int $page): LengthAwarePaginator;
    public function getBooksByPublisher(string $publisherSlug, array $filters, int $perPage, int $page): LengthAwarePaginator;
}
