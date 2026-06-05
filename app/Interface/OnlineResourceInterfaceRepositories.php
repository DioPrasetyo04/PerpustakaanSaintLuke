<?php

namespace App\Interface;

use Illuminate\Support\Collection;

interface OnlineResourceInterfaceRepositories
{
    public function getActiveResources(array $filters): Collection;
}
