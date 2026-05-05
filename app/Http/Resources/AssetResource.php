<?php

namespace App\Http\Resources;

use App\Enums\ConvertStatusTypes;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Str;

class AssetResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $extension = Str::lower(pathinfo($this->utility_path, PATHINFO_EXTENSION));

        return [
            'id' => $this->id,

            // untuk logic backend
            'type' => $this->type,

            // 🔥 untuk frontend UI (icon & warna)
            'file_type' => $this->mapFileType($extension),

            // 'url' => Storage::url($this->utility_path),

            // ✅ hanya kasih url jika READY
            'url' => $this->status === ConvertStatusTypes::READY
                ? route('assets.stream', $this->id)
                : null,

            'status' => $this->status?->value,

            // optional (bagus buat debug / UI)
            'meta' => [
                'extension' => $extension,
                'original_name' => basename($this->utility_path),
            ],
        ];
    }

    private function mapFileType(string $ext): string
    {
        return match ($ext) {
            'pdf' => 'pdf',

            'doc', 'docx' => 'word',
            'xls', 'xlsx' => 'excel',

            'jpg', 'jpeg', 'png', 'webp' => 'image',

            'mp3', 'wav', 'aac' => 'audio',

            'mp4', 'avi', 'mov', 'mkv' => 'video',

            default => 'unknown',
        };
    }
}
