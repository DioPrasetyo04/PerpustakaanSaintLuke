<?php

namespace App\Http\Resources;

use App\Enums\BookCondition;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReturnBookCheckResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'return_book_id' => $this->when(isset($this->return_book_id), $this->return_book_id),
            'condition' => $this->when(isset($this->condition), BookCondition::from($this->condition)->value),
            'notes' => $this->when(isset($this->notes), $this->notes)
        ];
    }
}
