<?php

namespace App\Enums;

enum DiscountType: string
{
    case PERCENTAGE = 'percentage';
    case FIXED = 'fixed';

    public function label(): string
    {
        return match ($this) {
            self::PERCENTAGE => 'Persentase (%)',
            self::FIXED => 'Nilai Tetap (Rp)',
        };
    }

    public function icon(): string
    {
        return match ($this) {
            self::PERCENTAGE => 'heroicon-o-receipt-percent',
            self::FIXED => 'heroicon-o-banknotes',
        };
    }

    public function color(): string
    {
        return match ($this) {
            self::PERCENTAGE => 'info',
            self::FIXED => 'success',
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

    public static function icons(): array
    {
        return collect(self::cases())
            ->mapWithKeys(fn($case) => [
                $case->value => $case->icon(),
            ])
            ->toArray();
    }

    public static function colors(): array
    {
        return collect(self::cases())
            ->mapWithKeys(fn($case) => [
                $case->value => $case->color(),
            ])
            ->toArray();
    }
}
