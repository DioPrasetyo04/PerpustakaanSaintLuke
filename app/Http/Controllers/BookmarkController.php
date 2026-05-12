<?php

namespace App\Http\Controllers;

use App\Services\BookmarkService;

class BookmarkController extends Controller
{
    protected $bookmarkController;

    public function __construct(BookmarkService $bookmarkService)
    {
        $this->bookmarkController = $bookmarkService;
    }

    public function store(string $slug)
    {
        $this->bookmarkController->addBookmark($slug);

        return back();
    }

    public function destroy(string $slug)
    {
        $this->bookmarkController->removeBookmark($slug);

        return back();
    }
}
