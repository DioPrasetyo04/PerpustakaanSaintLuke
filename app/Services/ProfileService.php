<?php

namespace App\Services;

use App\Enums\SocialMedia as SocialMediaEnum;
use App\Exceptions\BusinessException;
use App\Interface\ProfileInterfaceRepositories;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class ProfileService
{
    protected $profileService;

    public function __construct(ProfileInterfaceRepositories $profileRepositories)
    {
        $this->profileService = $profileRepositories;
    }

    public function getProfile(): array
    {
        $userId = auth()->id();
        $user = $this->profileService->getUserWithSocialMedia($userId);

        return [
            'id' => $user->id,
            'name' => $user->name,
            'username' => $user->username,
            'email' => $user->email,
            'email_verified_at' => $user->email_verified_at,
            'phone' => $user->phone,
            'address' => $user->address,
            'date_of_birth' => $user->date_of_birth,
            'avatar' => $user->avatar ? Storage::url($user->avatar) : null,
            'created_at' => $user->created_at,
            'socialmedia' => $user->socialmedia->map(function ($item) {
                $enum = SocialMediaEnum::tryFrom($item->platform);
                return [
                    'id' => $item->id,
                    'platform' => $item->platform,
                    'platform_label' => $enum?->labels(),
                    'icon' => $enum?->icon(),
                    'color' => $enum?->color(),
                    'url' => $item->url,
                    'username' => $item->username,
                ];
            })->values()->toArray(),
        ];
    }

    public function updateProfile(array $data): void
    {
        $userId = auth()->id();

        if (isset($data['avatar']) && $data['avatar'] instanceof UploadedFile) {
            $user = $this->profileService->getUserWithSocialMedia($userId);
            if ($user->avatar && Storage::disk('public')->exists($user->avatar)) {
                Storage::disk('public')->delete($user->avatar);
            }
            $data['avatar'] = $data['avatar']->store('avatars', 'public');
        } else {
            unset($data['avatar']);
        }

        $this->profileService->updateUser($userId, $data);
    }

    public function deleteAccount(): void
    {
        $userId = auth()->id();

        if ($this->profileService->hasActiveLoan($userId)) {
            throw new BusinessException('profile.has_active_loan', 422);
        }

        if ($this->profileService->hasUnpaidFine($userId)) {
            throw new BusinessException('profile.has_unpaid_fine', 422);
        }

        $user = $this->profileService->getUserWithSocialMedia($userId);

        Auth::logout();
        $this->profileService->deleteUser($userId);

        if ($user->avatar && Storage::disk('public')->exists($user->avatar)) {
            Storage::disk('public')->delete($user->avatar);
        }
    }

    public function addSocialMedia(array $data): void
    {
        $userId = auth()->id();

        if ($this->profileService->findSocialMediaByPlatform($userId, $data['platform'])) {
            throw new BusinessException('socialmedia.platform_exists', 409);
        }

        $this->profileService->storeSocialMedia($userId, $data);
    }

    public function updateSocialMedia(int $id, array $data): void
    {
        $userId = auth()->id();

        $current = $this->profileService->findSocialMedia($userId, $id);
        if (!$current) {
            throw new BusinessException('socialmedia.not_found', 404);
        }

        if ($current->platform !== $data['platform']) {
            $duplicate = $this->profileService->findSocialMediaByPlatform($userId, $data['platform']);
            if ($duplicate) {
                throw new BusinessException('socialmedia.platform_exists', 409);
            }
        }

        $this->profileService->updateSocialMedia($userId, $id, $data);
    }

    public function deleteSocialMedia(int $id): void
    {
        $userId = auth()->id();

        $deleted = $this->profileService->destroySocialMedia($userId, $id);

        if ($deleted === 0) {
            throw new BusinessException('socialmedia.not_found', 404);
        }
    }
}
