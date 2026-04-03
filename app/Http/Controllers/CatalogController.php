<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class CatalogController extends Controller
{
    public function catalog(Request $request)
    {
        return Inertia::render('catalog/CatalogPage', [
            'tab' => $request->get('tab', 'books'),
        ]);
    }
}
