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
        $waSent = 0;
        $message = $this->buildWhatsAppMessage($user);
        foreach ($staff as $member) {
            $phone = $this->normalizePhone($member->phone);
            if (! $phone) {
                continue;
            }
            if ($this->whatsApp->sendText($phone, $message)) {
                $waSent++;
            }
        }

        return [
            'staff_count' => $staff->count(),
            'email_sent' => $emailSent,
            'wa_sent' => $waSent,
        ];
    }

    private function buildWhatsAppMessage(User $user): string
    {
        return "🪪 *Permintaan Kartu Anggota — Saint Luke E-Library*\n\n"
            . "Seorang anggota meminta dibuatkan kartu tanda anggota:\n\n"
            . "👤 Nama: *{$user->name}*\n"
            . '🔢 No. Anggota: ' . ($user->username ?: '-') . "\n"
            . "📧 Email: {$user->email}\n"
            . '📱 No. HP: ' . ($user->phone ?: '-') . "\n\n"
            . 'Silakan buka panel admin → Anggota untuk menerbitkan kartunya:'
            . "\n🔗 " . url('/admin/users');
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
