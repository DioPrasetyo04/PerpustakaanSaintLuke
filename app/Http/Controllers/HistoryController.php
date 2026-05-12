<?php

namespace App\Http\Controllers;

use App\Services\HistoryService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HistoryController extends Controller
{
    protected $historyController;

    public function __construct(HistoryService $historyService)
    {
        $this->historyController = $historyService;
    }

    public function index(Request $request)
    {
        $bookmarksFilters = [
            'search' => $request->string('bookmarks_search')->toString() ?: null,
            'status' => $request->string('bookmarks_status')->toString() ?: null,
        ];
        $bookmarksPage = (int) $request->input('bookmarks_page', 1);
        $bookmarksPerPage = (int) $request->input('bookmarks_per_page', 5);

        $loansFilters = [
            'search' => $request->string('loans_search')->toString() ?: null,
            'status' => $request->string('loans_status')->toString() ?: null,
        ];
        $loansPage = (int) $request->input('loans_page', 1);
        $loansPerPage = (int) $request->input('loans_per_page', 5);

        $returnsFilters = [
            'search' => $request->string('returns_search')->toString() ?: null,
            'status' => $request->string('returns_status')->toString() ?: null,
        ];
        $returnsPage = (int) $request->input('returns_page', 1);
        $returnsPerPage = (int) $request->input('returns_per_page', 5);

        $finesFilters = [
            'search' => $request->string('fines_search')->toString() ?: null,
            'status' => $request->string('fines_status')->toString() ?: null,
        ];
        $finesPage = (int) $request->input('fines_page', 1);
        $finesPerPage = (int) $request->input('fines_per_page', 5);

        $activeTab = $request->string('tab')->toString() ?: 'bookmarks';

        return Inertia::render('user/history', [
            'activeTab' => $activeTab,
            'bookmarks' => fn() => $this->historyController->getBookmarks(
                $bookmarksFilters,
                $bookmarksPerPage,
                $bookmarksPage,
            ),
            'loans' => fn() => $this->historyController->getLoans(
                $loansFilters,
                $loansPerPage,
                $loansPage,
            ),
            'returns' => fn() => $this->historyController->getReturns(
                $returnsFilters,
                $returnsPerPage,
                $returnsPage,
            ),
            'fines' => fn() => $this->historyController->getFines(
                $finesFilters,
                $finesPerPage,
                $finesPage,
            ),
            'filters' => [
                'bookmarks' => array_merge($bookmarksFilters, [
                    'page' => $bookmarksPage,
                    'per_page' => $bookmarksPerPage,
                ]),
                'loans' => array_merge($loansFilters, [
                    'page' => $loansPage,
                    'per_page' => $loansPerPage,
                ]),
                'returns' => array_merge($returnsFilters, [
                    'page' => $returnsPage,
                    'per_page' => $returnsPerPage,
                ]),
                'fines' => array_merge($finesFilters, [
                    'page' => $finesPage,
                    'per_page' => $finesPerPage,
                ]),
            ],
        ]);
    }
}
