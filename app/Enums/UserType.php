<?php

namespace App\Enums;

enum UserType: string
{
    case TK    = 'TK';
    case SD    = 'SD';
    case SMP   = 'SMP';
    case SMA   = 'SMA';
    case SMK   = 'SMK';
    case OTHER = 'other';

    public function label(): string
    {
        return match ($this) {
            self::TK    => 'TK',
            self::SD    => 'SD',
            self::SMP   => 'SMP',
            self::SMA   => 'SMA',
            self::SMK   => 'SMK',
            self::OTHER => 'Lainnya',
        };
    }

    public function color(): string
    {
        return match ($this) {
            self::TK    => '#f97316',
            self::SD    => '#22c55e',
            self::SMP   => '#3b82f6',
            self::SMA   => '#8b5cf6',
            self::SMK   => '#ec4899',
            self::OTHER => '#6b7280',
        };
    }

    public function badgeColor(): string
    {
        return match ($this) {
            self::TK    => 'warning',
            self::SD    => 'success',
            self::SMP   => 'info',
            self::SMA   => 'primary',
            self::SMK   => 'danger',
            self::OTHER => 'gray',
        };
    }

    public static function values(): array
    {
        return collect(self::cases())->pluck('value')->toArray();
    }

    public static function options(): array
    {
        return collect(self::cases())->mapWithKeys(fn($case) => [
            $case->value => $case->label(),
        ])->toArray();
    }
}
