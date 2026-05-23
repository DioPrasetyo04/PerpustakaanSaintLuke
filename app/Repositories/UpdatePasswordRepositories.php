<?php

namespace App\Repositories;

use App\Interface\UpdatePasswordInterfaceRepositories;
use App\Models\User;

class UpdatePasswordRepositories implements UpdatePasswordInterfaceRepositories
{
    public function updatePassword(int $userId, string $password): void
    {
        User::query()->findOrFail($userId)->update([
            'password' => $password,
        ]);
    }
}
