<?php

namespace App\Http\Controllers;


use App\Enums\BookStatus;
use App\Models\Asset;
use App\Models\Author;
use App\Models\Book;
use App\Models\Category;
use App\Models\Language;
use App\Models\Publisher;
use App\Models\Type;
use App\Services\CatalogService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
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
        $bookLoad = (int) $request->get('books_load', 12);

        $booksPaginator = $this->catalogController->getBooksRaw($filters, $bookLoad, $bookPage);

        $yearBounds = Book::query()
            ->selectRaw('MIN(publication_year) as min_year, MAX(publication_year) as max_year')
            ->first();

        return Inertia::render('catalog/BooksPage', [
            'books' => $this->catalogController->transformBooks($booksPaginator),
            'state' => [
                'page' => $bookPage,
                'load' => $bookLoad,
                'search' => $request->search ?? '',
            ],
            'filters' => [
                'search' => $request->input('search', ''),
                'categories' => (array) $request->input('categories', []),
                'authors' => (array) $request->input('authors', []),
                'publishers' => (array) $request->input('publishers', []),
                'languages' => (array) $request->input('languages', []),
                'types' => (array) $request->input('types', []),
                'attachments' => (array) $request->input('attachments', []),
                'availability' => $request->input('availability', ''),
                'yearMin' => $request->input('yearMin'),
                'yearMax' => $request->input('yearMax'),
                'field' => $request->input('field', ''),
                'direction' => $request->input('direction', ''),
            ],
            'options' => [
                'statusOptions' => BookStatus::options(),
                'categories' => Category::query()
                    ->select(['id', 'name', 'icon'])
                    ->withCount('books as count_of_books')
                    ->orderBy('name')
                    ->get()
                    ->map(fn($c) => [
                        'id' => $c->id,
                        'name' => $c->name,
                        'icon' => $c->icon ? Storage::url($c->icon) : null,
                        'count_of_books' => $c->count_of_books,
                    ]),
                'authors' => Author::query()
                    ->select(['id', 'name', 'avatar'])
                    ->withCount('books as count_of_books')
                    ->orderBy('name')
                    ->get()
                    ->map(fn($a) => [
                        'id' => $a->id,
                        'name' => $a->name,
                        'avatar' => $a->avatar ? Storage::url($a->avatar) : null,
                        'count_of_books' => $a->count_of_books,
                    ]),
                'publishers' => Publisher::query()
                    ->select(['id', 'name', 'logo'])
                    ->withCount('books as count_of_books')
                    ->orderBy('name')
                    ->get()
                    ->map(fn($p) => [
                        'id' => $p->id,
                        'name' => $p->name,
                        'logo' => $p->logo ? Storage::url($p->logo) : null,
                        'count_of_books' => $p->count_of_books,
                    ]),
                'languages' => Language::query()
                    ->select(['id', 'language', 'photo'])
                    ->withCount('books as count_of_books')
                    ->orderBy('language')
                    ->get()
                    ->map(fn($l) => [
                        'id' => $l->id,
                        'language' => $l->language,
                        'photo' => $l->photo ? Storage::url($l->photo) : null,
                        'count_of_books' => $l->count_of_books,
                    ]),
                'types' => Type::query()->select(['id', 'type', 'icon'])->orderBy('type')->get(),
                'attachments' => Asset::query()->select('type')->distinct()->orderBy('type')->pluck('type'),
                'yearBounds' => [
                    'min' => (int) ($yearBounds->min_year ?? 2000),
                    'max' => (int) ($yearBounds->max_year ?? (int) date('Y')),
                ],
            ],
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
        $authorLoad = (int) $request->get('authors_load', 12);

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
        $publisherLoad = (int) $request->get('publishers_load', 12);

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
