<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class CategoryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->when(isset($this->id), $this->id),
            'name' => $this->when(isset($this->name), $this->name),
            'slug' => $this->when(isset($this->slug), $this->slug),
            'icon' => $this->when(isset($this->icon), $this->icon ? Storage::url($this->icon) : null),
            'photo' => $this->when(isset($this->photo), $this->photo ? Storage::url($this->photo) : null),
            'description' => $this->when(isset($this->description), $this->description),
            'is_active' => $this->when(isset($this->is_active), $this->is_active),
            'count_of_books' => $this->whenHas('count_of_books', $this->count_of_books ?? 0),
        ];
    }
}
