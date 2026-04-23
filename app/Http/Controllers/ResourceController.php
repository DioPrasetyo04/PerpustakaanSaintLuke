<?php

namespace App\Http\Controllers;

use App\Enums\BookStatus;
use App\Models\Author;
use App\Models\Category;
use App\Models\Publisher;
use App\Services\ResourceServices;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ResourceController extends Controller
{
    protected $resourcesController;

    public function __construct(ResourceServices $resourceServices)
    {
        $this->resourcesController = $resourceServices;
    }
    public function index(Request $request)
    {
        $filters = $request->only([
            'search',
            'categories',
            'authors',
            'publishers',
            'availability',
            'field',
            'direction',
        ]);
        $resourcePage = (int) $request->get('resources_page', 1);
        $resourceLoad = (int) $request->get('resources_load', 10);
        $resourcePaginator = $this->resourcesController->getAllDataRaw($filters, $resourceLoad, $resourcePage);
        // dd([
        //     $this->resourcesController->transformBooksData($resourcePaginator)
        // ]);
        return Inertia::render('EResources/ResourcesPage', [
            'resources' => $this->resourcesController->transformBooksData($resourcePaginator),
            'filters' => $filters,
            'statusOptions' => BookStatus::options(),
            'authorsOptions' => Author::select(['id', 'name', 'avatar'])->get(),
            'categoriesOptions' => Category::select(['id', 'name', 'icon'])->get(),
            'publishersOptions' => Publisher::select(['id', 'name', 'logo'])->get(),
        ]);
    }
}
