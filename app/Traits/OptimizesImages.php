<?php

namespace App\Traits;

use Illuminate\Support\Facades\Storage;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

trait OptimizesImages
{
    public function optimizeImage($path, $maxSize = 2000000)
    {
        if (!$path || !Storage::disk('public')->exists($path)) {
            return;
        }

        $fullPath = storage_path('app/public/' . $path);

        $manager = new ImageManager(new Driver());

        $quality = 85;

        do {
            $image = $manager->read($fullPath)
                // ->resize($maxWidth, null)
                ->toWebp($quality);

            $image->save($fullPath);

            $quality -= 5;
        } while (filesize($fullPath) > $maxSize && $quality > 30);
    }
}
