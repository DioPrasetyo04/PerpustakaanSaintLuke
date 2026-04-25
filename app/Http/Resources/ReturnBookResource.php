<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;

class ReturnBookResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $data = [
            'return_book_code' => $this->when(isset($this->return_book_code), $this->return_book_code),
            'loan_id',
            'book_id',
            'user_id',
            'return_date' => $this->when(isset($this->return_date), $this->return_date ? Carbon::parse($this->return_date)->format('d F Y') : null),
            'status' => $this->when(isset($this->status), $this->status)
        ];

        if ($this->relationLoaded('loan') && $this->loan->isNotEmpty()) {
        }
        return $data;
    }
}
