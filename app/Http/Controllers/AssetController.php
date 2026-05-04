<?php

namespace App\Http\Controllers;

use App\Models\Asset;
use App\Services\AssetService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Inertia\Inertia;

class AssetController extends Controller
{
    protected $assetService;

    public function __construct(AssetService $assetService)
    {
        $this->assetService = $assetService;
    }

    public function index(string $slug)
    {
        $data = $this->assetService->getAssetBookOfLoan($slug);

        // dd([
        //     'book' => $data['book'],
        //     'assets' => $data['assets'],
        //     'totalAssets' => $data['total_assets'],
        // ]); 

        return Inertia::render('book/asset/assets', [
            'book' => $data['book'],
            'assets' => $data['assets'],
            'totalAssets' => $data['total_assets'],
        ]);
    }
}
