<?php

namespace App\Enums;

enum ReturnBookStatus: string
{
    case RETURNED = "Dikembalikan";
    case CHECKED = "Pengecekan";
    case COST = "Denda";

    public function options(): array
    {
        return collect(self::cases())->map(fn($item) => [
            'label' => $item->name,
            'value' => $item->value
        ])->values()->toArray();
    }
}
