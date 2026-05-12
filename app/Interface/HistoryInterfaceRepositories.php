<?php

namespace App\Interface;

interface HistoryInterfaceRepositories
{
    public function getBookmarksByUser(int $userId, array $filters, int $perPage, int $page);

    public function getLoansByUser(int $userId, array $filters, int $perPage, int $page);

    public function getReturnsByUser(int $userId, array $filters, int $perPage, int $page);

    public function getFinesByUser(int $userId, array $filters, int $perPage, int $page);
}
