<?php

namespace App\Interface;

interface BookmarkInterfaceRepositories
{
    public function findBookBySlug(string $slug);

    public function exists(int $userId, int $bookId): bool;

    public function store(int $userId, int $bookId): void;

    public function destroy(int $userId, int $bookId): int;
}
