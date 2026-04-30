<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FineSettingsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'late_fee_per_day' => $this->when(isset($this->late_fee_per_day), $this->late_fee_per_day),
            'damage_discount_type' => $this->when(isset($this->damage_discount_type->value), $this->damage_discount_type->value),
            'damage_fee_book' => $this->when(isset($this->damage_fee_book), $this->damage_fee_book),
            'lost_discount_type' => $this->when(isset($this->lost_discount_type->value), $this->lost_discount_type->value),
            'lost_fee_book' => $this->when(isset($this->lost_fee_book), $this->lost_fee_book),
            'loan_duration_days' => $this->when(isset($this->loan_duration_days), $this->loan_duration_days)
        ];
    }
}
