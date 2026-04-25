<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Storage;

class ReviewResource extends JsonResource
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
            'rating' => $this->when(isset($this->rating), $this->rating),
            'comment' => $this->when(isset($this->comment), $this->comment),
            'created_at' => $this->when(isset($this->created_at), $this->created_at ? $this->created_at->diffForHumans() : null),
        ];

        if ($this->relationLoaded('returnBook') && $this->returnBook) {
            $data['returnBook'] = ReturnBookResource::make($this->returnBook)->resolve();
        }

        if ($this->relationLoaded('book') && $this->book) {
            $data['book'] = BookResource::make($this->book)->resolve();
        }

        if ($this->relationLoaded('user') && $this->user) {
            $data['user'] = UserResource::make($this->user)->resolve();
        }

        return $data;
    }
}
