<?php

namespace App\Http\Controllers\Settings;

use App\Enums\SocialMedia;
use App\Exceptions\BusinessException;
use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\ProfileUpdateRequest;
use App\Services\ProfileService;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    protected $profileController;

    public function __construct(ProfileService $profileService)
    {
        $this->profileController = $profileService;
    }

    public function edit(Request $request): Response
    {
        $profile = $this->profileController->getProfile();

        $platformOptions = collect(SocialMedia::cases())->map(fn($case) => [
            'value' => $case->value,
            'label' => $case->labels(),
            'icon' => $case->icon(),
            'color' => $case->color(),
        ])->values()->toArray();

        return Inertia::render('settings/profile', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => $request->session()->get('status'),
            'profile' => $profile,
            'platformOptions' => $platformOptions,
        ]);
    }

    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $data = $request->validated();

        if ($request->hasFile('avatar')) {
            $data['avatar'] = $request->file('avatar');
        }

        $this->profileController->updateProfile($data);

        return back();
    }

    public function destroy(Request $request): RedirectResponse
    {
        try {
            $this->profileController->deleteAccount();
        } catch (BusinessException $e) {
            $message = match ($e->getMessage()) {
                'profile.has_active_loan' => 'Akun tidak dapat dihapus karena masih ada pinjaman aktif.',
                'profile.has_unpaid_fine' => 'Akun tidak dapat dihapus karena masih ada denda yang belum dibayar.',
                default => $e->getMessage(),
            };
            return back()->withErrors(['delete_account' => $message]);
        }

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
