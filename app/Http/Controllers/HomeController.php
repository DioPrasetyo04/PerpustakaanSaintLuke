<?php

namespace App\Http\Controllers;

use App\Services\HomeServices;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    protected HomeServices $homeController;

    public function __construct(HomeServices $homeServices)
    {
        $this->homeController = $homeServices;
    }

    public function index(Request $request)
    {
        $filters      = $request->all();
        $bookPage     = (int) $request->query('books_page', 1);
        $bookLoad     = (int) $request->query('books_load', 10);
        $categoryPage = (int) $request->query('categories_page', 1);
        $categoryLoad = (int) $request->query('categories_load', 10);
        $infoPage     = (int) $request->query('informations_page', 1);
        $infoLoad     = (int) $request->query('informations_load', 10);

        $booksPaginator        = $this->homeController->getBooksRaw($filters, $bookLoad, $bookPage);
        $categoriesPaginator   = $this->homeController->getCategoriesRaw($filters, $categoryLoad, $categoryPage);
        $informationsPaginator = $this->homeController->getInformationsRaw($filters, $infoLoad, $infoPage);

        return Inertia::render('home', [
            'data' => [
                'books'                => $this->homeController->transformBooks($booksPaginator),
                'categories'           => $this->homeController->transformCategories($categoriesPaginator),
                'informations'         => $this->homeController->transformInformations($informationsPaginator),
                'count_of_all_books'   => $this->homeController->getAllCountOfBooks(),
                'count_of_all_visitors' => $this->homeController->getAllCountOfVisitors(),
                'count_of_all_users'   => $this->homeController->getAllCountOfUsers(),
                'charts'               => $this->homeController->getCharts(),
            ],
            'state' => [
                'books' => [
                    'page' => $bookPage,
                    'load' => $bookLoad,
                ],
                'categories' => [
                    'page' => $categoryPage,
                    'load' => $categoryLoad,
                ],
                'informations' => [
                    'page' => $infoPage,
                    'load' => $infoLoad,
                ],
                'search' => $request->search ?? '',
            ],
        ]);
    }
}
