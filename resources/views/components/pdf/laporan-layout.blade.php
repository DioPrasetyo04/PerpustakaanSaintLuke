@props(['title' => 'Laporan', 'report' => [], 'chartImage' => null, 'chartTitle' => null])
@php
    $logoPath = public_path('assets/logos/Saint-Luke.png');
    $logoExists = file_exists($logoPath);
    $headerTitle  = $report['state']['judul'] ?? $title;
    $headerNomor  = $report['state']['nomor'] ?? '-';
    $footerTitle  = strtoupper($title);
    $printedAt    = now('Asia/Jakarta')->translatedFormat('d M Y H:i');

    // Single-quote escape for safe injection into a PHP string literal.
    $phpEsc = fn($v) => str_replace(["\\", "'"], ["\\\\", "\\'"], (string) $v);
@endphp
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>{{ $headerTitle }}</title>
    <style>
        /* Reserve top band (header) + bottom band (footer) on every page.
           Header / footer / watermark are drawn per-page via $pdf->page_script(). */
        @page { margin: 175px 36px 95px 36px; }
        * { box-sizing: border-box; }
        body { font-family: DejaVu Sans, Arial, sans-serif; font-size: 11px; color: #111; margin: 0; }

        .subject { text-align: center; margin: 0 0 8px; font-weight: bold; font-size: 13px; text-transform: uppercase; text-decoration: underline; }
        .meta { width: 100%; margin-top: 4px; font-size: 11px; }
        .meta table { width: 100%; }
        .meta .left td { padding: 1px 0; }
        .meta .right { text-align: right; }
        .intro { text-align: justify; line-height: 1.55; margin: 12px 0 10px; }
        .period-box { border: 1px solid #d1d5db; background: #f9fafb; padding: 8px 12px; margin-bottom: 14px; font-size: 11px; }
        .period-box strong { display: inline-block; min-width: 140px; }
        .section-title { font-weight: bold; font-size: 12px; margin: 12px 0 6px; }
        .chart-wrap { text-align: center; margin: 4px 0 12px; border: 1px solid #e5e7eb; padding: 6px; background: #ffffff; }
        .chart-wrap img { max-width: 100%; height: auto; }

        table.data { width: 100%; border-collapse: collapse; font-size: 10px; }
        table.data th, table.data td { border: 1px solid #4b5563; padding: 4px 6px; vertical-align: middle; }
        table.data thead { display: table-header-group; }
        table.data tr { page-break-inside: avoid; }
        table.data thead th { background: #1f2937; color: #fff; text-align: center; text-transform: uppercase; font-size: 9.5px; }
        table.data tbody tr:nth-child(even) { background: #f3f4f6; }
        table.data td.no, table.data td.center { text-align: center; }
        table.data td.right { text-align: right; }
        .badge { display: inline-block; padding: 2px 8px; border-radius: 999px; background: #dbeafe; color: #1e3a8a; font-size: 9.5px; font-weight: bold; }
        .badge.green { background: #d1fae5; color: #065f46; }
        .badge.amber { background: #fef3c7; color: #92400e; }
        .badge.red { background: #fee2e2; color: #991b1b; }

        .summary { margin-top: 10px; font-size: 11px; text-align: justify; line-height: 1.55; }
        .signatures { width: 100%; margin-top: 40px; font-size: 11px; page-break-inside: avoid; }
        .signatures table { width: 100%; }
        .signatures td { width: 50%; vertical-align: top; padding: 0 10px; }
        .sig-block { text-align: center; }
        .sig-block .role { font-weight: bold; margin-bottom: 70px; }
        .sig-block .name { font-weight: bold; text-decoration: underline; }
    </style>
</head>
<body>

    <div class="subject">{{ $headerTitle }}</div>

    <div class="meta">
        <table>
            <tr>
                <td class="left" style="width:55%;">
                    <table>
                        <tr><td style="width:60px;">No</td><td>: {{ $headerNomor }}</td></tr>
                        <tr><td>Hal</td><td>: {{ $title }}</td></tr>
                        <tr><td>Lamp.</td><td>: 1 (Satu) Berkas</td></tr>
                    </table>
                </td>
                <td class="right" style="width:45%;">
                    {{ $report['state']['kota'] ?? 'Jakarta' }}, {{ now('Asia/Jakarta')->translatedFormat('d F Y') }}
                </td>
            </tr>
        </table>
    </div>

    <div class="intro">
        <p style="margin:8px 0;"><strong>Dengan Hormat,</strong></p>
        <p style="margin:0 0 8px;">Semoga Tuhan Yesus selalu memberkati dan menyertai Bapak/Ibu sekalian dalam menjalankan aktivitas sehari-hari.</p>
        <p style="margin:0;">
            Bersama dengan surat ini kami sampaikan {{ strtolower($title) }} Perpustakaan Saint Luke
            untuk periode <strong>{{ $report['periodLabel'] }}</strong> ({{ $report['periodRange'] }}).
            Berikut rincian data yang tercatat pada sistem.
        </p>
    </div>

    @isset($summary)
        {{ $summary }}
    @endisset

    @if ($chartImage)
        <div class="section-title">A. {{ $chartTitle ?? 'Grafik' }}</div>
        <div class="chart-wrap">
            <img src="{{ $chartImage }}" alt="Grafik">
        </div>
    @endif

    {{ $slot }}

    <div class="summary">
        Demikian {{ strtolower($title) }} ini kami sampaikan untuk dapat menjadi bahan evaluasi dan pengambilan
        keputusan. Atas perhatian dan kerjasamanya kami ucapkan terima kasih.
    </div>

    <div class="signatures">
        <table>
            <tr>
                <td>
                    <div class="sig-block">
                        <div class="role">{{ $report['state']['penandatangan_kiri'] ?? '-' }}</div>
                        <div class="name">{{ $report['state']['nama_kiri'] ?? '-' }}</div>
                    </div>
                </td>
                <td>
                    <div class="sig-block">
                        <div class="role">{{ $report['state']['penandatangan_kanan'] ?? '-' }}</div>
                        <div class="name">{{ $report['state']['nama_kanan'] ?? '-' }}</div>
                    </div>
                </td>
            </tr>
        </table>
    </div>

    {{-- ============================================================
         Header / Footer / Watermark drawn per-page.
         IMPORTANT: this script block MUST live at the END of <body>.
         DomPDF's page_script() iterates over pages that exist at the
         moment it is called; if placed before content, only page 1
         exists yet so subsequent pages get no header/footer.
       ============================================================ --}}
    <script type="text/php">
        if (isset($pdf)) {
            $logoPath  = '{!! $phpEsc($logoPath) !!}';
            $hasLogo   = {{ $logoExists ? 'true' : 'false' }};
            $ftTitle   = '{!! $phpEsc($footerTitle) !!}';
            $ftNomor   = '{!! $phpEsc($headerNomor) !!}';
            $ftPrinted = '{!! $phpEsc($printedAt) !!}';

            $pdf->page_script(function ($PAGE_NUM, $PAGE_COUNT, $canvas, $fontMetrics) use ($logoPath, $hasLogo, $ftTitle, $ftNomor, $ftPrinted) {
                $fontBold   = $fontMetrics->getFont('DejaVu Sans', 'bold');
                $fontReg    = $fontMetrics->getFont('DejaVu Sans', 'normal');
                $fontItalic = $fontMetrics->getFont('DejaVu Sans', 'italic');

                $pageW = $canvas->get_width();
                $pageH = $canvas->get_height();
                $marginX  = 36;
                $contentW = $pageW - ($marginX * 2);
                $black    = [0.07, 0.07, 0.07];
                $gray     = [0.22, 0.27, 0.34];

                /* ===== WATERMARK ===== */
                if ($hasLogo) {
                    $wmSize = 240;
                    $wmX = ($pageW - $wmSize) / 2;
                    $wmY = ($pageH - $wmSize) / 2 - 10;
                    $canvas->set_opacity(0.05, "Normal");
                    $canvas->image($logoPath, $wmX, $wmY, $wmSize, $wmSize);
                    $canvas->set_opacity(1.0, "Normal");
                }

                /* ===== HEADER ===== */
                $headerTop = 28;
                $logoSize  = 68;
                if ($hasLogo) {
                    $canvas->image($logoPath, $marginX, $headerTop + 4, $logoSize, $logoSize);
                }

                $titleX = $marginX + $logoSize + 18;
                $titleW = $contentW - $logoSize - 18;
                $cx     = $titleX + ($titleW / 2);

                $line1 = "PERPUSTAKAAN SAINT LUKE";
                $line2 = "YAYASAN SAINT LUKE LIBRARY";
                $line3 = "GEREJA ANGGOTA PGI KE - 86";
                $line4 = "Sekretariat : Jl. Gembira Terusan No. 24, Tlp/Fax : (021) 4350118, Tanjung Priok - Jakarta Utara";
                $line5 = "Terdaftar di : DEPAG No. 3 Ket. 373/1628/76 - DEPAG No. 14 Tahun 1995 - DEPAGRI NO. 50 Thn. 1987";

                $sz1 = 15; $sz2 = 12; $sz3 = 10; $sz4 = 8;

                $w1 = $fontMetrics->getTextWidth($line1, $fontBold, $sz1);
                $w2 = $fontMetrics->getTextWidth($line2, $fontBold, $sz2);
                $w3 = $fontMetrics->getTextWidth($line3, $fontBold, $sz3);
                $w4 = $fontMetrics->getTextWidth($line4, $fontReg,  $sz4);
                $w5 = $fontMetrics->getTextWidth($line5, $fontReg,  $sz4);

                $y = $headerTop + 6;
                $canvas->text($cx - $w1 / 2, $y, $line1, $fontBold, $sz1, $black); $y += $sz1 + 4;
                $canvas->text($cx - $w2 / 2, $y, $line2, $fontBold, $sz2, $black); $y += $sz2 + 3;
                $canvas->text($cx - $w3 / 2, $y, $line3, $fontBold, $sz3, $black); $y += $sz3 + 5;
                $canvas->text($cx - $w4 / 2, $y, $line4, $fontReg,  $sz4, $black); $y += $sz4 + 2;
                $canvas->text($cx - $w5 / 2, $y, $line5, $fontReg,  $sz4, $black);

                $hdrLineY = $headerTop + $logoSize + 12;
                $canvas->line($marginX, $hdrLineY,     $pageW - $marginX, $hdrLineY,     [0,0,0], 0.8);
                $canvas->line($marginX, $hdrLineY + 3, $pageW - $marginX, $hdrLineY + 3, [0,0,0], 0.8);

                /* ===== FOOTER ===== */
                $footerY = $pageH - 72;
                $canvas->line($marginX, $footerY, $pageW - $marginX, $footerY, [0.15,0.15,0.15], 1.2);

                $ftSz = 8.5;
                $canvas->text($marginX, $footerY + 6,  "Perpustakaan Saint Luke",                  $fontReg, $ftSz, $gray);
                $canvas->text($marginX, $footerY + 18, "Jl. Gembira Terusan No. 24, Jakarta Utara", $fontReg, $ftSz, $gray);

                $ftTitleW = $fontMetrics->getTextWidth($ftTitle, $fontBold, $ftSz);
                $canvas->text(($pageW - $ftTitleW) / 2, $footerY + 6, $ftTitle, $fontBold, $ftSz, [0.1,0.13,0.18]);

                $rightLine1 = "Dicetak: " . $ftPrinted;
                $rightLine2 = $ftNomor;
                $rW1 = $fontMetrics->getTextWidth($rightLine1, $fontItalic, $ftSz);
                $rW2 = $fontMetrics->getTextWidth($rightLine2, $fontItalic, $ftSz);
                $canvas->text($pageW - $marginX - $rW1, $footerY + 6,  $rightLine1, $fontItalic, $ftSz, $gray);
                $canvas->text($pageW - $marginX - $rW2, $footerY + 18, $rightLine2, $fontItalic, $ftSz, $gray);

                $pageText = "Halaman {$PAGE_NUM} dari {$PAGE_COUNT}";
                $ptW = $fontMetrics->getTextWidth($pageText, $fontBold, 8);
                $canvas->text(($pageW - $ptW) / 2, $footerY + 33, $pageText, $fontBold, 8, [0.15,0.15,0.15]);
            });
        }
    </script>
</body>
</html>
