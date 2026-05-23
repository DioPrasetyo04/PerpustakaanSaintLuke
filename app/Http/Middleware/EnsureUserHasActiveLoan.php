<?php

namespace App\Http\Middleware;

use App\Exceptions\BusinessException;
use App\Models\Loan;
use App\Models\LoanDetail;
use App\Services\DigitalAutoReturnService;
use Carbon\Carbon;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserHasActiveLoan
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = auth()->user();
        if (!$user) {
            throw new BusinessException("auth.unauthenticated", 401);
        }

        $slug      = $request->route('slug');
        $routeName = $request->route()->getName();

        // Hanya route book.assets yang mendapat pengecekan expiry & popup
        if ($routeName !== 'book.assets' || !$slug) {
            if ($slug && !Loan::hasActiveLoanBySlug($user->id, $slug)) {
                throw new BusinessException("asset.loan_required");
            }
            return $next($request);
        }

        // --- Pengecekan khusus route book.assets ---
        $activeLoanDetail = LoanDetail::query()
            ->whereDoesntHave('returnBook')
            ->whereHas('loan', fn($q) => $q->where('user_id', $user->id))
            ->whereHas('book', fn($b) => $b->where('slug', $slug))
            ->first();

        if ($activeLoanDetail) {
            // Loan aktif ada — cek apakah due_date sudah lewat
            if (Carbon::parse($activeLoanDetail->due_date)->lt(Carbon::today())) {
                app(DigitalAutoReturnService::class)->autoReturn($activeLoanDetail);
                return redirect()->route('book.detail', ['slug' => $slug])
                    ->with('access_denied', 'expired');
            }
            return $next($request);
        }

        // Tidak ada active loan — cek riwayat peminjaman buku ini
        $hasHistory = LoanDetail::query()
            ->whereHas('returnBook')
            ->whereHas('loan', fn($q) => $q->where('user_id', $user->id))
            ->whereHas('book', fn($b) => $b->where('slug', $slug))
            ->exists();

        $deniedType = $hasHistory ? 'expired' : 'unauthorized';

        return redirect()->route('book.detail', ['slug' => $slug])
            ->with('access_denied', $deniedType);
    }
}
