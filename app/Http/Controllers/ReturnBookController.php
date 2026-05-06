<?php

namespace App\Http\Controllers;

use App\Http\Requests\ReturnBookRequest;
use App\Services\ReturnBookService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReturnBookController extends Controller
{
    protected $returnController;

    public function __construct(ReturnBookService $service)
    {
        $this->returnController = $service;
    }

    public function confirmation(string $slug, string $loanCode)
    {
        $data = $this->returnController->getConfirmationReturnBookUserAuth($slug, $loanCode, auth()->id());

        return Inertia::render('book/return/Confirmation', [
            'data' => $data
        ]);
    }

    public function store(ReturnBookRequest $request, string $slug)
    {
        $validated = $request->validated();

        $return = $this->returnController->processReturnBook(
            $validated,
            auth()->id(),
            $slug
        );

        return redirect()
            ->route('home', $return->return_book_code)
            ->with('success', 'data.success');
    }


    public function detail(string $returnCode)
    {
        $data = $this->returnController->getDetailReturnBookUserAuth($returnCode);

        return Inertia::render('book/return/Detail', [
            'data' => $data
        ]);
    }

    public function index()
    {
        return Inertia::render('book/return/Index');
    }
}
