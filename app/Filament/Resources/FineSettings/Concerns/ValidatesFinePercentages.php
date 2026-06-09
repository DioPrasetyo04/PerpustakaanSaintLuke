<?php

namespace App\Filament\Resources\FineSettings\Concerns;

use App\Enums\DiscountType;

trait ValidatesFinePercentages
{
    /**
     * Periksa konsistensi tipe persentase pada pengaturan denda.
     *
     * Aturan: jika salah satu (atau keduanya) biaya memakai tipe Persentase,
     * maka TOTAL persentase yang dipakai harus tepat 100% — tidak boleh kurang
     * (mis. hanya 80%) maupun lebih. Gunakan tipe "Nilai Tetap (Rp)" bila ingin
     * nominal bebas.
     *
     * @param  array<string, mixed>  $data  State form.
     * @return string|null  Pesan error bila tidak valid, atau null bila valid.
     */
    protected function finePercentageError(array $data): ?string
    {
        $damageIsPercent = ($data['damage_discount_type'] ?? null) === DiscountType::PERCENTAGE->value;
        $lostIsPercent = ($data['lost_discount_type'] ?? null) === DiscountType::PERCENTAGE->value;

        // Keduanya nilai tetap → tidak ada batasan persentase.
        if (! $damageIsPercent && ! $lostIsPercent) {
            return null;
        }

        $damage = $damageIsPercent ? (float) ($data['damage_fee_book'] ?? 0) : 0.0;
        $lost = $lostIsPercent ? (float) ($data['lost_fee_book'] ?? 0) : 0.0;

        if ($damage > 100) {
            return 'Persentase denda kerusakan tidak boleh melebihi 100%.';
        }

        if ($lost > 100) {
            return 'Persentase denda kehilangan tidak boleh melebihi 100%.';
        }

        $total = $damage + $lost;

        // Bandingkan dengan toleransi kecil untuk menghindari masalah float.
        if (abs($total - 100.0) > 0.001) {
            $parts = [];
            if ($damageIsPercent) {
                $parts[] = "kerusakan {$damage}%";
            }
            if ($lostIsPercent) {
                $parts[] = "kehilangan {$lost}%";
            }
            $detail = implode(' + ', $parts);

            return "Total persentase denda harus tepat 100%. Saat ini {$detail} = {$total}%. "
                . 'Sesuaikan nilainya atau ubah tipe perhitungan ke "Nilai Tetap (Rp)".';
        }

        return null;
    }
}
