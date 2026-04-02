<?php

namespace App\Enums;

// enum UserGender: string
// {
//     case MALE = "Laki-laki";

//     case FEMALE = "Perempuan";

//     public static function values(): array
//     {
//         return collect(self::cases())->pluck('value')->toArray();
//     }

//     public static function options(): array
//     {
//         return collect(self::cases())->mapWithKeys(fn($item) => [
//             $item->value => $item->value
//         ])->toArray();
//     }

//     public function label(): string
//     {
//         return strtoupper($this->name);
//     }
// }

enum UserGender: string
{
    case MALE = "Laki-laki";
    case FEMALE = "Perempuan";

    public function color(): string
    {
        return match ($this) {
            self::MALE => '#3b82f6', // biru
            self::FEMALE => '#ec4899', // pink
        };
    }

    public function icon(): string
    {
        return match ($this) {

            self::MALE => '
                <svg xmlns="http://www.w3.org/2000/svg"
                     width="16"
                     height="16"
                     viewBox="0 0 24 24"
                     fill="' . $this->color() . '"
                     stroke="' . $this->color() . '"
                     stroke-width="1.5">
                    <path d="M14 3h7m0 0v7m0-7L10 14"/>
                    <circle cx="7" cy="17" r="4"/>
                </svg>
            ',

            self::FEMALE => '
                <svg xmlns="http://www.w3.org/2000/svg"
                     width="16"
                     height="16"
                     viewBox="0 0 24 24"
                     fill="' . $this->color() . '"
                     stroke="' . $this->color() . '"
                     stroke-width="1.5">
                    <circle cx="12" cy="8" r="5"/>
                    <path d="M12 13v8m-3-3h6"/>
                </svg>
            ',
        };
    }

    public function html(): string
    {
        return '
        <span style="display:inline-flex;align-items:center;gap:6px;">
            ' . $this->icon() . '
            <span style="color: ' . $this->color() . '; font-weight:500;">
                ' . $this->value . '
            </span>
        </span>
        ';
    }

    public static function optionViews(): array
    {
        return collect(self::cases())->mapWithKeys(fn($case) => [
            $case->value => $case->html()
        ])->toArray();
    }

    public static function options(): array
    {
        return collect(self::cases())->mapWithKeys(fn($case) => [
            $case->name => $case->value
        ])->toArray();
    }
}
