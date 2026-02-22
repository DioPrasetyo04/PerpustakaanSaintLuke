<?php

// struktur folder Enums dalam aplikasi laravel
namespace App\Enums;

// Digunakan untuk membuat validasi bahwa class atau form booklanguage nanti itu hanya berisi string value kategori language bukunya saja
enum BookLanguage: string
{
    // kategori atau key dan value enum
    // key atau name = "value";
    case ENGLISH = "English";
    case INDONESIA = "Indonesia";

    // method untuk mengambil semua case yang ada di daftar enum
    public static function options(): array
    {
        // collect berarti mengambil semua case yang ada di daftar enum dan mengubahnya menjadi array menggunakan map dengan key dan value
        // inisialisasi variable atau parameter $item untuk digunakan dalam assosiative array dalam case pada class enum BookLanguage
        return collect(self::cases())->map(fn($item) => [
            'label' => $item->name,
            'value' => $item->value,
        ])->values()->toArray();
    }
}
