<?php

namespace App\Http\Controllers;


use App\Services\CatalogService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CatalogController extends Controller
{
    protected $catalogController;
    public function __construct(CatalogService $catalogService)
    {
        $this->catalogController = $catalogService;
    }
    // public function catalog(Request $request)
    // {
    //     return Inertia::render('catalog/CatalogPage', [
    //         'tab' => $request->get('tab', 'books'),
    //     ]);
    // }

    public function books(Request $request)
    {
        $filters = $request->all();
        $bookPage = (int) $request->get('books_page', 1);
        $bookLoad = (int) $request->get('books_load', 10);

        $booksPaginator = $this->catalogController->getBooksRaw($filters, $bookLoad, $bookPage);

        return Inertia::render('catalog/BooksPage', [
            'books' => $this->catalogController->transformBooks($booksPaginator),
            'state' => [
                'page' => $bookPage,
                'load' => $bookLoad,
                'search' => $request->search ?? '',
            ]
        ]);
    }

    public function categories(Request $request)
    {
        $filters = $request->all();
        $categoryPage = (int) $request->get('categories_page', 1);
        $categoryLoad = (int) $request->get('categories_load', 10);

        $categoriesPaginator = $this->catalogController->getCategoriesRaw($filters, $categoryLoad, $categoryPage);

        return Inertia::render('catalog/CategoriesPage', [
            'categories' => $this->catalogController->transformCategories($categoriesPaginator),
            'state' => [
                'page' => $categoryPage,
                'load' => $categoryLoad,
                'search' => $request->search ?? '',
            ]
        ]);
    }

    public function authors(Request $request)
    {
        $filters = $request->all();
        $authorPage = (int) $request->get('authors_page', 1);
        $authorLoad = (int) $request->get('authors_load', 10);

        $authorsPaginator = $this->catalogController->getAuthorsRaw($filters, $authorLoad, $authorPage);

        return Inertia::render('catalog/AuthorsPage', [
            'authors' => $this->catalogController->transformAuthors($authorsPaginator),
            'state' => [
                'page' => $authorPage,
                'load' => $authorLoad,
                'search' => $request->search ?? '',
            ]
        ]);
    }

    public function publishers(Request $request)
    {
        $filters = $request->all();
        $publisherPage = (int) $request->get('publishers_page', 1);
        $publisherLoad = (int) $request->get('publishers_load', 10);

        $publishersPaginator = $this->catalogController->getPublishersRaw($filters, $publisherLoad, $publisherPage);

        return Inertia::render('catalog/PublishersPage', [
            'publishers' => $this->catalogController->transformPublishers($publishersPaginator),
            'state' => [
                'page' => $publisherPage,
                'load' => $publisherLoad,
                'search' => $request->search ?? '',
            ]
        ]);
    }

    public function getBooksByCategory(Request $request, string $slug)
    {
        $filters = $request->all();
        $bookPage = (int) $request->get('category_books_page', 1);
        $bookLoad = (int) $request->get('category_books_load', 10);

        $booksPaginator = $this->catalogController->getBookByCategories($slug, $filters, $bookLoad, $bookPage);

        return Inertia::render('catalog/BooksByCategoryPage', [
            'books' => $this->catalogController->transformBooks($booksPaginator),
            'state' => [
                'page' => $bookPage,
                'load' => $bookLoad,
                'search' => $request->search ?? '',
            ]
        ]);
    }
}
