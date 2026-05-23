<?php

namespace App\Http\Resources;

use App\Enums\PaymentStatus;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;

class FineResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $data = [
            'return_book_id' => $this->when(isset($this->return_book_id), $this->return_book_id),
            'user_id' => $this->when(isset($this->user_id), $this->user_id),
            'late_fee' => $this->when(isset($this->late_fee), $this->late_fee),
            'other_fee' => $this->when(isset($this->other_fee), $this->other_fee),
            'total_fee' => $this->when(isset($this->total_fee), $this->total_fee),
            'fine_date' => $this->when(isset($this->fine_date), $this->fine_date ? Carbon::parse($this->fine_date)->format('d F Y') : null),
            'payment_method' => $this->when(isset($this->payment_method), $this->payment_method),
            'payment_status' => $this->when(
                isset($this->payment_status),
                fn() => $this->payment_status instanceof PaymentStatus
                    ? $this->payment_status->value
                    : PaymentStatus::from($this->payment_status)->value
            ),
            'order_id' => $this->when(isset($this->order_id), $this->order_id),
        ];

        if ($this->relationLoaded('user') && $this->user) {
            $data['user'] = UserResource::make($this->user)->resolve();
        }

        return $data;
    }
}
