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
            self::AVAILABLE   => 'Tersedia',
            self::UNAVAILABLE => 'Tidak Tersedia',
            self::LOAN        => 'Dipinjam',
            self::LOST        => 'Hilang',
            self::DAMAGED     => 'Rusak',
        };
    }

    public function color(): string
    {
        return match ($this) {
            self::AVAILABLE   => '#16a34a', // green-600
            self::UNAVAILABLE => '#6b7280', // gray-500
            self::LOAN        => '#2563eb', // blue-600
            self::LOST        => '#dc2626', // red-600
            self::DAMAGED     => '#f59e0b', // amber-500
        };
    }

    public function icon(): string
    {
        $color = $this->color();

        return match ($this) {
            self::AVAILABLE => '
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                     fill="none" stroke="' . $color . '" stroke-width="2"
                     stroke-linecap="round" stroke-linejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
            ',
            self::UNAVAILABLE => '
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                     fill="none" stroke="' . $color . '" stroke-width="2"
                     stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>
                </svg>
            ',
            self::LOAN => '
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                     fill="none" stroke="' . $color . '" stroke-width="2"
                     stroke-linecap="round" stroke-linejoin="round">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                </svg>
            ',
            self::LOST => '
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                     fill="none" stroke="' . $color . '" stroke-width="2"
                     stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                    <line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
            ',
            self::DAMAGED => '
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                     fill="none" stroke="' . $color . '" stroke-width="2"
                     stroke-linecap="round" stroke-linejoin="round">
                    <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                    <line x1="12" y1="9" x2="12" y2="13"/>
                    <line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
            ',
        };
    }

    public function html(): string
    {
        return '<span style="display:inline-flex;align-items:center;gap:6px;">'
            . $this->icon()
            . '<span style="color:' . $this->color() . ';font-weight:500;">' . $this->label() . '</span>'
            . '</span>';
    }

    public static function options(): array
    {
        return collect(self::cases())
            ->mapWithKeys(fn($case) => [
                $case->value => $case->label(),
            ])
            ->toArray();
    }

    public static function optionViews(): array
    {
        return collect(self::cases())
            ->mapWithKeys(fn($case) => [
                $case->value => $case->html(),
            ])
            ->toArray();
    }

    /**
     * Status yang boleh dipilih manual oleh admin saat menambah/mengubah buku.
     * Hanya Tersedia / Tidak Tersedia. Status Dipinjam/Hilang/Rusak diatur
     * otomatis oleh sistem (alur peminjaman & pengembalian), bukan dipilih
     * manual, sehingga tidak ditampilkan pada form.
     *
     * @return array<string, string>
     */
    public static function formOptionViews(): array
    {
        return collect([self::AVAILABLE, self::UNAVAILABLE])
            ->mapWithKeys(fn($case) => [
                $case->value => $case->html(),
            ])
            ->toArray();
    }
}
