<?php

namespace App\Services;

use App\Exceptions\BusinessException;
use App\Interface\BookmarkInterfaceRepositories;

class BookmarkService
{
    protected $bookmarkService;

    public function __construct(BookmarkInterfaceRepositories $bookmarkRepositories)
    {
        $this->bookmarkService = $bookmarkRepositories;
    }

    public function addBookmark(string $slug): array
    {
        $userId = auth()->id();

        $book = $this->bookmarkService->findBookBySlug($slug);

        if ($this->bookmarkService->exists($userId, $book->id)) {
            throw new BusinessException('bookmark.already_exists', 409, [
                'book_title' => $book->title,
            ]);
        }

        $this->bookmarkService->store($userId, $book->id);

        return [
            'id' => $book->id,
            'title' => $book->title,
            'slug' => $book->slug,
        ];
    }

    public function removeBookmark(string $slug): array
    {
        $userId = auth()->id();

        $book = $this->bookmarkService->findBookBySlug($slug);

        $deleted = $this->bookmarkService->destroy($userId, $book->id);

        if ($deleted === 0) {
            throw new BusinessException('bookmark.not_found', 404, [
                'book_title' => $book->title,
            ]);
        }

        return [
            'id' => $book->id,
            'title' => $book->title,
            'slug' => $book->slug,
        ];
    }
}
