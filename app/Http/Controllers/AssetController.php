<?php

namespace App\Http\Controllers;

use App\Models\Asset;
use App\Services\AssetService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AssetController extends Controller
{
    protected $assetController;

    public function __construct(AssetService $assetService)
    {
        $this->assetController = $assetService;
    }

    public function index(string $slug)
    {
        $data = $this->assetController->getAssetBookOfLoan($slug);

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

    public function stream($id)
    {
        $user = auth()->user();

        $asset = Asset::query()
            ->where('id', $id)
            ->whereHas('books.loan', function ($q) use ($user) {
                $q->where('user_id', $user->id)
                    ->whereDoesntHave('returnBook');
            })
            ->firstOrFail();

        $path = storage_path('app/' . $asset->utility_path);

        return response()->file($path, [
            'Content-Disposition' => 'inline',
        ]);
    }
}
