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

    /**
     * Akun staf (admin/super_admin) bukan anggota peminjam, jadi tidak boleh
     * membaca/meminjam buku. Pengecekan ini ada di frontend (UX) sekaligus di
     * sini sebagai pengaman bila route diakses langsung.
     */
    private function isStaff(\App\Models\User $user): bool
    {
        return $user->hasAnyRole(['admin', 'super_admin']);
    }

    public function confirmation(string $slug)
    {
        // dd($slug);
        // dd('masuk controller sebelum service');
        $user = auth()->user();

        // Tolak akun staf: tampilkan modal "Akun Staf Tidak Diizinkan" (multi-bahasa).
        if ($this->isStaff($user)) {
            return back()->with('access_denied', 'staff');
        }

        // 🔥 HANDLE VERIFIED MANUAL (INERTIA WAY)
        if (!$user->hasVerifiedEmail()) {
            return Inertia::location(route('verification.notice'));
        }

        // Pengaturan denda belum dikonfigurasi admin → jangan 404, tampilkan
        // popup handler "konfigurasi denda belum diatur" (lihat AccessDeniedModal).
        if (! \App\Models\FineSettings::query()->exists()) {
            return back()->with('access_denied', 'fine_unset');
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
        // Pengaman: akun staf tidak boleh meminjam/membaca buku.
        if ($this->isStaff(auth()->user())) {
            abort(403, 'Akun staf tidak dapat meminjam atau membaca buku.');
        }

        $slug = $this->loanController->readDigitalBook($slug);

        return response()->json([
            'message' => 'loan.success',
            'slug'    => $slug,
        ]);
    }
}
