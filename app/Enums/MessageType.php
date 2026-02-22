<?php

namespace App\Enums;

enum MessageType: string
{
    case CREATED = "Berhasil Menambahkan Data";
    case UPDATED = "Berhasil Memperbarui Data";
    case DELETED = "Berhasil Menghapus Data";
    case ERROR = "Terjadi Kesalahan, Mohon di cek lagi atau coba lagi nanti!";

    public function message(string $entity = '', ?string $error = null): string
    {
        if ($this === self::ERROR && $error) {
            return "{$this->value} ({$error})";
        }
        return "{$this->value} {$entity}";
    }
}
