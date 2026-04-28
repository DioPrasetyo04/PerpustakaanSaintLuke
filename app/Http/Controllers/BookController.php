<?php

namespace App\Http\Controllers;

use App\Http\Resources\BookResource;
use App\Services\BookServices;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookController extends Controller
{
    protected $bookController;
    public function __construct(BookServices $bookServices)
    {
        $this->bookController = $bookServices;
    }

    public function detailBook(Request $request, string $slug)
    {
        $filters = $request->only(['field', 'direction']);
        $recomendedBookPage = (int) $request->get('recommended_books_page', 1);
        $recomendedBookLoad = (int) $request->get('recommended_books_load', 10);
        $reviewBookPage = (int) $request->get('review_books_page', 1);
        $reviewBookLoad = (int) $request->get('review_books_load', 10);
        $dataDetailBook = $this->bookController->getDetailBookRaw($slug);
        $dataRecomendedBooks = $this->bookController->getRecomendedBookRaw($recomendedBookLoad, $recomendedBookPage);
        $dataReviewsBook = $this->bookController->getReviewBookRaw($filters, $slug, $reviewBookLoad, $reviewBookPage);

        // $allData = [
        //     'book' => BookResource::make($dataDetailBook)->resolve(),
        //     'recomended_books' => $this->bookController->transformBooks($dataRecomendedBooks),
        //     'reviews' => $this->bookController->transformReviewBooks($dataReviewsBook),
        //     'state' => [
        //         'recomended_books_page' => $recomendedBookPage,
        //         'recomended_books_load' => $recomendedBookLoad,
        //         'review_books_page' => $reviewBookPage,
        //         'review_books_load' => $reviewBookLoad,
        //     ],
        // ];
        // dd($allData);

        return Inertia::render('book/show', [
            'book' => BookResource::make($dataDetailBook)->resolve(),
            'recomendedBooks' => $this->bookController->transformBooks($dataRecomendedBooks),
            'reviews' => $this->bookController->transformReviewBooks($dataReviewsBook),
            'state' => [
                'recomended_books_page' => $recomendedBookPage,
                'recomended_books_load' => $recomendedBookLoad,
                'review_books_page' => $reviewBookPage,
                'review_books_load' => $reviewBookLoad,
            ],
        ]);
    }
}
