<?php

namespace App\Http\Middleware;

use App\Enums\Days;
use App\Models\Announcement;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
                // Nama peran user (Spatie) untuk kebutuhan gating di frontend,
                // mis. staf (admin/super_admin) tidak boleh meminjam/baca buku.
                'roles' => $request->user()
                    ? $request->user()->getRoleNames()->values()->all()
                    : [],
            ],
            'announcement' => $this->getTodayAnnouncement(),
            'flash' => [
                'access_denied' => fn () => $request->session()->get('access_denied'),
                'success' => fn () => $request->session()->get('success'),
            ],
            'csrfToken' => fn () => $request->session()->token(),
        ];
    }

    private function getTodayAnnouncement(): ?array
    {
        try {
            $today = Days::today();

            $record = Announcement::query()
                ->where('days', $today->value)
                ->where('is_active', true)
                ->withoutTrashed()
                ->first();

            if (!$record) {
                return null;
            }

            return [
                'title'       => $record->title,
                'description' => $record->description,
                'photo'       => $record->photo ? asset('storage/' . $record->photo) : null,
                'open_time'   => substr($record->open_time, 0, 5),
                'close_time'  => substr($record->close_time, 0, 5),
                'days'        => $record->days instanceof Days ? $record->days->value : $record->days,
            ];
        } catch (\Throwable) {
            return null;
        }
    }
}
