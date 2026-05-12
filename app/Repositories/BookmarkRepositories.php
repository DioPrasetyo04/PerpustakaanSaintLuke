<?php

namespace App\Repositories;

use App\Interface\BookmarkInterfaceRepositories;
use App\Models\Book;
use Illuminate\Support\Facades\DB;

class BookmarkRepositories implements BookmarkInterfaceRepositories
{
    public function findBookBySlug(string $slug)
    {
        return Book::query()
            ->select(['id', 'title', 'slug'])
            ->where('slug', $slug)
            ->firstOrFail();
    }

    public function exists(int $userId, int $bookId): bool
    {
        return DB::table('bookmarks')
            ->where('user_id', $userId)
            ->where('book_id', $bookId)
            ->exists();
    }

    public function store(int $userId, int $bookId): void
    {
        DB::table('bookmarks')->insert([
            'user_id' => $userId,
            'book_id' => $bookId,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }

    public function destroy(int $userId, int $bookId): int
    {
        return DB::table('bookmarks')
            ->where('user_id', $userId)
            ->where('book_id', $bookId)
            ->delete();
    }
}
