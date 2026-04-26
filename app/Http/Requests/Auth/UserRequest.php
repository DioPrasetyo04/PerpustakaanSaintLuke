<?php

namespace App\Http\Requests\Auth;

use Illuminate\Validation\Rules;
use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $isCreate = $this->isMethod('post');
        $userId = $this->user()?->id;

        return [
            'name' => $isCreate ? 'required|string|max:255' : 'nullable|string|max:255',

            'email' => [
                $isCreate ? 'required' : 'nullable',
                'string',
                'email',
                'max:255',
                'unique:users,email,' . $userId,
            ],

            'password' => [
                $isCreate ? 'required' : 'nullable',
                'confirmed',
                Rules\Password::defaults(),
            ],

            'phone' => [
                $isCreate ? 'required' : 'nullable',
                'string',
                'max:255',
                'unique:users,phone,' . $userId,
            ],

            'avatar' => 'nullable|image|mimes:jpg,jpeg,webp,png|max:2048',
        ];
    }
}
