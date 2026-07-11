<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Laravel\Socialite\Facades\Socialite;
use Symfony\Component\HttpFoundation\RedirectResponse as SymfonyRedirect;
use Throwable;

class GoogleController extends Controller
{
    /**
     * Arahkan pengguna ke halaman consent Google.
     */
    public function redirect(): SymfonyRedirect
    {
        return Socialite::driver('google')
            ->scopes(['openid', 'profile', 'email'])
            ->redirect();
    }

    /**
     * Tangani callback dari Google setelah pengguna memberi izin.
     */
    public function callback(): RedirectResponse
    {
        try {
            $googleUser = Socialite::driver('google')->user();
        } catch (Throwable $e) {
            Log::warning('Google OAuth callback gagal', ['message' => $e->getMessage()]);

            return redirect()->route('login')->withErrors([
                'email' => 'Gagal masuk dengan Google. Silakan coba lagi.',
            ]);
        }

        $email = $googleUser->getEmail();

        if (! $email) {
            return redirect()->route('login')->withErrors([
                'email' => 'Akun Google Anda tidak memiliki email yang dapat digunakan.',
            ]);
        }

        // Cari berdasarkan google_id LEBIH DULU (akun Google yang sudah ada),
        // baru fallback ke email. Memakai orWhere dalam satu query bisa
        // mengembalikan baris email padahal google_id sudah dimiliki user lain,
        // sehingga update-nya melanggar unique constraint (duplicate entry).
        $user = User::query()
            ->where('google_id', $googleUser->getId())
            ->first();

        if (! $user) {
            $user = User::query()
                ->where('email', $email)
                ->first();
        }

        if ($user) {
            // Akun lama (manual maupun Google) — tautkan google_id bila belum
            // ada DAN belum dipakai user lain (hindari duplicate entry).
            if (! $user->google_id) {
                $googleIdTaken = User::query()
                    ->where('google_id', $googleUser->getId())
                    ->where('id', '!=', $user->id)
                    ->exists();

                if (! $googleIdTaken) {
                    $user->google_id = $googleUser->getId();
                }
            }

            if (! $user->avatar && ! $user->avatar_url && $googleUser->getAvatar()) {
                $user->avatar_url = $googleUser->getAvatar();
            }

            $user->save();
        } else {
            // Akun baru via Google — SENGAJA tidak diverifikasi (email_verified_at = null).
            // Pengguna tetap bisa login, namun harus verifikasi email sebelum
            // meminjam buku / menyimpan bookmark.
            $name = $googleUser->getName() ?: ($googleUser->getNickname() ?: 'Pengguna Google');

            $user = User::create([
                'name' => $name,
                'username' => generateUsername($name),
                'email' => $email,
                'google_id' => $googleUser->getId(),
                'avatar_url' => $googleUser->getAvatar(),
                'password' => null,
                'email_verified_at' => null,
            ]);

            $user->assignRole('member');

            // Memicu pengiriman email verifikasi (template branded Saint Luke).
            event(new Registered($user));
        }

        Auth::login($user, remember: true);

        // Belum terverifikasi → arahkan ke halaman verifikasi email.
        if (! $user->hasVerifiedEmail()) {
            return redirect()->route('verification.notice')->with('success', 'login_success');
        }

        return redirect()->intended(route('home', absolute: false))->with('success', 'login_success');
    }
}
