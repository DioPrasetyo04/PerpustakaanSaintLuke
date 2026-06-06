<?php

namespace App\Interface;

interface HistoryInterfaceRepositories
{
    public function getBookmarksByUser(int $userId, array $filters, int $perPage, int $page);

    public function getLoansByUser(int $userId, array $filters, int $perPage, int $page);

    public function getReturnsByUser(int $userId, array $filters, int $perPage, int $page);

    public function getFinesByUser(int $userId, array $filters, int $perPage, int $page);

    public function getBookmarkStats(int $userId): array;

    public function getLoanStats(int $userId): array;

    public function getReturnStats(int $userId): array;

    public function getFineStats(int $userId): array;
}
