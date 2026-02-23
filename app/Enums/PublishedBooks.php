<?php

namespace App\Enums;

enum PublishedBooks: string
{
    case PUBLISH = "Published";
    case UNPUBLISH = "Unpublished";

    public static function values(): array
    {
        return collect(self::cases())->pluck('value')->toArray();
    }

    public static function options(): array
    {
        return collect(self::cases())->mapWithKeys(fn($item) => [
            $item->value => $item->label()
        ])->toArray();
    }

    public function label(): string
    {
        return strtoupper($this->name);
    }
}
