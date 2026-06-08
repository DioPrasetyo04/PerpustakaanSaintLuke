<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class AuthorResource extends JsonResource
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
            'username' => $this->when(isset($this->username), $this->username),
            'phone' => $this->when(isset($this->phone), $this->phone),
            'gender' => $this->when(isset($this->gender), $this->gender),
            'date_of_birth' => $this->when(isset($this->date_of_birth), $this->date_of_birth),
            'nationality' => $this->when(isset($this->nationality), $this->nationality),
            'avatar' => $this->when(isset($this->avatar), $this->avatar ? Storage::url($this->avatar) : null),
            'bio' => $this->when(isset($this->bio), $this->bio),
            'verified_at' => $this->when(isset($this->verified_at), $this->verified_at),
            'count_of_books' => $this->whenHas('count_of_books', $this->count_of_books ?? 0),
            'socialmedia' => $this->whenLoaded('socialmedia', fn() => $this->socialmedia->map(fn($social) => [
                'id' => $social->id,
                'platform' => $social->platform,
                'url' => $social->url,
                'username' => $social->username,
            ])->values()),
        ];
    }
}
