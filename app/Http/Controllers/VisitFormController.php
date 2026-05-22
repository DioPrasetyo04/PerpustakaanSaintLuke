<?php

namespace App\Http\Controllers;

use App\Enums\UserType;
use App\Filament\Resources\Visits\VisitResource;
use App\Models\User;
use App\Models\Visit;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

/**
 * Kiosk publik pencatatan kunjungan perpustakaan (React + Inertia).
 *
 * Mereplikasi logika form Filament VisitForm/InteractsWithVisitScan untuk pemakaian mandiri:
 * - cari pengguna terdaftar (autofill), atau isi manual sebagai tamu;
 * - scan barcode / QR kartu (= username) → kunjungan otomatis tercatat;
 * - aturan 1 pengunjung 1x kunjungan per hari.
 *
 * Catatan privasi: hanya pengguna perpustakaan (bukan admin/manager/writer) yang
 * tampil di pencarian/lookup, dengan field minimal saja.
 */
class VisitFormController extends Controller
{
    /** Role staf yang dikecualikan dari pencarian & tidak boleh mencatat kunjungan via scan. */
    private const STAFF_ROLES = ['admin', 'manager', 'writer'];

    /** Role yang dianggap "pengguna perpustakaan" dan boleh mencatat kunjungan via scan. */
    private const PATRON_ROLES = ['member', 'user'];

    /** Tampilkan halaman form kunjungan. */
    public function create(): Response
    {
        return Inertia::render('visit/create', [
            'userTypes' => collect(UserType::options())
                ->map(fn(string $label, string $value) => ['value' => $value, 'label' => $label])
                ->values()
                ->all(),
        ]);
    }

    /** Pencarian pengguna terdaftar (non-staf) untuk autocomplete pemilih pengunjung. */
    public function searchUsers(Request $request): JsonResponse
    {
        $search = trim((string) $request->query('q', ''));

        if ($search === '') {
            return response()->json([]);
        }

        $users = User::query()
            ->whereDoesntHave('roles', fn($q) => $q->whereIn('name', self::STAFF_ROLES))
            ->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('username', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            })
            ->limit(20)
            ->get()
            ->map(fn(User $u) => [
                'id'     => $u->id,
                'name'   => $u->name,
                'email'  => $u->email,
                'avatar' => $this->resolveAvatarUrl($u),
            ]);

        return response()->json($users);
    }

    /** Detail satu pengguna terdaftar untuk autofill setelah dipilih. */
    public function lookupUser(User $user): JsonResponse
    {
        // Tolak staf — kiosk hanya mencatat pengunjung perpustakaan.
        if ($user->hasAnyRole(self::STAFF_ROLES)) {
            return response()->json(['message' => 'Pengguna tidak valid untuk kunjungan.'], 422);
        }

        return response()->json([
            'id'         => $user->id,
            'name'       => $user->name,
            'address'    => $user->address ?: '-',
            'type'       => $user->type,
            'type_other' => $user->type_other,
            'email'      => $user->email,
            'avatar'     => $this->resolveAvatarUrl($user),
            'verified'   => (bool) $user->email_verified_at,
        ]);
    }

    /**
     * Proses scan barcode/QR kartu anggota (= username). Mereplikasi recordVisitScan():
     * - tak dikenal → 'guest' (arahkan ke isian manual)
     * - bukan pengguna perpustakaan → 'rejected'
     * - sudah tercatat hari ini → 'already'
     * - valid & belum tercatat → kunjungan otomatis dibuat → 'success'
     */
    public function scan(Request $request): JsonResponse
    {
        $data = $request->validate([
            'code' => ['required', 'string', 'max:255'],
        ]);

        $user = User::findByMemberBarcode($data['code']);

        if (! $user) {
            return response()->json([
                'status'  => 'guest',
                'message' => 'Kartu tidak dikenali. Silakan isi data kunjungan secara manual.',
            ]);
        }

        if (! $user->hasAnyRole(self::PATRON_ROLES)) {
            return response()->json([
                'status'  => 'rejected',
                'message' => 'Anda bukan pengguna perpustakaan.',
                'user'    => $this->userResultPayload($user),
            ]);
        }

        if (Visit::recordedToday($user->id)) {
            return response()->json([
                'status'  => 'already',
                'message' => 'Kunjungan Anda sudah tercatat hari ini. Tidak perlu mendaftar ulang.',
                'user'    => $this->userResultPayload($user),
            ]);
        }

        Visit::create([
            'user_id'    => $user->id,
            'name'       => $user->name,
            'address'    => $user->address ?: '-',
            'visit_date' => Carbon::now('Asia/Jakarta'),
            'type'       => $user->type,
            'type_other' => $user->type_other,
            'note'       => 'Berkunjung Hari ini',
        ]);

        return response()->json([
            'status'  => 'success',
            'message' => 'Kunjungan Anda telah tercatat. Selamat menikmati layanan perpustakaan.',
            'user'    => $this->userResultPayload($user),
        ]);
    }

    /** Simpan kunjungan dari isian manual / autofill pencarian. */
    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'user_id'    => ['nullable', 'integer', 'exists:users,id'],
            'name'       => ['required', 'string', 'max:255'],
            'address'    => ['nullable', 'string', 'max:255'],
            'type'       => ['nullable', Rule::in(UserType::values())],
            'type_other' => ['nullable', 'string', 'max:100', 'required_if:type,' . UserType::OTHER->value],
            'needs'      => ['nullable', 'string', 'max:255'],
            'visit_date' => ['required', 'date'],
            'note'       => ['nullable', 'string', 'max:1000'],
        ]);

        $userId = filled($data['user_id'] ?? null) ? (int) $data['user_id'] : null;

        // Aturan 1 pengunjung 1x kunjungan per hari — hindari data ganda.
        if (Visit::recordedToday($userId, $data['name'])) {
            throw ValidationException::withMessages([
                'name' => 'Kunjungan untuk pengunjung ini sudah tercatat hari ini. Tidak perlu input ulang.',
            ]);
        }

        Visit::create(VisitResource::normalizeVisitData($data));

        return back();
    }

    /** Payload ringkas untuk kartu hasil scan (foto + nama + email). */
    private function userResultPayload(User $user): array
    {
        return [
            'name'   => $user->name,
            'email'  => $user->email,
            'avatar' => $this->resolveAvatarUrl($user),
        ];
    }

    /** Resolusi URL avatar — mirror VisitForm::resolveAvatarUrl (fallback ui-avatars). */
    private function resolveAvatarUrl(User $user): string
    {
        $avatar = $user->avatar;

        if (! $avatar) {
            return 'https://ui-avatars.com/api/?name=' . urlencode($user->name) . '&background=random&color=fff';
        }

        if (str_starts_with($avatar, 'http://') || str_starts_with($avatar, 'https://')) {
            return $avatar;
        }

        return Storage::url($avatar);
    }
}
