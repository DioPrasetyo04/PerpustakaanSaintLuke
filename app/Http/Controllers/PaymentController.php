<?php

namespace App\Http\Controllers;

use App\Enums\PaymentStatus;
use App\Enums\ReturnBookStatus;
use App\Models\Fine;
use App\Models\ReturnBook;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Midtrans\Config;
use Midtrans\Snap;
use Inertia\Inertia;
use Exception;

class PaymentController extends Controller
{
    public function create(Request $request): JsonResponse
    {
        Config::$serverKey = config('midtrans.server_key');
        Config::$isProduction = config('midtrans.is_production');
        Config::$isSanitized = config('midtrans.is_sanitized');
        Config::$is3ds = config('midtrans.is_3ds');

        $fine = Fine::with('user')->findOrFail($request->fine_id);

        $orderId = 'FINE-' . $fine->id . '-' . time();

        $fine->order_id = $orderId;
        $fine->save();

        $params = [
            'transaction_details' => [
                'order_id' => $orderId,
                'gross_amount' => $fine->total_fee,
            ],
            'customer_details' => [
                'first_name' => $fine->user->username,
                'email' => $fine->user->email,
                'phone' => $fine->user->phone,
            ]
        ];

        try {
            $snapToken = Snap::getSnapToken($params);

            return response()->json([
                'snap_token' => $snapToken,
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function callback(Request $request): JsonResponse
    {
        Log::info('MIDTRANS CALLBACK:', $request->all());
        // 🔥 WAJIB untuk test Midtrans
        if (str_contains($request->order_id, 'payment_notif_test')) {
            return response()->json(['message' => 'OK'], 200);
        }
        $serverKey = config('midtrans.server_key');
        $signatureKey = signatureMidtrans(
            $request->order_id,
            $request->status_code,
            $request->gross_amount,
            $serverKey
        );

        if ($request->signature_key !== $signatureKey) {
            return response()->json([
                'error' => 'Unauthorized',
            ], 400);
        }

        // 🔥 ambil fine dari order_id
        $fine = Fine::where('order_id', $request->order_id)->first();

        if (!$fine) {
            return response()->json(['message' => 'Fine tidak ditemukan'], 404);
        }

        $returnBook = $fine->returnBook;

        if (!$returnBook) {
            return response()->json(['message' => 'Data Return Book Not Find'], 404);
        }

        // switch ($request->transaction_status) {
        //     case 'settlement':
        //         $returnBook->fine->payment_status = PaymentStatus::SUCCESS->value;
        //         $returnBook->fine->payment_method = $request->payment_type;
        //         $returnBook->fine->save();

        //         $returnBook->status = ReturnBookStatus::RETURNED->value;
        //         $returnBook->save();

        //         return response()->json([
        //             'message' => 'Berhasil melakukan pembayaran',
        //         ], 200);
        //     case 'capture':
        //         $returnBook->fine->payment_status = PaymentStatus::SUCCESS->value;
        //         $returnBook->fine->payment_method = $request->payment_type;
        //         $returnBook->fine->save();

        //         $returnBook->status = ReturnBookStatus::RETURNED->value;
        //         $returnBook->save();

        //         return response()->json([
        //             'message' => 'Berhasil melakukan pembayaran',
        //         ]);
        //     case 'pending':
        //         $returnBook->fine->payment_status = PaymentStatus::PENDING->value;
        //         $returnBook->fine->save();

        //         $returnBook->status = ReturnBookStatus::CHECKED->value;
        //         $returnBook->save();

        //         return response()->json([
        //             'message' => 'Pembayaran tertunda',
        //         ]);
        //     case 'expired':
        //         $returnBook->fine->payment_status = PaymentStatus::FAILED->value;
        //         $returnBook->fine->save();

        //         return response()->json([
        //             'message' => 'Pembayaran sudah kadaluarsa',
        //         ]);
        //     case 'cancel':
        //         $returnBook->fine->payment_status = PaymentStatus::FAILED->value;
        //         $returnBook->fine->save();

        //         return response()->json([
        //             'message' => 'Pembayaran telah dibatalkan',
        //         ]);

        //     default:
        //         return response()->json([
        //             'message' => 'Transaksi tidak ditemukan',
        //         ], 404);
        // }

        switch ($request->transaction_status) {

            case 'settlement':
            case 'capture':
                $fine->update([
                    'payment_status' => PaymentStatus::SUCCESS->value,
                    'payment_method' => $request->payment_type,
                ]);

                if ($returnBook) {
                    $returnBook->update([
                        'status' => ReturnBookStatus::RETURNED->value
                    ]);
                }

                return response()->json([
                    'message' => 'Berhasil melakukan pembayaran',
                ], 200);

            case 'pending':
                $fine->update([
                    'payment_status' => PaymentStatus::PENDING->value,
                ]);

                if ($returnBook) {
                    $returnBook->update([
                        'status' => ReturnBookStatus::CHECKED->value
                    ]);
                }

                return response()->json([
                    'message' => 'Pembayaran tertunda',
                ]);

            case 'expire': // ⚠️ Midtrans pakai "expire", bukan "expired"
            case 'cancel':
            case 'deny':
                $fine->update([
                    'payment_status' => PaymentStatus::FAILED->value,
                ]);

                return response()->json([
                    'message' => 'Pembayaran gagal / dibatalkan',
                ]);

            default:
                $fine->update([
                    'payment_status' => PaymentStatus::ERROR->value,
                ]);

                return response()->json([
                    'message' => 'Status tidak dikenali',
                ], 400);
        }
    }
    // public function handleNotification(Request $request)
    // {
    //     $payload = $request->all();

    //     Log::info('MIDTRANS MASUK', $payload);

    //     $orderId = $payload['order_id'] ?? null;
    //     $status = $payload['transaction_status'] ?? null;

    //     if (!$orderId) {
    //         return response()->json(['message' => 'Invalid'], 400);
    //     }

    //     // 🔥 HANDLE TEST MIDTRANS (WAJIB)
    //     if (str_contains($orderId, 'payment_notif_test')) {
    //         return response()->json(['message' => 'OK'], 200);
    //     }

    //     $fineId = explode('-', $orderId)[1] ?? null;
    //     $fine = Fine::find($fineId);

    //     if (!$fine) {
    //         return response()->json(['message' => 'Fine not found'], 404);
    //     }

    //     switch ($status) {
    //         case 'capture':
    //         case 'settlement':
    //             $fine->payment_status = PaymentStatus::SUCCESS;
    //             break;

    //         case 'pending':
    //             $fine->payment_status = PaymentStatus::PENDING;
    //             break;

    //         case 'deny':
    //         case 'cancel':
    //         case 'expire':
    //             $fine->payment_status = PaymentStatus::FAILED;
    //             break;

    //         default:
    //             $fine->payment_status = PaymentStatus::ERROR;
    //             break;
    //     }

    //     $fine->save();

    //     return response()->json(['message' => 'OK'], 200);
    // }

    public function handlePending()
    {
        return Inertia::render('payment/pending');
        // If the transaction status is anything else, update the fine status to 'error'
    }

    public function handleSuccess()
    {
        return Inertia::render('payment/success');
        // Save the fine
    }

    public function handleFailed()
    {
        return Inertia::render('payment/failed');
    }

    public function handleError()
    {
        return Inertia::render('payment/error');
    }
}
