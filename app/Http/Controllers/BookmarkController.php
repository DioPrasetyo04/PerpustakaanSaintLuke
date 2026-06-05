<?php

namespace App\Http\Controllers;

use App\Services\BookmarkService;
use Inertia\Inertia;

class BookmarkController extends Controller
{
    protected $bookmarkController;

    public function __construct(BookmarkService $bookmarkService)
    {
        $this->bookmarkController = $bookmarkService;
    }

    public function store(string $slug)
    {
        // Bookmark hanya untuk akun yang sudah terverifikasi emailnya
        // (mis. akun yang masuk via Google belum terverifikasi).
        if (! auth()->user()->hasVerifiedEmail()) {
            return Inertia::location(route('verification.notice'));
        }

        $this->bookmarkController->addBookmark($slug);

        return back();
    }

    public function destroy(string $slug)
    {
        $this->bookmarkController->removeBookmark($slug);

        return back();
    }
}
