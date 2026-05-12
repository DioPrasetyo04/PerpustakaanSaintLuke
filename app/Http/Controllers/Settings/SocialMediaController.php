<?php

namespace App\Http\Controllers\Settings;

use App\Exceptions\BusinessException;
use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\SocialMediaRequest;
use App\Services\ProfileService;

class SocialMediaController extends Controller
{
    protected $profileController;

    public function __construct(ProfileService $profileService)
    {
        $this->profileController = $profileService;
    }

    public function store(SocialMediaRequest $request)
    {
        try {
            $this->profileController->addSocialMedia($request->validated());
        } catch (BusinessException $e) {
            return back()->withErrors([
                'platform' => $this->translateError($e->getMessage()),
            ]);
        }

        return back();
    }

    public function update(SocialMediaRequest $request, int $id)
    {
        try {
            $this->profileController->updateSocialMedia($id, $request->validated());
        } catch (BusinessException $e) {
            return back()->withErrors([
                'platform' => $this->translateError($e->getMessage()),
            ]);
        }

        return back();
    }

    public function destroy(int $id)
    {
        try {
            $this->profileController->deleteSocialMedia($id);
        } catch (BusinessException $e) {
            return back()->withErrors([
                'social' => $this->translateError($e->getMessage()),
            ]);
        }

        return back();
    }

    private function translateError(string $key): string
    {
        return match ($key) {
            'socialmedia.platform_exists' => 'Platform tersebut sudah terdaftar.',
            'socialmedia.not_found' => 'Social media tidak ditemukan.',
            default => $key,
        };
    }
}
