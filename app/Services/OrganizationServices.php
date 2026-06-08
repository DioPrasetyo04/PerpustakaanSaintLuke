<?php

namespace App\Services;

use App\Interface\OrganizationInterfaceRepositories;

class OrganizationServices
{
    public function __construct(
        protected OrganizationInterfaceRepositories $organizationRepository
    ) {}

    /**
     * Daftar anggota struktur organisasi siap pakai frontend (dengan URL foto publik),
     * dipisah antara anggota sorotan (pimpinan) dan anggota lain.
     *
     * @return array{featured: array<int, array<string, mixed>>, members: array<int, array<string, mixed>>}
     */
    public function getStructure(): array
    {
        $members = $this->organizationRepository->getActiveMembers()
            ->map(fn ($member) => [
                'id' => $member->id,
                'name' => $member->name,
                'role' => $member->role,
                'specialization' => $member->specialization,
                'photo_url' => $member->photo_url,
                'is_featured' => $member->is_featured,
            ]);

        return [
            'featured' => $members->where('is_featured', true)->values()->all(),
            'members' => $members->where('is_featured', false)->values()->all(),
        ];
    }
}
