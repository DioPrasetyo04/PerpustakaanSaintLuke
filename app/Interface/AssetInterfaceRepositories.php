<?php

namespace App\Interface;


interface AssetInterfaceRepositories
{
    public function findBookWithAssets(string $slug);

    public function getDataLoanWithAuthUser(int $bookId);
}
