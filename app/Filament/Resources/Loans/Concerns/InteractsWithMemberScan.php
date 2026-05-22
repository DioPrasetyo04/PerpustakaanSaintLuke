<?php

namespace App\Filament\Resources\Loans\Concerns;

use App\Filament\Resources\Loans\LoanResource;
use App\Models\Loan;
use App\Models\User;
use Filament\Notifications\Notification;

/**
 * Logika pemindaian kartu anggota untuk halaman peminjaman.
 * Dipakai oleh CreateLoan & EditLoan (mengisi form) serta ListLoans (redirect ke form).
 *
 * Method publik dipanggil dari blade pemindai melalui $wire->{method}($code).
 */
trait InteractsWithMemberScan
{
    /**
     * Resolve & validasi user dari nilai barcode/QR kartu.
     * Mengembalikan null bila gagal (notifikasi sudah dikirim).
     */
    protected function resolveScannedMemberUser(string $code): ?User
    {
        $user = User::findByMemberBarcode($code);

        if (! $user) {
            Notification::make()
                ->danger()
                ->icon('heroicon-o-x-circle')
                ->title('Kartu Tidak Dikenali')
                ->body('Tidak ada anggota dengan kode/nomor "' . e($code) . '".')
                ->send();

            return null;
        }

        if ($user->hasAnyRole(['admin', 'manager', 'writer'])) {
            Notification::make()
                ->warning()
                ->icon('heroicon-o-exclamation-triangle')
                ->title('Bukan Anggota Peminjam')
                ->body($user->name . ' adalah staf perpustakaan, bukan anggota peminjam.')
                ->send();

            return null;
        }

        return $user;
    }

    /**
     * Dipakai pada form Create/Edit Loan: isi peminjam langsung di form yang terbuka.
     */
    public function applyScannedMember(string $code): void
    {
        $user = $this->resolveScannedMemberUser($code);

        if (! $user) {
            return;
        }

        $this->data['user_id'] = $user->id;

        if (blank($this->data['loan_code'] ?? null)) {
            $this->data['loan_code'] = generateUniqueCode('Loan', Loan::class, 'loan_code');
        }

        Notification::make()
            ->success()
            ->icon('heroicon-o-check-circle')
            ->title('Peminjam Terpilih')
            ->body($user->name . ' (' . $user->username . ') berhasil dipilih dari kartu.')
            ->send();

        $this->unmountAction();
    }

    /**
     * Dipakai pada tabel Loan: scan kartu lalu menuju form create dengan peminjam terisi.
     */
    public function redirectScannedMemberToCreate(string $code): void
    {
        $user = $this->resolveScannedMemberUser($code);

        if (! $user) {
            return;
        }

        Notification::make()
            ->success()
            ->icon('heroicon-o-check-circle')
            ->title('Peminjam Terpilih')
            ->body('Membuka form peminjaman untuk ' . $user->name . '.')
            ->send();

        $this->redirect(LoanResource::getUrl('create', ['user_id' => $user->id]));
    }
}
