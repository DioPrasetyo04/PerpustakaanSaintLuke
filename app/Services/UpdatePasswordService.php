<?php

namespace App\Services;

use App\Interface\UpdatePasswordInterfaceRepositories;

class UpdatePasswordService
{
    protected $updatePasswordService;

    public function __construct(UpdatePasswordInterfaceRepositories $updatePasswordRepositories)
    {
        $this->updatePasswordService = $updatePasswordRepositories;
    }

    public function updatePassword(array $data): void
    {
        $this->updatePasswordService->updatePassword(auth()->id(), $data['password']);
    }
}
