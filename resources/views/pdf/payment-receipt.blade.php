<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="utf-8">
    <title>Payment Receipt {{ $orderId }}</title>
    <style>
        * { font-family: 'DejaVu Sans', sans-serif; }
        @page { margin: 0; }
        body { margin: 0; padding: 0; color: #1f2937; font-size: 12px; }

        .wrapper { padding: 36px 40px; }

        .header {
            background: #16a34a;
            color: #ffffff;
            padding: 28px 40px;
        }
        .header .brand { font-size: 12px; letter-spacing: 1px; text-transform: uppercase; opacity: .85; }
        .header .title { font-size: 24px; font-weight: bold; margin-top: 4px; }
        .header .subtitle { font-size: 12px; opacity: .9; margin-top: 2px; }

        .paid-badge {
            display: inline-block;
            background: #dcfce7;
            color: #15803d;
            font-weight: bold;
            font-size: 11px;
            padding: 4px 12px;
            border-radius: 999px;
        }

        .section-title {
            font-size: 13px;
            font-weight: bold;
            color: #16a34a;
            border-bottom: 2px solid #e5e7eb;
            padding-bottom: 6px;
            margin: 24px 0 14px;
        }

        table { width: 100%; border-collapse: collapse; }
        td { vertical-align: top; }

        .book-cover {
            width: 70px; height: 96px;
            object-fit: cover;
            border-radius: 6px;
            border: 1px solid #e5e7eb;
        }
        .book-title { font-size: 15px; font-weight: bold; }
        .book-cat {
            display: inline-block;
            border: 1px solid #d1d5db;
            border-radius: 6px;
            font-size: 10px;
            padding: 2px 8px;
            margin-top: 4px;
            color: #4b5563;
        }
        .muted { color: #6b7280; }

        .detail-row td { padding: 8px 0; border-bottom: 1px solid #f3f4f6; }
        .detail-label { color: #6b7280; }
        .detail-value { text-align: right; font-weight: 600; }

        .total-box {
            margin-top: 22px;
            background: #f0fdf4;
            border: 1px solid #bbf7d0;
            border-radius: 10px;
            padding: 18px 22px;
        }
        .total-label { font-size: 14px; font-weight: 600; }
        .total-value { font-size: 24px; font-weight: bold; color: #16a34a; text-align: right; }

        .footer {
            margin-top: 30px;
            text-align: center;
            font-size: 10px;
            color: #9ca3af;
            border-top: 1px solid #e5e7eb;
            padding-top: 14px;
        }
    </style>
</head>
<body>
    <div class="header">
        <table>
            <tr>
                @if (!empty($logo))
                    <td style="width: 56px; vertical-align: middle;">
                        <img src="{{ $logo }}" style="width: 44px; height: 44px;" alt="Logo">
                    </td>
                @endif
                <td style="vertical-align: middle;">
                    <div class="brand">Perpustakaan Santo Lukas</div>
                    <div class="title">Payment Receipt</div>
                    <div class="subtitle">Order ID: {{ $orderId ?: '-' }}</div>
                </td>
                <td style="text-align: right; vertical-align: middle;">
                    <span class="paid-badge">&#10003; {{ $status }}</span>
                </td>
            </tr>
        </table>
    </div>

    <div class="wrapper">
        <div class="section-title">Detail Buku</div>
        <table>
            <tr>
                <td style="width: 84px;">
                    @if ($coverPath)
                        <img class="book-cover" src="{{ $coverPath }}" alt="cover">
                    @endif
                </td>
                <td>
                    <div class="book-title">{{ $bookTitle ?? '-' }}</div>
                    @if ($category)
                        <span class="book-cat">{{ $category }}</span>
                    @endif
                    <div class="muted" style="margin-top: 6px;">Fine ID: {{ $fineId }}</div>
                </td>
            </tr>
        </table>

        <div class="section-title">Detail Transaksi</div>
        <table>
            <tr class="detail-row">
                <td class="detail-label">Nama</td>
                <td class="detail-value">{{ $userName ?? '-' }}</td>
            </tr>
            <tr class="detail-row">
                <td class="detail-label">Email</td>
                <td class="detail-value">{{ $userEmail ?? '-' }}</td>
            </tr>
            <tr class="detail-row">
                <td class="detail-label">Tanggal Transaksi</td>
                <td class="detail-value">{{ $transactionDate }}</td>
            </tr>
            <tr class="detail-row">
                <td class="detail-label">Metode Pembayaran</td>
                <td class="detail-value">{{ $paymentMethod }}</td>
            </tr>
            <tr class="detail-row">
                <td class="detail-label">Status</td>
                <td class="detail-value">{{ $status }}</td>
            </tr>
        </table>

        <div class="total-box">
            <table>
                <tr>
                    <td class="total-label">Total Dibayar</td>
                    <td class="total-value">Rp {{ number_format($amount, 0, ',', '.') }}</td>
                </tr>
            </table>
        </div>

        <div class="footer">
            Struk ini dibuat secara otomatis oleh sistem Perpustakaan Santo Lukas.<br>
            Dicetak pada {{ now()->translatedFormat('d F Y, H:i') }}.
        </div>
    </div>
</body>
</html>
