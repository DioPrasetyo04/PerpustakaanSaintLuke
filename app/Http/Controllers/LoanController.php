<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoanRequest;
use App\Services\LoanService;
use Exception;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Throwable;

class LoanController extends Controller
{
    protected $loanController;

    public function __construct(LoanService $loanService)
    {
        $this->loanController = $loanService;
    }

    public function index(Request $request)
    {
        $filters = $request->only(['search', 'field', 'direction']);
        $page = (int) $request->get('page', 1);
        $perPage = (int) $request->get('per_page', 10);

        $loans = $this->loanController->getDataLoanUserAuth($filters, $perPage, $page);

        return Inertia::render('Dashboard/Loans', [
            'loans' => $loans
        ]);
    }

    public function confirmation(string $slug)
    {
        $data = $this->loanController->getConfirmationLoanUserAuth($slug);

        return Inertia::render('Loan/Confirm', [
            'book' => $data['book'],
            'loanPreview' => $data['loan_preview']
        ]);
    }

    public function store(LoanRequest $request)
    {
        $data = $request->validated();

        $loan = $this->loanController->postDataLoanUserAuth($data);

        return redirect()->route('book.assets', [
            'slug' => $loan->book->slug
        ])->with('success', 'loan.success');
    }
}
