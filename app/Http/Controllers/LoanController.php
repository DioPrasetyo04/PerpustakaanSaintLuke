<?php

namespace App\Http\Controllers;

use App\Services\LoanService;
use Exception;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Throwable;

class LoanController extends Controller
{
    protected $loanController;

    public function __construct(LoanService $loanService)
    {
        $this->loanController = $loanService;
    }

    public function index(Request $request)
    {
        $filters = $request->only(['search', 'field', 'direction']);
        $page = (int) $request->get('page', 1);
        $perPage = (int) $request->get('per_page', 10);

        $loans = $this->loanController->getDataLoanUserAuth($filters, $perPage, $page);

        return Inertia::render('Dashboard/Loans', [
            'loans' => $loans
        ]);
    }

    public function confirmation(string $slug)
    {
        // dd($slug);
        // dd('masuk controller sebelum service');
        $user = auth()->user();

        // 🔥 HANDLE VERIFIED MANUAL (INERTIA WAY)
        if (!$user->hasVerifiedEmail()) {
            return Inertia::location(route('verification.notice'));
        }
        $data = $this->loanController->getConfirmationLoanUserAuth($slug);

        // dd([
        //     'book' => $data['book'],
        //     'loanPreview' => $data['loan_preview']
        // ]);

        return Inertia::render('book/loan/Confirm', [
            'book' => $data['book'],
            'loanPreview' => $data['loan_preview'],
            'fineSettings' => $data['fine_settings']
        ]);
    }

    /**
     * Alur "Baca Buku": buat peminjaman digital (bila belum ada) lalu kembalikan
     * slug agar frontend mengarahkan langsung ke halaman aset buku.
     */
    public function readDigital(string $slug)
    {
        $slug = $this->loanController->readDigitalBook($slug);

        return response()->json([
            'message' => 'loan.success',
            'slug'    => $slug,
        ]);
    }
}
