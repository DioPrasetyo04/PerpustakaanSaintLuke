<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use ReturnBookService;

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
