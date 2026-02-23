<?php

namespace App\Enums;

enum AssetTypes: string
{
    case FILE = "Asset-File";
    case RESOURCES = "Asset-Resources";

    public static function values(): array
    {
        return collect(self::cases())->pluck('value')->toArray();
    }

    public function label(): string
    {
        return strtoupper($this->name);
    }

    public static function options(): array
    {
        return collect(self::cases())->mapWithKeys(fn($item) => [
            $item->value => $item->label()
        ])->toArray();
    }

    public function allowedMimes(): array
    {
        return match ($this) {
            self::FILE => [
                'application/pdf',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            ],
            self::RESOURCES => [
                'image/jpeg',
                'image/png',
                'image/webp',
                'audio/mpeg',
                'audio/wav',
                'audio/aac',
                'video/mp4',
                'video/x-msvideo',
                'video/quicktime',
                'video/x-matroska',
            ],
        };
    }
}
