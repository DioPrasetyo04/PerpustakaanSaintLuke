<?php

namespace App\Repositories;

use App\Interface\OnlineResourceInterfaceRepositories;
use App\Models\OnlineResource;
use Illuminate\Support\Collection;

class OnlineResourceRepositories implements OnlineResourceInterfaceRepositories
{
    public function getActiveResources(array $filters): Collection
    {
        return OnlineResource::query()
            ->active()
            ->when($filters['type'] ?? null, function ($query, $type) {
                if ($type !== 'Semua') {
                    $query->where('type', $type);
                }
            })
            ->when($filters['search'] ?? null, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('title', 'like', "%{$search}%")
                        ->orWhere('description', 'like', "%{$search}%")
                        ->orWhere('tag', 'like', "%{$search}%");
                });
            })
            ->when(
                ($filters['field'] ?? null) && ($filters['direction'] ?? null),
                fn($query) => $query->orderBy($filters['field'], $filters['direction']),
                fn($query) => $query->orderBy('sort_order')->orderBy('title')
            )
            ->get();
    }
}
