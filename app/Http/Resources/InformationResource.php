<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class InformationResource extends JsonResource
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
            'image' => $this->when(isset($this->image), $this->image ? Storage::url($this->image) : null),
            'name' => $this->when(isset($this->name), $this->name),
            'description' => $this->when(isset($this->description), $this->description),
            'slug' => $this->when(isset($this->slug), $this->slug),
            'created_at' => $this->when(isset($this->created_at), $this->created_at),
        ];

        if ($this->relationLoaded('category') && $this->category) {
            $data['category'] = CategoryResource::make($this->category)->resolve();
        }
        return $data;
    }
}
