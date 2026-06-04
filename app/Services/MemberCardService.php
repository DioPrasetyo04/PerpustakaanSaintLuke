<?php

namespace App\Services;

use App\Models\User;
use Endroid\QrCode\ErrorCorrectionLevel;
use Endroid\QrCode\QrCode;
use Endroid\QrCode\Writer\PngWriter;
use Illuminate\Support\Facades\Storage;
use Picqer\Barcode\BarcodeGeneratorPNG;

/**
 * Membangun seluruh data visual kartu anggota perpustakaan:
 * - Barcode Code128 (untuk scanner USB / keyboard-wedge)
 * - QR Code (untuk scan via kamera webcam / HP)
 * - Logo perpustakaan & foto user sebagai data-URI base64
 *
 * Semua gambar dikembalikan sebagai data-URI base64 agar konsisten
 * dirender baik di modal (HTML) maupun di PDF (dompdf, tanpa akses jaringan).
 */
class MemberCardService
{
    /**
     * Nilai yang di-encode pada barcode/QR = username (sekaligus Nomor Anggota).
     */
    public static function barcodeValue(User $user): string
    {
        return (string) $user->username;
    }

    /**
     * Barcode Code128 sebagai data-URI PNG.
     */
    public static function barcodePngDataUri(string $value, int $widthFactor = 2, int $height = 55): string
    {
        $generator = new BarcodeGeneratorPNG();
        $png = $generator->getBarcode($value, $generator::TYPE_CODE_128, $widthFactor, $height);

        return 'data:image/png;base64,' . base64_encode($png);
    }

    /**
     * QR Code sebagai data-URI PNG.
     */
    public static function qrPngDataUri(string $value, int $size = 220): string
    {
        $qr = new QrCode(
            data: $value,
            errorCorrectionLevel: ErrorCorrectionLevel::Medium,
            size: $size,
            margin: 8,
        );

        return (new PngWriter())->write($qr)->getDataUri();
    }

    /**
     * Logo perpustakaan sebagai data-URI (null bila berkas tidak ada).
     */
    public static function logoDataUri(): ?string
    {
        $path = public_path('assets/logos/Saint-Luke.png');

        if (! is_file($path)) {
            return null;
        }

        return 'data:image/jpeg;base64,' . base64_encode((string) file_get_contents($path));
    }

    /**
     * Foto user sebagai data-URI (null bila tidak ada / file hilang).
     */
    public static function avatarDataUri(User $user): ?string
    {
        $avatar = $user->avatar;

        if (! $avatar) {
            return null;
        }

        if (str_starts_with($avatar, 'http://') || str_starts_with($avatar, 'https://')) {
            return $avatar;
        }

        $disk = Storage::disk('public');

        if (! $disk->exists($avatar)) {
            return null;
        }

        $mime = $disk->mimeType($avatar) ?: 'image/jpeg';

        return 'data:' . $mime . ';base64,' . base64_encode((string) $disk->get($avatar));
    }

    /**
     * Inisial nama untuk fallback foto (mis. "DP" dari "Dio Prasetyo").
     */
    public static function initials(User $user): string
    {
        $parts = preg_split('/\s+/', trim((string) $user->name)) ?: [];
        $parts = array_filter($parts);

        $initials = collect($parts)
            ->take(2)
            ->map(fn($p) => mb_strtoupper(mb_substr($p, 0, 1)))
            ->implode('');

        return $initials !== '' ? $initials : '?';
    }

    /**
     * Seluruh payload yang dikonsumsi blade kartu (modal & PDF).
     *
     * @return array<string, mixed>
     */
    public static function payload(User $user): array
    {
        $value = self::barcodeValue($user);

        return [
            'user'          => $user,
            'name'          => $user->name,
            'member_number' => $value,
            'kelas'         => $user->getTypeLabelAttribute(),
            'address'       => $user->address ?: '-',
            'phone'         => $user->phone ?: '-',
            'email'         => $user->email,
            'avatar'        => self::avatarDataUri($user),
            'initials'      => self::initials($user),
            'barcode'       => self::barcodePngDataUri($value),
            'qr'            => self::qrPngDataUri($value),
            'logo'          => self::logoDataUri(),
            'issued_at'     => $user->member_card_issued_at,
        ];
    }
}
