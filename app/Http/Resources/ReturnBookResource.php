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
            'status' => $this->when(isset($this->status), $this->status),
            'return_status_label' => $this->when(
                isset($this->return_status_label),
                $this->return_status_label
            ),

            'return_status_color' => $this->when(
                isset($this->return_status_color),
                $this->return_status_color
            ),

            'has_fine' => $this->when(
                isset($this->has_fine),
                $this->has_fine
            ),

            'fine_amount' => $this->when(
                isset($this->fine_amount),
                $this->fine_amount
            ),

            'payment_status' => $this->when(
                isset($this->payment_status),
                $this->payment_status
            ),
        ];

        if ($this->relationLoaded('loan') && $this->loan) {
            $data['loan'] = LoanResource::make($this->loan)->resolve();
        }

        if ($this->relationLoaded('user') && $this->user) {
            $data['user'] = UserResource::make($this->user)->resolve();
        }

        if ($this->relationLoaded('book') && $this->book) {
            $data['book'] = BookResource::make($this->book)->resolve();
        }

        if ($this->relationLoaded('fine') && $this->fine) {
            $data['fine'] = FineResource::make($this->fine)->resolve();
        }
        if ($this->relationLoaded('returnBookCheck') && $this->returnBookCheck) {
            $data['returnBookCheck'] = ReturnBookCheckResource::make($this->returnBookCheck)->resolve();
        }

        if ($this->relationLoaded('review') && $this->review) {
            $data['review'] = ReviewResource::make($this->review)->resolve();
        }
        return $data;
    }
}
