<?php

namespace App\Http\Middleware;

use App\Exceptions\BusinessException;
use App\Models\Loan;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserHasActiveLoan
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = auth()->user();
        if (!$user) {
            throw new BusinessException("auth.unauthenticated", 401);
        }
        $slug = $request->route('slug');

        if ($slug && !Loan::hasActiveLoanBySlug($user->id, $slug)) {
            throw new BusinessException("asset.loan_required");
        }

        return $next($request);
    }
}
