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

    private function renderBooksByFilter(Request $request, string $type, string $attribute)
    {
        $filters = $request->all();
        $page = (int) $request->get('page', 1);
        $load = (int) $request->get('load', 10);

        switch ($type) {
            case 'category':
                $paginator = $this->catalogController->getBooksByCategory($attribute, $filters, $load, $page);
                break;
            case 'author':
                $paginator = $this->catalogController->getBooksByAuthor($attribute, $filters, $load, $page);
                break;
            case 'publisher':
                $paginator = $this->catalogController->getBooksByPublisher($attribute, $filters, $load, $page);
                break;
            default:
                abort(404, 'Page Type Not Found');
        }

        return Inertia::render('catalog/BooksByFilterPage', [
            'books' => $this->catalogController->transformBooks($paginator),
            'type' => $type,
            'slug' => $attribute,
            'state' => [
                'page' => $page,
                'load' => $load,
                'search' => $request->search ?? '',
            ],
        ]);
    }

    public function getBooksByCategory(Request $request, string $slug)
    {
        return $this->renderBooksByFilter($request, 'category', $slug);
    }

    public function getBooksByAuthor(Request $request, string $username)
    {
        return $this->renderBooksByFilter($request, 'author', $username);
    }

    public function getBooksByPublisher(Request $request, string $slug)
    {
        return $this->renderBooksByFilter($request, 'publisher', $slug);
    }
}
