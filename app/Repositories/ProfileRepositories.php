<?php

namespace App\Repositories;

use App\Enums\PaymentStatus;
use App\Interface\ProfileInterfaceRepositories;
use App\Models\Fine;
use App\Models\Loan;
use App\Models\SocialMedia;
use App\Models\User;

class ProfileRepositories implements ProfileInterfaceRepositories
{
    public function getUserWithSocialMedia(int $userId)
    {
        return User::query()
            ->with(['socialmedia:id,socialable_id,socialable_type,platform,url,username'])
            ->findOrFail($userId);
    }

    public function updateUser(int $userId, array $data)
    {
        $user = User::query()->findOrFail($userId);
        $user->fill($data);

        if (array_key_exists('email', $data) && $user->isDirty('email')) {
            $user->email_verified_at = null;
        }

        $user->save();

        return $user->refresh();
    }

    public function deleteUser(int $userId): bool
    {
        $user = User::query()->findOrFail($userId);

        return (bool) $user->delete();
    }

    public function hasActiveLoan(int $userId): bool
    {
        return Loan::query()
            ->where('user_id', $userId)
            ->whereDoesntHave('returnBook')
            ->exists();
    }

    public function hasUnpaidFine(int $userId): bool
    {
        return Fine::query()
            ->where('user_id', $userId)
            ->whereIn('payment_status', [
                PaymentStatus::PENDING->value,
                PaymentStatus::FAILED->value,
                PaymentStatus::ERROR->value,
            ])
            ->exists();
    }

    public function findSocialMedia(int $userId, int $id)
    {
        return SocialMedia::query()
            ->where('id', $id)
            ->where('socialable_id', $userId)
            ->where('socialable_type', User::class)
            ->first();
    }

    public function findSocialMediaByPlatform(int $userId, string $platform)
    {
        return SocialMedia::query()
            ->where('socialable_id', $userId)
            ->where('socialable_type', User::class)
            ->where('platform', $platform)
            ->first();
    }

    public function storeSocialMedia(int $userId, array $data)
    {
        return SocialMedia::query()->create([
            'socialable_id' => $userId,
            'socialable_type' => User::class,
            'platform' => $data['platform'],
            'url' => $data['url'],
            'username' => $data['username'] ?? null,
        ]);
    }

    public function updateSocialMedia(int $userId, int $id, array $data): int
    {
        return SocialMedia::query()
            ->where('id', $id)
            ->where('socialable_id', $userId)
            ->where('socialable_type', User::class)
            ->update([
                'platform' => $data['platform'],
                'url' => $data['url'],
                'username' => $data['username'] ?? null,
            ]);
    }

    public function destroySocialMedia(int $userId, int $id): int
    {
        return SocialMedia::query()
            ->where('id', $id)
            ->where('socialable_id', $userId)
            ->where('socialable_type', User::class)
            ->delete();
    }
}
