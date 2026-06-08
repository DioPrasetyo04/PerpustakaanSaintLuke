<?php

namespace App\Interface;

use Illuminate\Support\Collection;

interface OrganizationInterfaceRepositories
{
    /**
     * Ambil seluruh anggota struktur organisasi yang aktif, terurut.
     *
     * @return Collection<int, \App\Models\OrganizationMember>
     */
    public function getActiveMembers(): Collection;
}
