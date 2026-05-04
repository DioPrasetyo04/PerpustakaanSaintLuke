<?php

namespace App\Interface;

interface ReturnBookInterfaceRepositories
{
    public function findBookBySlug(string $slug);

    public function createReturnBook(array $data);

    public function createReturnBookCheck(array $data);

    public function createFinePayment(array $data);

    public function getReturnBookByUser(int $userId, array $filters, int $perPage, int $page);

    public function getReturnBookDetail(int $userId, string $returnBookCode);

    public function createReviewBook(array $data);
}
