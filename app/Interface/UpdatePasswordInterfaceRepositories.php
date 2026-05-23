<?php

namespace App\Interface;

interface UpdatePasswordInterfaceRepositories
{
    public function updatePassword(int $userId, string $password): void;
}
