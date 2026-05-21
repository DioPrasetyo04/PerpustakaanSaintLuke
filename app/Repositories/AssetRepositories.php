<?php

namespace App\Repositories;

use App\Interface\AssetInterfaceRepositories;
use App\Models\Book;
use App\Models\Loan;
use Illuminate\Support\Facades\Auth;

class AssetRepositories implements AssetInterfaceRepositories
{
    public function findBookWithAssets(string $slug)
    {
        $userId = Auth::id();

        return Book::query()
            ->select(['id', 'title', 'slug', 'cover'])
            ->where('slug', $slug)

            // 🔥 pastikan hanya buku yang dipinjam user dan belum dikembalikan
            ->whereHas('loanDetails', function ($q) use ($userId) {
                $q->whereDoesntHave('returnBook')
                    ->whereHas('loan', fn($l) => $l->where('user_id', $userId));
            })

            ->with([
                'assets:id,type,utility_path,pdf_path,status',
                'authors:id,name,username,avatar',
                'categories:id,name,icon',

                // 🔥 hanya loan_details milik user login yang masih aktif
                'loanDetails' => function ($q) use ($userId) {
                    $q->select('id', 'loan_id', 'book_id', 'loan_date', 'due_date')
                        ->whereDoesntHave('returnBook')
                        ->whereHas('loan', fn($l) => $l->where('user_id', $userId))
                        ->with('loan:id,loan_code,user_id');
                }
            ])
            ->firstOrFail();
    }

    public function getDataLoanWithAuthUser(int $bookId)
    {
        $userId = Auth::id();

        return Loan::query()
            ->select(['id', 'loan_code', 'user_id'])
            ->where('user_id', $userId)
            ->whereHas('loanDetails', fn($q) => $q
                ->where('book_id', $bookId)
                ->whereDoesntHave('returnBook'))
            ->with([
                'loanDetails' => fn($q) => $q
                    ->where('book_id', $bookId)
                    ->whereDoesntHave('returnBook')
                    ->with('book:id,title,cover,slug'),
            ])
            ->latest()
            ->firstOrFail();
    }
}
