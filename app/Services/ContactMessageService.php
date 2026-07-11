<?php

namespace App\Services;

use App\Exceptions\BusinessException;
use App\Models\User;
use Illuminate\Support\Facades\Log;

/**
 * Menerima pesan dari halaman "Hubungi Kami" lalu meneruskannya via WhatsApp
 * (Fonnte) ke seluruh petugas perpustakaan yang berperan `manager`.
 *
 * Bila tidak ada satu pun user `manager`, pesan TIDAK dapat dikirim dan
 * sebuah BusinessException dilempar agar frontend menampilkan notifikasi
 * "petugas perpustakaan tidak tersedia".
 */
class ContactMessageService
{
    /** Peran petugas yang menerima pesan kontak. */
    private const RECEIVER_ROLES = ['admin', 'manager'];

    public function __construct(protected WhatsAppService $whatsApp)
    {
    }

    /**
     * @param  array{name:string,status:string,email:string,phone:?string,subject:string,message:string}  $data
     * @return array{manager_count:int, wa_sent:int}
     *
     * @throws BusinessException ketika tidak ada petugas `manager` atau `admin`.
     */
    public function send(array $data): array
    {
        $receivers = User::query()
            ->role(self::RECEIVER_ROLES)
            ->get();

        if ($receivers->isEmpty()) {
            // Tidak ada petugas perpustakaan → pesan tidak bisa dikirim.
            throw new BusinessException('contact.no_manager', 422);
        }

        $message = $this->buildMessage($data);

        $waSent = 0;
        $sentPhones = [];
        foreach ($receivers as $receiver) {
            $phone = $this->normalizePhone($receiver->phone);
            if (! $phone) {
                continue;
            }
            if (in_array($phone, $sentPhones, true)) {
                continue;
            }
            if ($this->whatsApp->sendText($phone, $message)) {
                $waSent++;
                $sentPhones[] = $phone;
            }
        }

        if ($waSent === 0) {
            // Penerima ADA, tetapi WhatsApp gagal terkirim (nomor kosong, atau
            // device Fonnte terputus). Ini gangguan teknis, bukan "tanpa petugas".
            Log::warning('[Contact] Penerima ada tetapi tidak ada WA yang berhasil terkirim', [
                'receiver_count' => $receivers->count(),
            ]);
            throw new BusinessException('contact.failed', 422);
        }

        return [
            'manager_count' => $receivers->count(),
            'wa_sent' => $waSent,
        ];
    }

    /**
     * Template pesan WhatsApp — modern, profesional, dan informatif.
     */
    private function buildMessage(array $data): string
    {
        $name = trim($data['name']);
        $status = trim($data['status']);
        $email = trim($data['email']);
        $phone = ! empty($data['phone']) ? trim($data['phone']) : '-';
        $subject = trim($data['subject']);
        $body = trim($data['message']);
        $time = now()->translatedFormat('l, d F Y · H:i') . ' WIB';

        return "📬 *PESAN BARU — Hubungi Kami*\n"
            . "_Perpustakaan Yayasan Pendidikan Umum Santo Lukas_\n"
            . "━━━━━━━━━━━━━━━━━━━━━\n\n"
            . "Halo Petugas Perpustakaan 👋\n"
            . "Ada pesan baru yang masuk melalui website:\n\n"
            . "👤 *Nama:* {$name}\n"
            . "🏷️ *Status:* {$status}\n"
            . "📧 *Surel:* {$email}\n"
            . "📱 *Telepon:* {$phone}\n\n"
            . "✉️ *Subjek:* {$subject}\n"
            . "💬 *Pesan:*\n{$body}\n\n"
            . "━━━━━━━━━━━━━━━━━━━━━\n"
            . "🕒 Diterima: {$time}\n"
            . "↩️ Mohon balas langsung ke surel/nomor pengirim di atas.";
    }

    /**
     * Normalisasi nomor ke format Fonnte (hanya digit, awalan 62).
     */
    private function normalizePhone(?string $phone): ?string
    {
        if (! $phone) {
            return null;
        }

        $digits = preg_replace('/\D+/', '', $phone);
        if (! $digits) {
            return null;
        }

        if (str_starts_with($digits, '0')) {
            $digits = '62' . substr($digits, 1);
        } elseif (! str_starts_with($digits, '62')) {
            $digits = '62' . $digits;
        }

        return $digits;
    }
}
