<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdatePasswordRequest;
use App\Services\UpdatePasswordService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class UpdatePasswordController extends Controller
{
    protected $updatePasswordController;

    public function __construct(UpdatePasswordService $updatePasswordService)
    {
        $this->updatePasswordController = $updatePasswordService;
    }

    public function edit(): Response
    {
        return Inertia::render('user/update-password');
    }

    public function update(UpdatePasswordRequest $request): RedirectResponse
    {
        $this->updatePasswordController->updatePassword($request->validated());

        return back();
    }
}
