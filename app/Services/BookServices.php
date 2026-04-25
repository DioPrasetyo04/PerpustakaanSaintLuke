<?php

namespace App\Services;

use App\Http\Resources\BookResource;
use App\Http\Resources\ReviewResource;
use App\Interface\BookInterfaceRepositories;
use Illuminate\Pagination\LengthAwarePaginator;

class BookServices
{
    protected $bookServices;

    public function __construct(BookInterfaceRepositories $bookRepositories)
    {
        $this->bookServices = $bookRepositories;
    }

    public function getDetailBookRaw(string $slug)
    {
        return $this->bookServices->getDetailBook($slug);
    }

    public function getRecomendedBookRaw(int $perPage, int $page): LengthAwarePaginator
    {
        return $this->bookServices->getRecomendedBook($perPage, $page);
    }
    public function getReviewBookRaw(array $filters, string $slug, int $perPage, int $page): LengthAwarePaginator
    {
        return $this->bookServices->getReviewBook($filters, $slug, $perPage, $page);
    }
    public function transformBooks(LengthAwarePaginator $paginator)
    {
        return paginateResource($paginator, BookResource::class);
    }

    public function transformReviewBooks(LengthAwarePaginator $paginator)
    {
        return paginateResource($paginator, ReviewResource::class);
    }
}
