<?php

namespace App\Enums;

enum Days: string
{
    case MONDAY = 'Senin';
    case TUESDAY = 'Selasa';
    case WEDNESDAY = 'Rabu';
    case THURSDAY = 'Kamis';
    case FRIDAY = 'Jumat';
    case SATURDAY = 'Sabtu';
    case SUNDAY = 'Minggu';

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
