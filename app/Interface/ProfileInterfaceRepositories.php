<?php

namespace App\Interface;

interface ProfileInterfaceRepositories
{
    public function getUserWithSocialMedia(int $userId);

    public function updateUser(int $userId, array $data);

    public function deleteUser(int $userId): bool;

    public function hasActiveLoan(int $userId): bool;

    public function hasUnpaidFine(int $userId): bool;

    public function findSocialMedia(int $userId, int $id);

    public function findSocialMediaByPlatform(int $userId, string $platform);

    public function storeSocialMedia(int $userId, array $data);

    public function updateSocialMedia(int $userId, int $id, array $data): int;

    public function destroySocialMedia(int $userId, int $id): int;
}
