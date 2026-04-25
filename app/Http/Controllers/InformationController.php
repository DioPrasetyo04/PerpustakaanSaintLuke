<?php

namespace App\Http\Controllers;

use App\Http\Resources\InformationResource;
use App\Services\InformationService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InformationController extends Controller
{
    protected $informationController;

    public function __construct(InformationService $informationService)
    {
        $this->informationController = $informationService;
    }

    public function index(Request $request)
    {
        $filters = $request->only([
            'search',
            'field',
            'direction'
        ]);

        $informationsPage = (int) $request->get('informations_page', 1);
        $informationsLoad = (int) $request->get('informations_load', 10);

        $dataAllInformationsRaw = $this->informationController->getAllInformations($filters, $informationsLoad, $informationsPage);

        // dd([
        //     'informationsData' => $this->informationController->transformDataInformations($dataAllInformationsRaw),
        //     'state' => [
        //         'search' => $request->search ?? '',
        //         'page' => $informationsPage,
        //         'load' => $informationsLoad
        //     ],
        // ]);

        return Inertia::render('informations/InformationsPage', [
            'informationsData' => $this->informationController->transformDataInformations($dataAllInformationsRaw),
            'state' => [
                'search' => $request->search ?? '',
                'page' => $informationsPage,
                'load' => $informationsLoad
            ]
        ]);
    }

    public function detail(string $slug)
    {
        $dataDetailInformation = $this->informationController->getDetailInformation($slug);

        // dd([
        //     'information_detail' => InformationResource::make($dataDetailInformation)->resolve()
        // ]);

        return Inertia::render('informations/show', [
            'detailInfo' => InformationResource::make($dataDetailInformation)->resolve()
        ]);
    }
}
