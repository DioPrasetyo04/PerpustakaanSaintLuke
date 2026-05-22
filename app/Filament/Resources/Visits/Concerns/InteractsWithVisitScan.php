<?php

namespace App\Filament\Resources\Visits\Concerns;

use App\Filament\Resources\Visits\VisitResource;
use App\Models\User;
use App\Models\Visit;
use App\Services\MemberCardService;
use Carbon\Carbon;
use Filament\Actions\Action;
use Filament\Notifications\Notification;
use Filament\Support\Enums\Width;

/**
 * Pemindaian kartu anggota untuk pencatatan kunjungan perpustakaan.
 * Saat kartu dipindai, hanya pengguna perpustakaan (role member/user) yang dicatat:
 * kunjungan otomatis tersimpan (tanpa mengisi form) lalu muncul popup sambutan.
 * Staf maupun akun tanpa role ditolak (popup silang) tanpa menyimpan data.
 *
 * Dipakai oleh halaman ListVisits & CreateVisit.
 */
trait InteractsWithVisitScan
{
    /**
     * Role yang dianggap "pengguna perpustakaan" dan boleh mencatat kunjungan.
     * Selain ini — staf (admin/manager/writer) maupun akun tanpa role — ditolak.
     */
    protected array $libraryPatronRoles = ['member', 'user'];

    /** Tombol header untuk membuka pemindai kunjungan. */
    public function scanVisitAction(): Action
    {
        return Action::make('scanVisit')
            ->label('Scan Kunjungan (Scan Kartu)')
            ->icon('heroicon-o-qr-code')
            ->color('success')
            ->modalHeading('Scan Kartu Anggota — Kunjungan')
            ->modalDescription('Pindai barcode / QR pada kartu anggota. Kunjungan otomatis tercatat tanpa mengisi form.')
            ->modalIcon('heroicon-o-qr-code')
            ->modalContent(fn() => view('filament.loan.scanner', ['wireMethod' => 'recordVisitScan']))
            ->modalSubmitAction(false)
            ->modalCancelActionLabel('Tutup');
    }

    /**
     * Dipanggil dari blade pemindai via $wire->recordVisitScan($code).
     * Membuat catatan kunjungan otomatis lalu menampilkan popup hasil.
     */
    public function recordVisitScan(string $code): void
    {
        $user = User::findByMemberBarcode($code);

        // Barcode tak dikenal / user sudah terhapus → arahkan ke form input manual (tamu).
        if (! $user) {
            Notification::make()
                ->danger()
                ->icon('heroicon-o-x-circle')
                ->title('Bukan Pengguna Perpustakaan')
                ->body('Maaf, Anda bukan pengguna perpustakaan. Silakan isi data kunjungan secara manual.')
                ->send();

            // Notifikasi di atas otomatis muncul di halaman tujuan setelah redirect.
            $this->redirect(VisitResource::getUrl('create'));

            return;
        }

        // Hanya pengguna perpustakaan (role member/user) yang boleh mencatat kunjungan.
        // Staf (admin/manager/writer) maupun akun tanpa role ditolak — data TIDAK disimpan.
        if (! $user->hasAnyRole($this->libraryPatronRoles)) {
            Notification::make()
                ->danger()
                ->icon('heroicon-o-x-circle')
                ->title('Akses Ditolak')
                ->body('Anda bukan pengguna perpustakaan.')
                ->send();

            // Tampilkan popup penolakan (di-resolve dari method visitRejectedAction()).
            $this->replaceMountedAction('visitRejected', [
                'userId' => $user->id,
            ]);

            return;
        }

        // Aturan 1 pengguna 1x kunjungan per hari — hindari data ganda.
        if (Visit::recordedToday($user->id)) {
            $this->replaceMountedAction('visitAlready', [
                'userId' => $user->id,
            ]);

            return;
        }

        // Catat kunjungan otomatis: visit_date hari ini (WIB) + data dari profil user.
        Visit::create([
            'user_id'    => $user->id,
            'name'       => $user->name,
            'address'    => $user->address ?: '-',
            'visit_date' => Carbon::now('Asia/Jakarta'),
            'type'       => $user->type,
            'type_other' => $user->type_other,
            'note'       => 'Berkunjung Hari ini',
        ]);

        // Lanjut ke popup sambutan (di-resolve dari method visitResultAction()).
        $this->replaceMountedAction('visitResult', [
            'userId' => $user->id,
        ]);
    }

    /** Popup hasil sambutan kunjungan (check icon + foto + nama + email + deskripsi). */
    public function visitResultAction(): Action
    {
        return Action::make('visitResult')
            ->modalIcon('heroicon-o-check-circle')
            ->modalIconColor('success')
            ->modalHeading('Terima Kasih Telah Berkunjung!')
            ->modalContent(function (array $arguments) {
                $user = User::find($arguments['userId'] ?? null);

                if (! $user) {
                    return null;
                }

                return view('filament.visit.result', [
                    'variant'     => 'success',
                    'name'        => $user->name,
                    'email'       => $user->email,
                    'photo'       => MemberCardService::avatarDataUri($user)
                        ?? ('https://ui-avatars.com/api/?name=' . urlencode($user->name) . '&background=047857&color=fff'),
                    'description' => 'Kunjungan Anda telah tercatat. Selamat menikmati layanan perpustakaan.',
                ]);
            })
            ->modalWidth(Width::Medium)
            ->modalSubmitAction(false)
            ->modalCancelActionLabel('Selesai');
    }

    /**
     * Popup penolakan kunjungan (cross/silang icon + foto + nama + email + pesan).
     * Ditampilkan untuk staf maupun akun yang bukan pengguna perpustakaan.
     */
    public function visitRejectedAction(): Action
    {
        return Action::make('visitRejected')
            ->modalIcon('heroicon-o-x-circle')
            ->modalIconColor('danger')
            ->modalHeading('Akses Ditolak')
            ->modalContent(function (array $arguments) {
                $user = User::find($arguments['userId'] ?? null);

                if (! $user) {
                    return null;
                }

                return view('filament.visit.result', [
                    'variant'     => 'danger',
                    'name'        => $user->name,
                    'email'       => $user->email,
                    'photo'       => MemberCardService::avatarDataUri($user)
                        ?? ('https://ui-avatars.com/api/?name=' . urlencode($user->name) . '&background=b91c1c&color=fff'),
                    'description' => 'Anda bukan pengguna perpustakaan.',
                ]);
            })
            ->modalWidth(Width::Medium)
            ->modalSubmitAction(false)
            ->modalCancelActionLabel('Tutup');
    }

    /**
     * Popup "sudah tercatat hari ini" — ditampilkan bila pengguna sudah berkunjung
     * hari ini (1 pengguna 1x/hari) sehingga tidak membuat data ganda.
     */
    public function visitAlreadyAction(): Action
    {
        return Action::make('visitAlready')
            ->modalIcon('heroicon-o-clock')
            ->modalIconColor('warning')
            ->modalHeading('Sudah Tercatat Hari Ini')
            ->modalContent(function (array $arguments) {
                $user = User::find($arguments['userId'] ?? null);

                if (! $user) {
                    return null;
                }

                return view('filament.visit.result', [
                    'variant'     => 'warning',
                    'name'        => $user->name,
                    'email'       => $user->email,
                    'photo'       => MemberCardService::avatarDataUri($user)
                        ?? ('https://ui-avatars.com/api/?name=' . urlencode($user->name) . '&background=b45309&color=fff'),
                    'description' => 'Kunjungan Anda sudah tercatat hari ini. Tidak perlu mendaftar ulang.',
                ]);
            })
            ->modalWidth(Width::Medium)
            ->modalSubmitAction(false)
            ->modalCancelActionLabel('Selesai');
    }
}
