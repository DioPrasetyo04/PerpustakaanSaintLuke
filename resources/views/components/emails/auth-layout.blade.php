@props([
    'title' => 'Saint Luke E-Library',
    'preheader' => null,
])

@php
    // Embed gambar sebagai data URI base64 agar tampil di semua email client.
    $embedImage = function (?string $relative): ?string {
        if (! $relative) {
            return null;
        }
        $candidates = [
            public_path(ltrim($relative, '/')),
            storage_path('app/public/' . ltrim($relative, '/')),
        ];
        foreach ($candidates as $path) {
            if (is_file($path)) {
                $mime = function_exists('mime_content_type') ? (mime_content_type($path) ?: 'image/png') : 'image/png';
                return 'data:' . $mime . ';base64,' . base64_encode(file_get_contents($path));
            }
        }
        return null;
    };

    $logoSrc = $embedImage('assets/logos/Saint-Luke.png');
@endphp
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="color-scheme" content="light">
    <title>{{ $title }}</title>
</head>
<body style="margin:0; padding:0; background-color:#f2f0ea; font-family:'Segoe UI', Helvetica, Arial, sans-serif; color:#14201b; -webkit-font-smoothing:antialiased;">

@if($preheader)
    <div style="display:none; max-height:0; overflow:hidden; opacity:0; color:transparent;">{{ $preheader }}</div>
@endif

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f2f0ea; padding:32px 12px;">
<tr>
<td align="center">

    <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px; width:100%; background:#ffffff; border-radius:20px; overflow:hidden; box-shadow:0 1px 3px rgba(30,42,36,0.06), 0 18px 40px -16px rgba(30,42,36,0.22);">

        <!-- HEADER -->
        <tr>
            <td style="background:#f59e0b; padding:34px 32px; text-align:center;">
                @if($logoSrc)
                    <img src="{{ $logoSrc }}" width="60" height="60" alt="Saint Luke" style="display:inline-block; border-radius:50%; background:#ffffff; padding:6px; margin-bottom:12px;">
                @endif
                <h1 style="margin:0; font-size:20px; font-weight:700; color:#ffffff; letter-spacing:0.2px;">Saint Luke E-Library</h1>
                <p style="margin:6px 0 0; font-size:12px; color:rgba(255,255,255,0.82); text-transform:uppercase; letter-spacing:2px;">Perpustakaan Santo Lukas</p>
            </td>
        </tr>

        <!-- BODY -->
        <tr>
            <td style="padding:36px 36px 28px;">
                {{ $slot }}
            </td>
        </tr>

        <!-- FOOTER -->
        <tr>
            <td style="background:#f2f0ea; padding:24px 32px; text-align:center; border-top:1px solid #e3e0d4;">
                <p style="margin:0 0 4px; font-size:13px; color:#6b6a60;">Terima kasih telah menjadi bagian dari Saint Luke E-Library.</p>
                <p style="margin:0; font-size:12px; color:#9a988b;">© {{ date('Y') }} Perpustakaan Santo Lukas. Seluruh hak cipta dilindungi.</p>
            </td>
        </tr>

    </table>

    <p style="max-width:600px; margin:18px auto 0; font-size:11px; line-height:1.6; color:#9a988b; text-align:center;">
        Email ini dikirim otomatis oleh sistem. Mohon tidak membalas email ini.
    </p>

</td>
</tr>
</table>

</body>
</html>
