<?php

namespace App\Enums;

enum ReturnBookStatus: string
{
    case RETURNED = "Dikembalikan";
    case CHECKED = "Pengecekan";
    case COST = "Denda";

    public static function values(): array
    {
        return collect(self::cases())->pluck('value')->toArray();
    }

    public function label(): string
    {
        return $this->value;
    }

    public static function options(): array
    {
        return collect(self::cases())->mapWithKeys(fn($item) => [
            $item->value => $item->label()
        ])->toArray();
    }
}
