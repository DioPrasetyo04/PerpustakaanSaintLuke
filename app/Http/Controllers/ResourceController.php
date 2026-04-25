<?php

namespace App\Http\Controllers;

use App\Enums\BookStatus;
use App\Models\Author;
use App\Models\Category;
use App\Models\Publisher;
use App\Services\ResourceServices;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
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
            'publisher',
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
            'authorsOptions' => Author::select(['id', 'name'])
                ->get()
                ->map(function ($author) {
                    return [
                        'id' => $author->id,
                        'name' => $author->name,
                        'avatar' => $author->avatar,
                    ];
                }),
            'categoriesOptions' => Category::select(['id', 'name'])
                ->get()
                ->map(function ($category) {
                    return [
                        'id' => $category->id,
                        'name' => $category->name,
                        'icon' => $category->icon
                    ];
                }),
            'publishersOptions' => Publisher::select(['id', 'name', 'logo'])
                ->get()
                ->map(function ($publisher) {
                    return [
                        'id' => $publisher->id,
                        'name' => $publisher->name,
                        'logo' => $publisher->logo
                            ? Storage::url($publisher->logo)
                            : null,
                    ];
                }),
        ]);
    }
}
