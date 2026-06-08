<?php

namespace App\Http\Controllers;

use App\Services\OrganizationServices;
use Inertia\Inertia;
use Inertia\Response;

class OrganizationController extends Controller
{
    public function __construct(
        protected OrganizationServices $organizationServices
    ) {}

    public function index(): Response
    {
        return Inertia::render('about/OrganizationStructurePage', [
            'structure' => $this->organizationServices->getStructure(),
        ]);
    }
}
