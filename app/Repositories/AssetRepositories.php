<?php

namespace App\Repositories;

use App\Interface\AssetInterfaceRepositories;
use App\Models\Book;

class AssetRepositories implements AssetInterfaceRepositories
{
    public function findBookWithAssets(string $slug)
    {
        return Book::query()
            ->select(['id', 'title', 'slug'])
            ->where('slug', $slug)
            ->with([
                'assets:id,type,utility_path',
                'authors:id,name,username,avatar',
                'categories:id,name,icon',
            ])
            ->firstOrFail();
    }
}
