<?php

namespace App\Enums;

enum BookCondition: string
{
    case GOOD = "Baik";
    case DAMAGED = "Rusak";
    case LOST = "Hilang";

    public function color(): string
    {
        return match ($this) {
            self::GOOD => '#22c55e',
            self::DAMAGED => '#f59e0b',
            self::LOST => '#ef4444',
        };
    }

    public function icon(): string
    {
        return match ($this) {

            self::GOOD => '
                <svg xmlns="http://www.w3.org/2000/svg"
                     width="16"
                     height="16"
                     viewBox="0 0 24 24"
                     fill="currentColor">
                    <path fill-rule="evenodd"
                          d="M2.25 12a9.75 9.75 0 1119.5 0 9.75 9.75 0 01-19.5 0zm13.28-2.53a.75.75 0 10-1.06-1.06l-3.97 3.97-1.47-1.47a.75.75 0 10-1.06 1.06l2 2a.75.75 0 001.06 0l4.5-4.5z"
                          clip-rule="evenodd" />
                </svg>
            ',

            self::DAMAGED => '
                <svg xmlns="http://www.w3.org/2000/svg"
                     width="16"
                     height="16"
                     viewBox="0 0 24 24"
                     fill="currentColor">
                    <path fill-rule="evenodd"
                          d="M9.401 3.003c1.155-2 4.043-2 5.198 0l7.355 12.748c1.154 2-.29 4.499-2.599 4.499H4.645c-2.31 0-3.753-2.499-2.599-4.5L9.4 3.003zM12 9a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0112 9zm0 7a1 1 0 100-2 1 1 0 000 2z"
                          clip-rule="evenodd" />
                </svg>
            ',

            self::LOST => '
                <svg xmlns="http://www.w3.org/2000/svg"
                     width="16"
                     height="16"
                     viewBox="0 0 24 24"
                     fill="currentColor">
                    <path fill-rule="evenodd"
                          d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 11-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                          clip-rule="evenodd" />
                </svg>
            ',
        };
    }

    public function html(): string
    {
        return "
        <span style='display:flex;align-items:center;gap:6px;color:{$this->color()}'>
            {$this->icon()}
            <span style='font-weight:500'>
                {$this->value}
            </span>
        </span>
        ";
    }

    public static function options(): array
    {
        return collect(self::cases())->mapWithKeys(
            fn($case) => [$case->value => $case->html()]
        )->toArray();
    }
}
