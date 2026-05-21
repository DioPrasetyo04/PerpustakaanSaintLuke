<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Notifications\AccountApprovedNotification;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserApprovalController extends Controller
{
    public function approve(Request $request, User $user): RedirectResponse
    {
        if (! $request->hasValidSignature()) {
            abort(403, 'Link persetujuan tidak valid atau sudah kedaluwarsa.');
        }

        $approver = Auth::user();

        if ($approver && ! $approver->hasRole('admin')) {
            abort(403, 'Hanya admin yang dapat menyetujui pendaftaran.');
        }

        if ($user->is_approved) {
            return redirect(filament()->getPanel('admin')->getUrl())
                ->with('status', 'User ' . $user->name . ' sudah disetujui sebelumnya.');
        }

        $user->approve($approver);
        $user->notify(new AccountApprovedNotification());

        return redirect(filament()->getPanel('admin')->getUrl())
            ->with('status', 'User ' . $user->name . ' berhasil disetujui.');
    }

    public function reject(Request $request, User $user): RedirectResponse
    {
        if (! $request->hasValidSignature()) {
            abort(403, 'Link penolakan tidak valid atau sudah kedaluwarsa.');
        }

        $approver = Auth::user();

        if ($approver && ! $approver->hasRole('admin')) {
            abort(403, 'Hanya admin yang dapat menolak pendaftaran.');
        }

        if ($user->is_approved) {
            return redirect(filament()->getPanel('admin')->getUrl())
                ->with('status', 'User sudah disetujui dan tidak dapat ditolak.');
        }

        $user->delete();

        return redirect(filament()->getPanel('admin')->getLoginUrl())
            ->with('status', 'Pendaftaran berhasil ditolak.');
    }
}
