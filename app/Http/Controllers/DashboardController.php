<?php

namespace App\Http\Controllers;

use App\Services\DashboardService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    protected DashboardService $dashboardService;

    public function __construct(DashboardService $dashboardService)
    {
        $this->dashboardService = $dashboardService;
    }

    public function index(Request $request)
    {
        $tab     = $request->get('tab', 'borrowed');
        $page    = (int) $request->get('page', 1);
        $perPage = (int) $request->get('per_page', 4);

        $filters = [
            'sortBy'    => $request->get('sortBy', 'Due Date'),
            'status'    => $request->get('status', 'All Status'),
            'category'  => $request->get('category', 'All Categories'),
            'dateRange' => $request->get('dateRange', 'All Time'),
        ];

        $loans       = $this->dashboardService->getLoansRaw($filters, $perPage, $page);
        $returnBooks = $this->dashboardService->getReturnBooksRaw($filters, $perPage, $page);

        return Inertia::render('dashboard', [
            'stats'       => $this->dashboardService->getStats(),
            'charts'      => $this->dashboardService->getCharts(),
            'loans'       => $this->dashboardService->transformLoans($loans),
            'returnBooks' => $this->dashboardService->transformReturnBooks($returnBooks),
            'categories'  => $this->dashboardService->getCategories(),
            'filters'     => $filters,
            'activeTab'   => $tab,
        ]);
    }
}
