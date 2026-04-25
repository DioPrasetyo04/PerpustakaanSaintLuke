<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;

class StockResource extends JsonResource
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
            'total' => $this->when(isset($this->total), $this->total),
            'available' => $this->when(isset($this->available), $this->available),
            'loan' => $this->when(isset($this->loan), $this->loan),
            'damaged' => $this->when(isset($this->damaged), $this->damaged),
            'lost' => $this->when(isset($this->lost), $this->lost),
            'created_at' => $this->when(isset($this->created_at), $this->created_at ? Carbon::parse($this->created_at)->format('d F Y') : null),
        ];
        if ($this->relationLoaded('book') && $this->book) {
            $data['book'] = BookResource::make($this->book)->resolve();
        }
        return $data;
    }
}
