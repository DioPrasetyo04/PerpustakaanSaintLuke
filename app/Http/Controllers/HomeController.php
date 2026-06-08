<?php

namespace App\Http\Controllers;

use App\Services\EventServices;
use App\Services\HomeServices;
use App\Services\TestimonialServices;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    protected HomeServices $homeController;

    protected TestimonialServices $testimonialServices;

    protected EventServices $eventServices;

    public function __construct(HomeServices $homeServices, TestimonialServices $testimonialServices, EventServices $eventServices)
    {
        $this->homeController = $homeServices;
        $this->testimonialServices = $testimonialServices;
        $this->eventServices = $eventServices;
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
        $publisherPage   = (int) $request->query('publishers_page', 1);
        $publisherLoad   = (int) $request->query('publishers_load', 8);
        $testimonialPage = (int) $request->query('testimonials_page', 1);
        $testimonialLoad = (int) $request->query('testimonials_load', 8);
        $eventPage       = (int) $request->query('events_page', 1);
        $eventLoad       = (int) $request->query('events_load', 8);

        $booksPaginator        = $this->homeController->getBooksRaw($filters, $bookLoad, $bookPage);
        $categoriesPaginator   = $this->homeController->getCategoriesRaw($filters, $categoryLoad, $categoryPage);
        $informationsPaginator = $this->homeController->getInformationsRaw($filters, $infoLoad, $infoPage);
        $publishersPaginator   = $this->homeController->getFeaturedPublishersRaw($publisherLoad, $publisherPage);
        $testimonialsPaginator = $this->testimonialServices->getTestimonialsRaw($testimonialLoad, $testimonialPage);
        $eventsPaginator       = $this->eventServices->getEventsRaw($eventLoad, $eventPage);

        return Inertia::render('home', [
            'data' => [
                'books'                => $this->homeController->transformBooks($booksPaginator),
                'categories'           => $this->homeController->transformCategories($categoriesPaginator),
                'informations'         => $this->homeController->transformInformations($informationsPaginator),
                'trending_books'       => $this->homeController->getTrendingBooks(),
                'spotlight_book'       => $this->homeController->getSpotlightBook(),
                'live_activities'      => $this->homeController->getLiveActivities(),
                'publishers'           => $this->homeController->transformFeaturedPublishers($publishersPaginator),
                'testimonials'         => $this->testimonialServices->transformTestimonials($testimonialsPaginator),
                'events'               => $this->eventServices->transformEvents($eventsPaginator),
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
                'publishers' => [
                    'page' => $publisherPage,
                    'load' => $publisherLoad,
                ],
                'testimonials' => [
                    'page' => $testimonialPage,
                    'load' => $testimonialLoad,
                ],
                'events' => [
                    'page' => $eventPage,
                    'load' => $eventLoad,
                ],
                'search' => $request->search ?? '',
            ],
        ]);
    }
}
