<?php

namespace App\Enums;

enum PaymentStatus: string
{
    case PENDING = "Tranksaksi Sedang Diproses";
    case SUCCESS = "Tranksaksi Berhasil";
    case FAILED = "Tranksaksi Gagal";
    case ERROR = "Terjadi Kesalahan, Mohon di cek lagi atau coba lagi nanti!";

    public static function options(): array
    {
        return collect(self::cases())->map(fn($item) => [
            'label' => $item->name,
            'value' => $item->value
        ])->values()->toArray();
    }
}
