<?php

namespace App\Enums;

enum LoanStatus: string
{
    case LOANED = 'loaned';
    case PARTIAL_RETURNED = 'partial returned';
    case RETURNED = 'returned';

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
}
