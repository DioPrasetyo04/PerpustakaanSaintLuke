<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class LanguageResource extends JsonResource
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
            'code' => $this->when(isset($this->code), $this->code),
            'photo' => $this->when(isset($this->photo), $this->photo ? Storage::url($this->photo) : null),
            'language' => $this->when(isset($this->language), $this->language)
        ];
    }
}
