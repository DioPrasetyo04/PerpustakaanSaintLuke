<?php

namespace App\Repositories;

use App\Interface\AssetInterfaceRepositories;
use App\Models\Book;
use Illuminate\Support\Facades\Auth;

class AssetRepositories implements AssetInterfaceRepositories
{
    public function findBookWithAssets(string $slug)
    {
        $userId = Auth::id();

        return Book::query()
            ->select(['id', 'title', 'slug', 'cover'])
            ->where('slug', $slug)

            // 🔥 pastikan hanya buku yang dipinjam user
            ->whereHas('loan', function ($q) use ($userId) {
                $q->where('user_id', $userId)
                    ->whereDoesntHave('returnBook');
            })

            ->with([
                'assets:id,type,utility_path,pdf_path,status',
                'authors:id,name,username,avatar',
                'categories:id,name,icon',

                // 🔥 hanya loan milik user login
                'loan' => function ($q) use ($userId) {
                    $q->select('id', 'book_id', 'user_id', 'loan_date', 'due_date')
                        ->where('user_id', $userId)
                        ->whereDoesntHave('returnBook');
                }
            ])
            ->firstOrFail();
    }
}
