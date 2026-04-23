<?php

namespace App\Services;

use App\Http\Resources\AuthorResource;
use App\Http\Resources\BookResource;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\PublisherResource;
use App\Interface\CatalogInterfaceRepositories;
use Illuminate\Pagination\LengthAwarePaginator;

class CatalogService
{
    protected $catalogServices;
    public function __construct(CatalogInterfaceRepositories $catalogRepositories)
    {
        $this->catalogServices = $catalogRepositories;
    }

    public function getBooksRaw(array $filters, int $perPage, int $page): LengthAwarePaginator
    {
        return $this->catalogServices->getAllBooks($filters, $perPage, $page);
    }

    public function getCategoriesRaw(array $filters, int $perPage, int $page): LengthAwarePaginator
    {
        return $this->catalogServices->getAllCategories($filters, $perPage, $page);
    }

    public function getAuthorsRaw(array $filters, int $perPage, int $page): LengthAwarePaginator
    {
        return $this->catalogServices->getAllAuthors($filters, $perPage, $page);
    }

    public function getPublishersRaw(array $filters, int $perPage, int $page): LengthAwarePaginator
    {
        return $this->catalogServices->getAllPublishers($filters, $perPage, $page);
    }

    public function getBooksByCategory(string $categorySlug, array $filters, int $perPage, int $page): LengthAwarePaginator
    {
        return $this->catalogServices->getBooksByCategory($categorySlug, $filters, $perPage, $page);
    }

    public function getBooksByAuthor(string $authorUsername, array $filters, int $perPage, int $page): LengthAwarePaginator
    {
        return $this->catalogServices->getBooksByAuthor($authorUsername, $filters, $perPage, $page);
    }

    public function getBooksByPublisher(string $publisherSlug, array $filters, int $perPage, int $page): LengthAwarePaginator
    {
        return $this->catalogServices->getBooksByPublisher($publisherSlug, $filters, $perPage, $page);
    }

    public function transformBooks(LengthAwarePaginator $paginator)
    {
        return paginateResource($paginator, BookResource::class);
    }

    public function transformCategories(LengthAwarePaginator $paginator)
    {
        return paginateResource($paginator, CategoryResource::class);
    }

    public function transformAuthors(LengthAwarePaginator $paginator)
    {
        return paginateResource($paginator, AuthorResource::class);
    }

    public function transformPublishers(LengthAwarePaginator $paginator)
    {
        return paginateResource($paginator, PublisherResource::class);
    }
}
