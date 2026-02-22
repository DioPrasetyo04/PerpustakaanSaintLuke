<?php

namespace App\Enums;

enum UserGender: string
{
    case MALE = "Laki-laki";

    case FEMALE = "Perempuan";

    public static function options(): array
    {
        return collect(self::cases())->map(fn($item) => [
            'label' => $item->value,
            'value' => $item->value,
        ])->values()->toArray();
    }
}
