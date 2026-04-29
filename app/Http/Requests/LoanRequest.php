<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class LoanRequest extends FormRequest
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
    public function rules($book): array
    {
        $bookId = $this->book()->id;
        $userId = $this->user()->id;
        return [
            'loan_code' => ['required', 'string', 'unique:loans,loan_code'],
            'loan_date' => ['required', 'date'],
            'due_date' => ['required', 'date'],
            'book_id' => ['required', 'numeric' . $bookId],
            'user_id' => ['required', 'numeric' . $userId]
        ];
    }
}
