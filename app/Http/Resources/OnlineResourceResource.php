<?php

namespace App\Http\Resources;

use App\Enums\OnlineResourceType;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OnlineResourceResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $type = OnlineResourceType::tryFrom($this->type);

        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'type' => $this->type,
            'icon' => $type?->icon() ?? 'book-open',
            'format' => $this->format,
            'tag' => $this->tag,
            'description' => $this->description,
            'url' => $this->url,
            'palette' => (int) $this->palette,
        ];
    }
}
