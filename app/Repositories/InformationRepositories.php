<?php

namespace App\Repositories;

use App\Interface\InformationRepositoriesInterface;
use App\Models\Information;
use Illuminate\Pagination\LengthAwarePaginator;

class InformationRepositories implements InformationRepositoriesInterface
{
    public function getAllInformations(array $filters, int $perPage, int $page): LengthAwarePaginator
    {
        return Information::select([
            'id',
            'image',
            'name',
            'description',
            'slug',
            'category_id',
            'created_at'
        ])
            ->with('category:id,name,icon')
            ->when($filters['search'] ?? null, function ($query, $search) {
                $query->where(function ($query) use ($search) {
                    $query->where('name', 'REGEXP', $search)
                        ->orWhere('slug', 'REGEXP', $search)
                        ->orWhere('description', 'REGEXP', $search)
                        ->orWhereHas('category', fn($q) => $q->where('name', 'REGEXP', $search));
                });
            })
            ->paginate($perPage, ['*'], 'informations_page', $page);
    }

    public function getDetailInformation(string $slug)
    {
        return Information::select([
            'image',
            'name',
            'description',
            'slug',
            'category_id',
            'created_at'
        ])
            ->with('category:id,name,icon')
            ->where('slug', $slug)
            ->firstOrFail();
    }
}
