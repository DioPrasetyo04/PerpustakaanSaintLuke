<?php

namespace App\Services;

use App\Exceptions\BusinessException;
use App\Models\User;
use App\Notifications\MemberCardRequestNotification;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Notification;

/**
 * Mengirim notifikasi (email + WhatsApp) ke seluruh staf berperan
 * super_admin / admin / manager bahwa seorang anggota meminta dibuatkan
 * kartu tanda anggota. Fitur ini HANYA memberi tahu staf — penerbitan
 * kartu tetap dilakukan staf melalui panel admin.
 */
class MemberCardRequestService
{
    /** Peran staf yang menerima notifikasi permintaan kartu. */
    private const STAFF_ROLES = ['super_admin', 'admin', 'manager'];

    /** Jeda minimal antar permintaan per user (menit). */
    private const THROTTLE_MINUTES = 30;

    public function __construct(protected WhatsAppService $whatsApp)
    {
    }

    /**
     * @return array{staff_count:int, email_sent:int, wa_sent:int}
     */
    public function requestForCurrentUser(): array
    {
        /** @var User $user */
        $user = auth()->user();

        if ($user->hasMemberCard()) {
            throw new BusinessException('member_card.already_issued', 409);
        }

        $throttleKey = "member-card-request:{$user->id}";
        if (! Cache::add($throttleKey, true, now()->addMinutes(self::THROTTLE_MINUTES))) {
            throw new BusinessException('member_card.request_throttled', 429);
        }

        $staff = User::query()
            ->role(self::STAFF_ROLES)
            ->where('id', '!=', $user->id)
            ->get();

        if ($staff->isEmpty()) {
            throw new BusinessException('member_card.no_staff', 422);
        }

        // Email — semua staf punya email.
        $emailSent = 0;
        try {
            Notification::send($staff, new MemberCardRequestNotification($user));
            $emailSent = $staff->count();
        } catch (\Throwable $e) {
            Log::error('[MemberCardRequest] Gagal kirim email ke staf', [
                'requester_id' => $user->id,
                'message' => $e->getMessage(),
            ]);
        }

        // WhatsApp — hanya staf yang punya nomor telepon.
        // Pesan dibangun ulang per penerima agar tiap kiriman unik (anti-blokir).
        $waSent = 0;
        foreach ($staff as $member) {
            $phone = $this->normalizePhone($member->phone);
            if (! $phone) {
                continue;
            }
            if ($this->whatsApp->sendText($phone, $this->buildWhatsAppMessage($user))) {
                $waSent++;
            }
        }

        return [
            'staff_count' => $staff->count(),
            'email_sent' => $emailSent,
            'wa_sent' => $waSent,
        ];
    }

    /**
     * Bangun pesan WhatsApp yang sedikit berbeda setiap kali dikirim
     * (variasi emoji, sapaan, penutup, + stempel waktu & kode unik) supaya
     * tidak terdeteksi sebagai spam/pesan identik yang berisiko diblokir WA.
     */
    private function buildWhatsAppMessage(User $user): string
    {
        // Kumpulan variasi — dipilih acak tiap pengiriman.
        $headEmojis = ['🪪', '🆔', '📇', '🎫', '🪪✨'];
        $greetings = [
            'Halo Petugas Perpustakaan 👋',
            'Selamat bertugas, Petugas Perpustakaan 🙏',
            'Hai Tim Perpustakaan 👋',
            'Permisi, Petugas Perpustakaan 🙌',
        ];
        $intros = [
            'Seorang anggota meminta dibuatkan kartu tanda anggota:',
            'Ada permintaan pembuatan kartu tanda anggota baru:',
            'Mohon dibantu — seorang anggota mengajukan kartu tanda anggota:',
            'Masuk satu permintaan kartu tanda anggota:',
        ];
        $nameEmojis = ['👤', '🧑', '🙋', '🧑‍🎓'];
        $idEmojis = ['🔢', '🆔', '#️⃣'];
        $mailEmojis = ['📧', '✉️', '📨'];
        $phoneEmojis = ['📱', '☎️', '📞'];
        $linkEmojis = ['🔗', '🌐', '➡️'];
        $closings = [
            'Silakan buka panel admin → Anggota untuk menerbitkan kartunya:',
            'Terbitkan kartunya lewat panel admin → Anggota di sini:',
            'Mohon diproses melalui panel admin → Anggota:',
            'Lanjutkan penerbitan kartu di panel admin → Anggota:',
        ];

        $pick = static fn (array $a): string => $a[array_rand($a)];

        $time = now()->translatedFormat('l, d F Y · H:i') . ' WIB';
        // Kode referensi unik tiap pengiriman (anti pesan identik).
        $ref = strtoupper(substr(md5($user->id . microtime(true) . random_int(0, 99999)), 0, 6));

        return $pick($headEmojis) . " *Permintaan Kartu Anggota — Saint Luke E-Library*\n"
            . "━━━━━━━━━━━━━━━━━━━━━\n\n"
            . $pick($greetings) . "\n"
            . $pick($intros) . "\n\n"
            . $pick($nameEmojis) . " Nama: *{$user->name}*\n"
            . $pick($idEmojis) . ' No. Anggota: ' . ($user->username ?: '-') . "\n"
            . $pick($mailEmojis) . " Email: {$user->email}\n"
            . $pick($phoneEmojis) . ' No. HP: ' . ($user->phone ?: '-') . "\n\n"
            . $pick($closings)
            . "\n" . $pick($linkEmojis) . ' ' . url('/admin/users') . "\n\n"
            . "━━━━━━━━━━━━━━━━━━━━━\n"
            . "🕒 Diterima: {$time}\n"
            . "🧾 Ref: {$ref}";
    }

    /**
     * Normalisasi nomor ke format yang diterima Fonnte (hanya digit, awalan 62).
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
