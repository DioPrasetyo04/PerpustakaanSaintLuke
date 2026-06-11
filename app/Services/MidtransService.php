<?php

namespace App\Services;

use Midtrans\Config;
use Midtrans\Snap;

class MidtransService
{
    public static function init()
    {
        Config::$serverKey = config('midtrans.server_key');
        Config::$clientKey = config('midtrans.client_key');
        Config::$isProduction = config('midtrans.is_production', false);
        Config::$isSanitized = config('midtrans.is_sanitized', true);
        Config::$is3ds = config('midtrans.is_3ds', true);
    }

    public static function getSnapToken($fine)
    {
        self::init();

        // Midtrans menolak gross_amount < 1 (IDR harus bilangan bulat ≥ 1).
        // Denda Rp0 berarti tidak ada yang perlu dibayar — jangan panggil Snap.
        $amount = (int) round((float) $fine->total_fee);

        if ($amount < 1) {
            throw new \InvalidArgumentException(
                'Nominal denda tidak valid (Rp0), tidak dapat diproses ke Midtrans.'
            );
        }

        $orderId = 'FINE-' . $fine->id . '-' . time();

        $fine->update([
            'order_id' => $orderId
        ]);

        $params = [
            'transaction_details' => [
                'order_id' => $orderId,
                'gross_amount' => $amount,
            ],
            'customer_details' => [
                'first_name' => $fine->user->username,
                'email' => $fine->user->email,
                'phone' => $fine->user->phone,
            ]
        ];

        $snapToken = Snap::getSnapToken($params);

        return $snapToken;
    }
}
