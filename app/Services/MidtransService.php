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

        $orderId = 'FINE-' . $fine->id . '-' . time();

        $fine->update([
            'order_id' => $orderId
        ]);

        $params = [
            'transaction_details' => [
                'order_id' => $orderId,
                'gross_amount' => (int) $fine->total_fee,
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
