<?php

namespace App\Enums;

enum OnlineResourceType: string
{
    case EBOOK = 'E-Book';
    case JOURNAL = 'Jurnal';
    case COURSE = 'Kursus';
    case RESEARCH = 'Riset';
    case ENCYCLOPEDIA = 'Ensiklopedi';
    case VIDEO = 'Video';
    case REFERENCE = 'Referensi';

    public function label(): string
    {
        return $this->value;
    }

    /** lucide-react icon name used by the frontend cards. */
    public function icon(): string
    {
        return match ($this) {
            self::EBOOK        => 'book-open',
            self::JOURNAL      => 'bookmark',
            self::COURSE       => 'play',
            self::RESEARCH     => 'search',
            self::ENCYCLOPEDIA => 'globe',
            self::VIDEO        => 'video',
            self::REFERENCE    => 'library',
        };
    }

    public static function options(): array
    {
        return collect(self::cases())
            ->mapWithKeys(fn ($case) => [$case->value => $case->label()])
            ->toArray();
    }
}
