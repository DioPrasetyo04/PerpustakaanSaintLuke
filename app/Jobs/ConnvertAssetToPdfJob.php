<?php

namespace App\Jobs;

use App\Enums\ConvertStatusTypes;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Log;

class ConnvertAssetToPdfJob implements ShouldQueue
{
    use Queueable;

    public function __construct(public $asset)
    {
        //
    }

    public function handle(): void
    {
        $inputPath = storage_path('app/public/' . $this->asset->utility_path);
        $outputDir = storage_path('app/public/books/converted');

        if (!file_exists($outputDir)) {
            mkdir($outputDir, 0777, true);
        }

        $command = sprintf(
            '"C:\Program Files\LibreOffice\program\soffice.exe" --headless --convert-to pdf "%s" --outdir "%s"',
            $inputPath,
            $outputDir,
        );

        exec($command, $output, $resultCode);


        $pdfName = pathinfo($inputPath, PATHINFO_FILENAME) . '.pdf';
        $fullPdfPath = $outputDir . '/' . $pdfName;


        if ($resultCode !== 0) {

            $this->asset->update([
                'status' => ConvertStatusTypes::FAILED
            ]);
            return;
        }

        $pdfPath = 'books/converted/' . $pdfName;


        $this->asset->update([
            'pdf_path' => $pdfPath,
            'status' => ConvertStatusTypes::READY
        ]);
    }
}
