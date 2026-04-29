<?php

namespace App\Http\Resources;

use App\Enums\AssetTypes;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AssetResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'type' => AssetTypes::from($this->type)->value,

            // untuk UI icon
            'label' => ucfirst(AssetTypes::from($this->type)->value),

            'url' => route('asset.stream', $this->id),
        ];
    }
}
