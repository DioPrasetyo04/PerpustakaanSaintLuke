<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Storage;

class UserResource extends JsonResource
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
            'email' => $this->when(isset($this->email), $this->email),
            'email_verified_at' => $this->when(isset($this->email_verified_at), $this->email_verified_at ? Carbon::parse($this->email_verified_at)->format('d F Y') : null),
            'phone' => $this->when(isset($this->phone), $this->phone),
            'avatar' => $this->when(isset($this->avatar), $this->avatar ? Storage::url($this->avatar) : null),
            'date_of_birth' => $this->when(isset($this->date_of_birth), $this->date_of_birth),
            'address' => $this->when(isset($this->address), $this->address),
            'socialmedia' => $this->whenLoaded('socialmedia', fn() => $this->socialmedia->map(fn($social) => [
                'id' => $social->id,
                'platform' => $social->platform,
                'url' => $social->url,
                'username' => $social->username,
            ])->values()),
        ];
    }
}
