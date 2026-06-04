<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Reminder Pengembalian Buku</title>
</head>

@php
    // Helper inline image sebagai base64 data URI agar tidak terkena
    // mixed-content blocking (HTTP image di HTTPS Mailtrap UI) & bekerja di semua email client.
    // $relative: path relatif. Untuk file di Storage::disk('public') → 'books/cover/xxx.jpg'.
    //            Untuk file public/ → 'assets/logos/Saint-Luke.png'.
    $embedImage = function (?string $relative): ?string {
        if (! $relative) {
            return null;
        }
        $candidates = [
            storage_path('app/public/' . ltrim($relative, '/')),
            public_path(ltrim($relative, '/')),
        ];
        foreach ($candidates as $path) {
            if (is_file($path)) {
                $mime = function_exists('mime_content_type') ? (mime_content_type($path) ?: 'image/jpeg') : 'image/jpeg';
                return 'data:' . $mime . ';base64,' . base64_encode(file_get_contents($path));
            }
        }
        return null;
    };

    $logoSrc = $embedImage('assets/logos/Saint-Luke.png');
@endphp
<body style="margin:0; padding:20px; background-color:#f4f6f9; font-family: Arial, sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0">
<tr>
<td align="center">

<!-- MAIN CARD -->
<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.1);">

    <!-- HEADER -->
    <tr>
        <td style="background: linear-gradient(135deg,#1e3a8a,#3b82f6); padding:20px; text-align:center; color:white;">

            <table align="center" cellpadding="0" cellspacing="0">
                <tr>
                    <td align="center">
                        @if($logoSrc)
                            <img src="{{ $logoSrc }}" width="50" style="display:block; margin-bottom:10px;">
                        @endif
                    </td>
                </tr>
                <tr>
                    <td align="center">
                        <h2 style="margin:0;">{{ $variant['header'] ?? 'E-Library SMA Santo Lukas 1 Jakarta' }}</h2>
                        <p style="margin:5px 0 0; font-size:13px;">Smart Digital Library System</p>
                    </td>
                </tr>
            </table>

        </td>
    </tr>

    <!-- BODY -->
    <tr>
        <td style="padding:30px;">

            <h3 style="margin-top:0;">{{ $variant['greeting'] ?? 'Halo' }} {{ $user->name }} 👋</h3>

            <p>
                Ini adalah pengingat bahwa buku yang kamu pinjam harus segera dikembalikan.
            </p>

            @php
                $statusColor = match($status) {
                    '3 Hari Lagi' => '#22c55e',
                    '1 Hari Lagi' => '#f59e0b',
                    'Hari Ini' => '#ef4444',
                    default => '#64748b'
                };
                $coverUrl = $embedImage($loan->book->cover);
                $publisher = $loan->book->publisher;
                $publisherLogoUrl = $embedImage($publisher?->logo);
            @endphp

            <!-- BOOK CARD -->
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9; border-radius:10px; margin:20px 0;">
                <tr>

                    <!-- COVER -->
                    <td width="120" style="padding:15px; vertical-align:top;">
                        @if($coverUrl)
                            <img src="{{ $coverUrl }}" width="100" style="border-radius:8px; display:block;">
                        @endif
                    </td>

                    <!-- INFO -->
                    <td style="padding:15px; vertical-align:top;">

                        <p style="margin:0 0 8px;"><strong>📖 Title: {{ $loan->book->title }}</strong></p>

                        <table cellpadding="0" cellspacing="0" style="font-size:13px; color:#334155;">
                            <tr><td style="padding:2px 8px 2px 0; color:#64748b;">📚 ISBN</td><td style="padding:2px 0;">{{ $loan->book->isbn ?? '-' }}</td></tr>
                            <tr><td style="padding:2px 8px 2px 0; color:#64748b;">🗂️ Classification</td><td style="padding:2px 0;">{{ $loan->book->classification_number ?? '-' }}</td></tr>
                            <tr><td style="padding:2px 8px 2px 0; color:#64748b;">📅 Year</td><td style="padding:2px 0;">{{ $loan->book->publication_year ?? '-' }}</td></tr>
                            <tr><td style="padding:2px 8px 2px 0; color:#64748b;">📄 Pages</td><td style="padding:2px 0;">{{ $loan->book->number_of_pages ?? '-' }}</td></tr>
                            <tr><td style="padding:2px 8px 2px 0; color:#64748b;">📍 Location</td><td style="padding:2px 0;">{{ $loan->book->location_book ?? '-' }}</td></tr>
                            <tr><td style="padding:6px 8px 2px 0; color:#64748b;">📅 Due Date</td><td style="padding:6px 0 2px;">{{ \Carbon\Carbon::parse($loan->due_date)->format('d M Y') }}</td></tr>
                        </table>

                        <!-- STATUS BADGE -->
                        <span style="
                            background: {{ $statusColor }};
                            color: white;
                            padding: 6px 10px;
                            border-radius: 6px;
                            font-size: 12px;
                            display: inline-block;
                            margin-top: 10px;
                        ">
                            ⏰ Time: {{ strtoupper($status) }}
                        </span>

                    </td>
                </tr>
            </table>

            <!-- PUBLISHER CARD -->
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#fff7ed; border-radius:10px; margin:0 0 20px;">
                <tr>
                    <td width="80" style="padding:15px; vertical-align:middle;">
                        @if($publisherLogoUrl)
                            <img src="{{ $publisherLogoUrl }}" width="60" style="border-radius:8px; display:block; background:#fff;">
                        @endif
                    </td>
                    <td style="padding:15px; vertical-align:middle;">
                        <p style="margin:0 0 4px; font-size:12px; color:#9a3412; text-transform:uppercase; letter-spacing:0.5px;">🏢 Publisher</p>
                        <p style="margin:0; font-weight:600; color:#7c2d12;">{{ $publisher?->name ?? '-' }}</p>
                    </td>
                </tr>
            </table>

            <!-- AUTHORS CARD -->
            @if($loan->book->authors && $loan->book->authors->count() > 0)
                <table width="100%" cellpadding="0" cellspacing="0" style="background:#ecfdf5; border-radius:10px; margin:0 0 20px;">
                    <tr>
                        <td style="padding:15px 15px 5px;">
                            <p style="margin:0; font-size:12px; color:#065f46; text-transform:uppercase; letter-spacing:0.5px;">✍️ Authors</p>
                        </td>
                    </tr>
                    @foreach($loan->book->authors as $author)
                        @php
                            $authorAvatarUrl = $embedImage($author->avatar);
                        @endphp
                        <tr>
                            <td style="padding:6px 15px 6px;">
                                <table cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td width="50" style="vertical-align:middle;">
                                            @if($authorAvatarUrl)
                                                <img src="{{ $authorAvatarUrl }}" width="40" height="40" style="border-radius:9999px; display:block; object-fit:cover;">
                                            @else
                                                <div style="width:40px;height:40px;border-radius:9999px;background:#a7f3d0;color:#065f46;font-weight:700;text-align:center;line-height:40px;">{{ strtoupper(mb_substr($author->name, 0, 1)) }}</div>
                                            @endif
                                        </td>
                                        <td style="padding-left:10px; vertical-align:middle; color:#065f46; font-weight:500;">{{ $author->name }}</td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    @endforeach
                </table>
            @endif

            <!-- WARNING -->
            <p style="color:#ef4444; font-weight:500;">
                {{ $variant['warning'] ?? '⚠️ Segera kembalikan buku untuk menghindari denda keterlambatan.' }}
            </p>

            <!-- BUTTON -->
            <div style="text-align:center; margin-top:25px;">
                <a href="{{ config('app.url') . "/assets/book/{$loan->book->slug}"}}"
                   style="background:#2563eb; color:white; padding:12px 25px; text-decoration:none; border-radius:8px; font-weight:500;">
                    Lihat Detail
                </a>
            </div>

        </td>
    </tr>

    <!-- FOOTER -->
    <tr>
        <td style="background:#1e3a8a; color:white; text-align:center; padding:20px;">
            <p style="margin:0;">Terima kasih telah menggunakan E-Library</p>
            <p style="margin:5px 0;">E-Library System</p>
            <p style="font-size:12px; opacity:0.8;">
                © {{ date('Y') }} E-Library. All rights reserved.
            </p>
        </td>
    </tr>

</table>

</td>
</tr>
</table>

</body>
</html>
