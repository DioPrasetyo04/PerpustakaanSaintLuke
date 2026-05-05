<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Reminder Pengembalian Buku</title>
</head>

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
                        <img src="{{ asset('assets/logos/Saint-Luke.jpg') }}" width="50" style="display:block; margin-bottom:10px;">
                    </td>
                </tr>
                <tr>
                    <td align="center">
                        <h2 style="margin:0;">E-Library SMA Santo Lukas 1 Jakarta</h2>
                        <p style="margin:5px 0 0; font-size:13px;">Smart Digital Library System</p>
                    </td>
                </tr>
            </table>

        </td>
    </tr>

    <!-- BODY -->
    <tr>
        <td style="padding:30px;">

            <h3 style="margin-top:0;">Halo {{ $user->name }} 👋</h3>

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
            @endphp

            <!-- BOOK CARD -->
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9; border-radius:10px; margin:20px 0;">
                <tr>

                    <!-- COVER -->
                    <td width="120" style="padding:15px;">
                        <img src="{{ $loan->book->cover ?? null }}"
                             width="100"
                             style="border-radius:8px; display:block;">
                    </td>

                    <!-- INFO -->
                    <td style="padding:15px; vertical-align:top;">

                        <p style="margin:0 0 8px;"><strong>📖 Book Title: {{ $loan->book->title }}</strong></p>

                        <p style="margin:0 0 6px; font-size:13px;">
                            📅 Due Date: {{ \Carbon\Carbon::parse($loan->due_date)->format('d M Y') }}
                        </p>

                        <!-- STATUS BADGE -->
                        <span style="
                            background: {{ $statusColor }};
                            color: white;
                            padding: 6px 10px;
                            border-radius: 6px;
                            font-size: 12px;
                            display: inline-block;
                        ">
                            ⏰ Time: {{ strtoupper($status) }}
                        </span>

                    </td>
                </tr>
            </table>

            <!-- WARNING -->
            <p style="color:#ef4444; font-weight:500;">
                ⚠️ Segera kembalikan buku untuk menghindari denda keterlambatan.
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
