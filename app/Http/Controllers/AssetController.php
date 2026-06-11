<?php

namespace App\Http\Controllers;

use App\Enums\ConvertStatusTypes;
use App\Models\Asset;
use App\Services\AssetService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
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
            'loan' => $data['loan'],
            'totalAssets' => $data['total_assets'],
            // Status konfigurasi denda: dipakai untuk memunculkan popup
            // "Pengaturan Denda Belum Diatur" tanpa redirect saat tombol
            // Kembalikan ditekan (tanpa harus menavigasi ke halaman konfirmasi).
            'fineSettingsConfigured' => \App\Models\FineSettings::query()->exists(),
        ]);
    }

    public function stream($id)
    {
        $asset = Asset::findOrFail($id);

        if ($asset->status !== ConvertStatusTypes::READY) {
            abort(404, 'File not ready');
        }

        $path = $asset->pdf_path ?? $asset->utility_path;
        $fullPath = storage_path('app/public/' . $path);

        if (!file_exists($fullPath)) {
            abort(404, 'File not found');
        }

        $mime = mime_content_type($fullPath);

        return response()->stream(function () use ($fullPath) {
            readfile($fullPath);
        }, 200, [
            'Content-Type' => $mime,
            'Content-Length' => filesize($fullPath),
            'Content-Disposition' => 'inline; filename="' . basename($fullPath) . '"',
            'Accept-Ranges' => 'bytes',
            'Cache-Control' => 'public, max-age=3600',
            'Access-Control-Allow-Origin' => '*',
        ]);
    }
}
