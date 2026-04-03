<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        return Inertia::render('home');
    }

    public function catalog()
    {
        return Inertia::render('catalog');
    }

    public function bookDetail(string $id)
    {
        return Inertia::render('book/show', [
            'id' => $id,
        ]);
    }

    public function announcements()
    {
        return Inertia::render('announcements/index');
    }
}
