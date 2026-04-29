<?php

namespace App\Interface;


interface AssetInterfaceRepositories
{
    public function findBookWithAssets(string $slug);
}
