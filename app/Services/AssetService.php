<?php

namespace App\Services;

use App\Http\Resources\AssetResource;
use App\Http\Resources\BookResource;
use App\Interface\AssetInterfaceRepositories;
use Illuminate\Auth\Access\AuthorizationException;

class AssetService
{
    protected $assetService;

    public function __construct(AssetInterfaceRepositories $assetRepositories)
    {
        $this->assetService = $assetRepositories;
    }

    public function getAssetBookOfLoan(string $bookSlug)
    {
        $bookAssets =  $this->assetService->findBookWithAssets($bookSlug);

        return [
            'book' => BookResource::make($bookAssets)->resolve(),
            'assets' => AssetResource::collection($bookAssets->assets)->resolve(),
            'total_assets' => $bookAssets->assets->count(),
        ];
    }
}
