<?php

namespace App\Http\Controllers;

use App\Enums\OnlineResourceType;
use App\Services\OnlineResourceServices;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ResourceController extends Controller
{
    protected $onlineResourceServices;

    public function __construct(OnlineResourceServices $onlineResourceServices)
    {
        $this->onlineResourceServices = $onlineResourceServices;
    }

    public function index(Request $request)
    {
        $filters = $request->only(['search', 'type']);

        $resources = $this->onlineResourceServices->getActiveResourcesRaw($filters);

        return Inertia::render('EResources/ResourcesPage', [
            'resources' => $this->onlineResourceServices->transformResources($resources),
            'filters' => [
                'search' => $filters['search'] ?? '',
                'type' => $filters['type'] ?? 'Semua',
            ],
            'typeOptions' => array_values(OnlineResourceType::options()),
        ]);
    }
}
