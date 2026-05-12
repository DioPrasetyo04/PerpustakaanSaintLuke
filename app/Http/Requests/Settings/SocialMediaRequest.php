<?php

namespace App\Http\Requests\Settings;

use App\Enums\SocialMedia;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class SocialMediaRequest extends FormRequest
{
    /**
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'platform' => ['required', 'string', Rule::in(SocialMedia::values())],
            'url' => ['required', 'string', 'url', 'max:255'],
            'username' => ['nullable', 'string', 'max:100'],
        ];
    }
}
