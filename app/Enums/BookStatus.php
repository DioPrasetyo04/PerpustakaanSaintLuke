<?php

namespace App\Enums;

enum BookStatus: string
{
    case AVAILABLE = "Tersedia";
    case UNAVAILABLE = "Tidak Tersedia";
    case LOAN = "Dipinjam";
    case LOST = "Hilang";
    case DAMAGED = "Rusak";

    public function label(): string
    {
        return match ($this) {
            self::AVAILABLE => 'Tersedia',
            self::UNAVAILABLE => 'Tidak Tersedia',
            self::LOAN => 'Dipinjam',
            self::LOST => 'Hilang',
            self::DAMAGED => 'Rusak',
        };
    }

    public static function options(): array
    {
        return collect(self::cases())
            ->mapWithKeys(fn($case) => [
                $case->value => $case->label(),
            ])
            ->toArray();
    }
}
