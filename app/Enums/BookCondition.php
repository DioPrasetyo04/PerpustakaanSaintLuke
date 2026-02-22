<?php

namespace App\Enums;

enum BookCondition: string
{
    case GOOD = "Baik";
    case DAMAGED = "Rusak";
    case LOST = "Hilang";

    public static function options(): array
    {
        return collect(self::cases())->map(fn($item) => [
            'label' => $item->name,
            'value' => $item->value
        ])->toValues()->toArray();
    }
}
