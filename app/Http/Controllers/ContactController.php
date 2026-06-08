<?php

namespace App\Http\Controllers;

use App\Exceptions\BusinessException;
use App\Services\ContactMessageService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;

class ContactController extends Controller
{
    public function __construct(
        protected ContactMessageService $contactMessage
    ) {}

    public function index(): Response
    {
        return Inertia::render('about/ContactPage');
    }

    public function send(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:120'],
            'status' => ['required', 'string', 'max:60'],
            'email' => ['required', 'email', 'max:160'],
            'phone' => ['nullable', 'string', 'max:30'],
            'subject' => ['required', 'string', 'max:160'],
            'message' => ['required', 'string', 'max:2000'],
            'agree' => ['accepted'],
        ]);

        try {
            $this->contactMessage->send($validated);
        } catch (BusinessException $e) {
            // Mengembalikan kunci pesan agar frontend memetakan ke bahasa aktif.
            return back()->withErrors(['contact' => $e->getMessage()]);
        } catch (\Throwable $e) {
            Log::error('[Contact] Gagal mengirim pesan kontak', [
                'message' => $e->getMessage(),
            ]);

            return back()->withErrors(['contact' => 'contact.failed']);
        }

        return back()->with('success', 'contact.sent');
    }
}
