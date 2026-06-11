<?php

namespace App\Http\Controllers;

use App\Exceptions\BusinessException;
use App\Http\Requests\ReturnBookRequest;
use App\Services\ReturnBookService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReturnBookController extends Controller
{
    protected $returnController;

    public function __construct(ReturnBookService $service)
    {
        $this->returnController = $service;
    }

    public function confirmation(string $slug, string $loanCode)
    {
        // Pengaturan denda belum dikonfigurasi admin → jangan panggil service
        // (FineSettings::checkSettings() akan firstOrFail → 404). Tolak proses
        // dan tampilkan popup multi-bahasa "Pengaturan Denda Belum Diatur".
        if (! \App\Models\FineSettings::query()->exists()) {
            return back()->with('access_denied', 'fine_unset');
        }

        $data = $this->returnController->getConfirmationReturnBookUserAuth($slug, $loanCode, auth()->id());

        // Buku sudah dikembalikan → jangan tampilkan halaman konfirmasi yang akan
        // gagal saat submit; arahkan ke daftar pinjaman dengan info.
        if (!empty($data['already_returned'])) {
            return redirect()
                ->route('loan.index')
                ->with('info', 'return.already_returned');
        }

        return Inertia::render('book/return/Confirmation', [
            'data' => $data,
            // Status konfigurasi denda: bila belum diatur admin, halaman menolak
            // proses pengembalian dan memunculkan popup "Pengaturan Denda Belum
            // Diatur" (tanpa redirect). Lihat Confirmation.tsx + AccessDeniedModal.
            'fineSettingsConfigured' => \App\Models\FineSettings::query()->exists(),
        ]);
    }

    public function store(ReturnBookRequest $request, string $slug)
    {
        // Pengaman server: tolak pengembalian bila pengaturan denda belum
        // dikonfigurasi (perhitungan denda akan tidak valid tanpa setting).
        // Picu popup multi-bahasa "Pengaturan Denda Belum Diatur".
        if (! \App\Models\FineSettings::query()->exists()) {
            return back()->with('access_denied', 'fine_unset');
        }

        $validated = $request->validated();

        $return = $this->returnController->processReturnBook(
            $validated,
            auth()->id(),
            $slug
        );

        if (!empty($validated['rating'])) {
            try {
                $this->returnController->storeReview(
                    $return->return_book_code,
                    ['rating' => $validated['rating'], 'comment' => $validated['comment'] ?? null],
                    auth()->id()
                );
            } catch (BusinessException) {
                // Already reviewed — skip silently so return still succeeds
            }
        }

        return redirect()
            ->route('home', $return->return_book_code)
            ->with('success', 'data.success');
    }


    public function detail(string $returnCode)
    {
        $data = $this->returnController->getDetailReturnBookUserAuth($returnCode);

        return Inertia::render('book/return/Detail', [
            'data' => $data
        ]);
    }

    public function index()
    {
        return Inertia::render('book/return/Index');
    }

    public function storeReview(Request $request, string $returnBookCode): JsonResponse
    {
        $data = $request->validate([
            'rating'  => ['required', 'numeric', 'min:1', 'max:5'],
            'comment' => ['nullable', 'string', 'max:1000'],
        ]);

        $this->returnController->storeReview($returnBookCode, $data, auth()->id());

        return response()->json(['message' => 'review.success']);
    }
}
