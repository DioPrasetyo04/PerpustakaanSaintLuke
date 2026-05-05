<?php

namespace App\Enums;

enum ConvertStatusTypes: string
{
    case PROCESSING = 'Processing';
    case READY = 'Ready';
    case FAILED = 'Failed';

    public static function options(): array
    {
        return collect(self::cases())->map(fn($item) => [
            'label' => $item->name,
            'value' => $item->value
        ])->values()->toArray();
    }

    public static function values(): array
    {
        return collect(self::cases())->pluck('value')->toArray();
    }

    public function label(): string
    {
        return strtoupper($this->name);
    }
}
