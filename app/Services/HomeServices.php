<?php

namespace App\Services;

use App\Http\Resources\BookResource;
use App\Http\Resources\InformationResource;
use App\Interface\HomeInterfaceRepositories;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Storage;
use App\Http\Resources\CategoryResource;

class HomeServices
{
    protected $homeServices;
    public function __construct(HomeInterfaceRepositories $homeInterfaceRepositories)
    {
        $this->homeServices = $homeInterfaceRepositories;
    }

    // ================= RAW (Paginator) =================

    public function getBooksRaw(array $filters, int $perPage, int $page): LengthAwarePaginator
    {
        return $this->homeServices->getAllBooksHomePage($filters, $perPage, $page);
    }

    /**
     * Buku trending (rating desc, judul asc) siap dipakai frontend.
     *
     * @return array<int, array<string, mixed>>
     */
    public function getTrendingBooks(int $limit = 12): array
    {
        return BookResource::collection(
            $this->homeServices->getTrendingBooks($limit)
        )->resolve();
    }

    /**
     * Buku Sorotan/Pilihan Pustakawan untuk Beranda (null bila tak ada buku layak).
     *
     * @return array<string, mixed>|null
     */
    public function getSpotlightBook(): ?array
    {
        $book = $this->homeServices->getSpotlightBook();

        return $book ? BookResource::make($book)->resolve() : null;
    }

    public function getCategoriesRaw(array $filters, int $perPage, int $page): LengthAwarePaginator
    {
        return $this->homeServices->getAllCategoriesHomePage($filters, $perPage, $page);
    }

    public function getInformationsRaw(array $filters, int $perPage, int $page): LengthAwarePaginator
    {
        return $this->homeServices->getAllInformationsHomePage($filters, $perPage, $page);
    }

    public function getLiveActivities(int $limit = 16): array
    {
        return $this->homeServices->getLiveLoanActivities($limit);
    }

    public function getFeaturedPublishersRaw(int $perPage, int $page): LengthAwarePaginator
    {
        return $this->homeServices->getFeaturedPublishers($perPage, $page);
    }

    public function getAllCountOfBooks(): int
    {
        return $this->homeServices->getCountOfAllBooks();
    }

    public function getAllCountOfVisitors(): int
    {
        return $this->homeServices->getCountOfAllVisitors();
    }

    public function getAllCountOfUsers(): int
    {
        return $this->homeServices->getCountOfAllUserVerified();
    }

    // ================= TRANSFORM (Resource) =================

    public function transformBooks(LengthAwarePaginator $paginator)
    {
        return paginateResource($paginator, BookResource::class);
    }

    public function transformCategories(LengthAwarePaginator $paginator)
    {
        return paginateResource($paginator, CategoryResource::class);
    }

    public function transformInformations(LengthAwarePaginator $paginator)
    {
        return paginateResource($paginator, InformationResource::class);
    }

    public function transformFeaturedPublishers(LengthAwarePaginator $paginator): array
    {
        return paginateMapped($paginator, fn ($publisher) => [
            'id' => $publisher->id,
            'name' => $publisher->name,
            'slug' => $publisher->slug,
            'logo' => $publisher->logo ? Storage::url($publisher->logo) : null,
            'books_count' => (int) $publisher->books_count,
        ]);
    }

    public function getCharts(): array
    {
        return [
            'visitor_chart' => $this->homeServices->getVisitChart(),
            'book_chart' => $this->homeServices->getBookChart(),
            'category_chart' => $this->homeServices->getCategoryPieChart(),
            'member_chart' => $this->homeServices->getMemberChart(),
        ];
    }
}
