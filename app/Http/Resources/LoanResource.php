<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;

class LoanResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $data = [
            'id' => $this->when(isset($this->id), $this->id),
            'user_id' => $this->when(isset($this->user_id), $this->user_id),
            'book_id' => $this->when(isset($this->book_id), $this->book_id),
            'loan_code' => $this->when(isset($this->loan_code), $this->loan_code),
            'loan_date' => $this->when(
                isset($this->loan_date),
                $this->loan_date
                    ? Carbon::parse($this->loan_date)->format('d F Y')
                    : null
            ),

            'due_date' => $this->when(
                isset($this->due_date),
                $this->due_date
                    ? Carbon::parse($this->due_date)->format('d F Y')
                    : null
            ),

            // OPTIONAL ATTRIBUTE
            'days_left' => $this->when(
                isset($this->days_left),
                $this->days_left
            ),

            'deadline_status' => $this->when(
                isset($this->deadline_status),
                $this->deadline_status
            ),
        ];

        if ($this->relationLoaded('user') && $this->user) {
            $data['user'] = UserResource::make($this->user)->resolve();
        }

        if ($this->relationLoaded('book') && $this->book) {
            $data['book'] = BookResource::make($this->book)->resolve();
        }
        return $data;
    }
}
