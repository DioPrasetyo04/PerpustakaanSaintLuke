<?php

namespace App\Enums;

enum BookType: string
{
    case DIGITAL = 'digital';
    case FISIK = 'fisik';

    public function label(): string
    {
        return match ($this) {
            self::DIGITAL => 'Digital',
            self::FISIK  => 'Fisik',
        };
    }

    public function color(): string
    {
        return match ($this) {
            self::DIGITAL => '#6366f1',
            self::FISIK   => '#f59e0b',
        };
    }

    public function icon(): string
    {
        return match ($this) {
            self::DIGITAL => '
                <svg xmlns="http://www.w3.org/2000/svg"
                     width="16" height="16"
                     viewBox="0 0 24 24"
                     fill="none"
                     stroke="' . $this->color() . '"
                     stroke-width="1.8"
                     stroke-linecap="round"
                     stroke-linejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                    <line x1="8" y1="21" x2="16" y2="21"/>
                    <line x1="12" y1="17" x2="12" y2="21"/>
                </svg>
            ',
            self::FISIK => '
                <svg xmlns="http://www.w3.org/2000/svg"
                     width="16" height="16"
                     viewBox="0 0 24 24"
                     fill="none"
                     stroke="' . $this->color() . '"
                     stroke-width="1.8"
                     stroke-linecap="round"
                     stroke-linejoin="round">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                </svg>
            ',
        };
    }

    public function html(): string
    {
        return '
        <span style="display:inline-flex;align-items:center;gap:6px;">
            ' . $this->icon() . '
            <span style="color:' . $this->color() . ';font-weight:500;text-transform:capitalize;">
                ' . $this->label() . '
            </span>
        </span>
        ';
    }

    public static function values(): array
    {
        return collect(self::cases())->pluck('value')->toArray();
    }

    public static function options(): array
    {
        return collect(self::cases())->mapWithKeys(fn($case) => [
            $case->value => $case->html(),
        ])->toArray();
    }
}
