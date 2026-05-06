<?php

namespace App\Http\Controllers;

use App\Services\ReturnBookService;
use Inertia\Inertia;

class ReturnBookController extends Controller
{
    protected $returnController;

    public function __construct(ReturnBookService $service)
    {
        $this->returnController = $service;
    }

    public function confirmation($slug, $loanCode)
    {
        $data = $this->returnController->getConfirmationReturnBookUserAuth($slug, $loanCode, auth()->id());

        dd([
            'data' => $data
        ]);

        return Inertia::render('book/return/Confirmation', [
            'data' => $data
        ]);
    }
}
