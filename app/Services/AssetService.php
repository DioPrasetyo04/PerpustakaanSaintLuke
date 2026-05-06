<?php

namespace App\Services;

use App\Enums\ConvertStatusTypes;
use App\Http\Resources\AssetResource;
use App\Http\Resources\BookResource;
use App\Http\Resources\LoanResource;
use App\Interface\AssetInterfaceRepositories;
use App\Jobs\ConnvertAssetToPdfJob;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Support\Str;

class AssetService
{
    protected $assetService;

    public function __construct(AssetInterfaceRepositories $assetRepositories)
    {
        $this->assetService = $assetRepositories;
    }

    public function getAssetBookOfLoan(string $bookSlug)
    {
        $bookAssets = $this->assetService->findBookWithAssets($bookSlug);

        $loan = $this->assetService->getDataLoanWithAuthUser($bookAssets->id);

        $convertable = ['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'];

        // 🔥 double security (optional tapi recommended)
        if ($bookAssets->loan->isEmpty()) {
            throw new AuthorizationException('You do not have access to this book');
        }

        foreach ($bookAssets->assets as $asset) {
            $ext = Str::lower(pathinfo($asset->utility_path, PATHINFO_EXTENSION));

            if (in_array($ext, $convertable)) {
                if (
                    !$asset->pdf_path &&
                    $asset->status !== ConvertStatusTypes::PROCESSING
                ) {
                    $asset->update([
                        'status' => ConvertStatusTypes::PROCESSING
                    ]);

                    ConnvertAssetToPdfJob::dispatch($asset);
                }

                continue; // ⛔ penting biar tidak lanjut ke bawah
            }

            /**
             * 🔥 2. FILE NON-CONVERT (IMAGE, VIDEO, AUDIO, PDF)
             */
            if ($asset->status !== ConvertStatusTypes::READY) {
                $asset->update([
                    'status' => ConvertStatusTypes::READY
                ]);
            }
        }


        return [
            'book' => BookResource::make($bookAssets)->resolve(),
            'assets' => AssetResource::collection($bookAssets->assets)->resolve(),
            'loan' => LoanResource::make($loan)->resolve(),
            'total_assets' => $bookAssets->assets->count(),
        ];
    }
}
