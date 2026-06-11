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
        $inputPath = storage_path('app/public/'.$this->asset->utility_path);
        $outputDir = storage_path('app/public/books/converted');

        if (! file_exists($outputDir)) {
            mkdir($outputDir, 0777, true);
        }

        // Binary LibreOffice diambil dari config (env LIBREOFFICE_BINARY) supaya portable:
        // Windows lokal  -> "C:\Program Files\LibreOffice\program\soffice.exe"
        // Linux / cPanel -> "soffice" atau "libreoffice" (selama ada di PATH server)
        $binary = config('services.libreoffice.binary', 'soffice');

        $command = sprintf(
            '%s --headless --convert-to pdf %s --outdir %s 2>&1',
            escapeshellarg($binary),
            escapeshellarg($inputPath),
            escapeshellarg($outputDir),
        );

        exec($command, $output, $resultCode);

        if ($resultCode !== 0) {
            Log::error('LibreOffice convert gagal', [
                'binary' => $binary,
                'input' => $inputPath,
                'result_code' => $resultCode,
                'output' => $output,
            ]);
        }

        $pdfName = pathinfo($inputPath, PATHINFO_FILENAME).'.pdf';
        $fullPdfPath = $outputDir.'/'.$pdfName;

        if ($resultCode !== 0) {

            $this->asset->update([
                'status' => ConvertStatusTypes::FAILED,
            ]);

            return;
        }

        $pdfPath = 'books/converted/'.$pdfName;

        $this->asset->update([
            'pdf_path' => $pdfPath,
            'status' => ConvertStatusTypes::READY,
        ]);
    }
}
