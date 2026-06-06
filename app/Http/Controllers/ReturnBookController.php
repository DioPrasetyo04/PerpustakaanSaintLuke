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
        $data = $this->returnController->getConfirmationReturnBookUserAuth($slug, $loanCode, auth()->id());

        // Buku sudah dikembalikan → jangan tampilkan halaman konfirmasi yang akan
        // gagal saat submit; arahkan ke daftar pinjaman dengan info.
        if (!empty($data['already_returned'])) {
            return redirect()
                ->route('loan.index')
                ->with('info', 'return.already_returned');
        }

        return Inertia::render('book/return/Confirmation', [
            'data' => $data
        ]);
    }

    public function store(ReturnBookRequest $request, string $slug)
    {
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
