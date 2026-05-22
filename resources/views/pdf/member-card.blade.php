{{--
    Kartu Anggota Perpustakaan Santo Lukas — versi cetak (dompdf, landscape 2 kolom).
    Tata letak <table> karena dompdf tidak mendukung flex/grid.
    KIRI = Nomor Anggota + Foto + Barcode (di samping foto); KANAN = Header + data + tanda tangan.
--}}
@php($issuedDate = $issued_at ? \Illuminate\Support\Carbon::parse($issued_at) : now())
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="utf-8" />
    <style>
        @page { margin: 1.4cm; }
        * { font-family: "DejaVu Sans", sans-serif; }
        body { color: #0f172a; }
        .note { font-size: 10px; color: #64748b; text-align: center; margin-bottom: 10px; }

        .card { width: 35cm; border: 1px solid #e2e8f0; border-left: 5px solid #047857; }
        .left  { width: 42%; padding: 12px; border-right: 1px dashed #cbd5e1; vertical-align: top; }
        .right { padding: 12px; vertical-align: top; }

        .no-lbl { font-size: 7px; letter-spacing: 1px; text-transform: uppercase; color: #047857; font-weight: bold; }
        .no-val { font-size: 15px; font-weight: bold; color: #065f46; border-bottom: 2px dotted #94a3b8; padding-bottom: 2px; }

        .photo { width: 80px; height: 100px; border: 2px solid #cbd5e1; object-fit: cover; object-position: top; }
        .photo-fallback { width: 80px; height: 100px; background: #047857; color: #fff;
                          text-align: center; font-size: 28px; font-weight: bold; }
        .bc { width: 135px; }
        .bcnum { font-size: 7px; letter-spacing: 2px; color: #334155; font-weight: bold; }
        .qr { width: 52px; height: 52px; border: 1px solid #e5e7eb; }

        .h-t1 { font-size: 7px; letter-spacing: 1px; text-transform: uppercase; color: #475569; font-weight: bold; }
        .h-t2 { font-size: 11px; font-weight: bold; color: #065f46; width: 100%; }
        .h-t3 { font-size: 6.5px; color: #64748b; }
        .head-wrap { border-bottom: 2px solid #047857; padding-bottom: 6px; }

        .frow td { font-size: 9.5px; padding: 2px 0; vertical-align: top; }
        .frow .k { color: #475569; width: 70px; }
        .frow .v { color: #0f172a; font-weight: bold; }

        .sign { text-align: right; font-size: 9px; color: #334155; margin-top: 14px; }
        .sign .name { font-weight: bold; color: #0f172a; }
    </style>
</head>
<body>
    <div class="note">Kartu Anggota Perpustakaan — potong & laminating sesuai kebutuhan.</div>

    <table align="center" class="card" cellpadding="0" cellspacing="0">
        <tr>
            {{-- KIRI --}}
            <td class="left">
                <div class="no-lbl">Nomor Anggota</div>
                <div class="no-val">{{ $member_number }}</div>

                {{-- Foto/avatar di tengah --}}
                <div style="text-align:center; margin:16px 0;">
                    @if($avatar)
                        <img src="{{ $avatar }}" class="photo" alt="Foto" />
                    @else
                        <table cellpadding="0" cellspacing="0" align="center"><tr>
                            <td class="photo-fallback" style="vertical-align:middle;">{{ $initials }}</td>
                        </tr></table>
                    @endif
                </div>

                {{-- Barcode kiri-bawah, QR kanan-bawah --}}
                <table cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                        <td style="text-align:left; vertical-align:bottom;">
                            <img src="{{ $barcode }}" class="bc" alt="Barcode" /><br />
                            <span class="bcnum">{{ $member_number }}</span>
                        </td>
                        <td style="text-align:right; vertical-align:bottom;">
                            <img src="{{ $qr }}" class="qr" alt="QR" />
                        </td>
                    </tr>
                </table>
            </td>

            {{-- KANAN --}}
            <td class="right">
                <table cellpadding="0" cellspacing="0" class="head-wrap" width="100%">
                    <tr>
                        @if($logo)
                            <td style="width:50px; vertical-align:middle;">
                                <img src="{{ $logo }}" style="width:44px; height:44px;" alt="Logo" />
                            </td>
                        @endif
                        <td style="vertical-align:middle; padding-left:8px;">
                            <div class="h-t1">Perpustakaan</div>
                            <div class="h-t2">Yayasan Pendidikan Umum St. Lukas</div>
                            <div class="h-t3">Jl. Pademangan II Gg. VII No. 1 &middot; Telp. 6471 4859, Jakarta Utara</div>
                        </td>
                    </tr>
                </table>

                <table cellpadding="0" cellspacing="0" width="100%" style="margin-top:8px;">
                    <tr class="frow"><td class="k">Nama</td><td>:</td><td class="v">{{ $name }}</td></tr>
                    <tr class="frow"><td class="k">Kelas</td><td>:</td><td class="v">{{ $kelas }}</td></tr>
                    <tr class="frow"><td class="k">Alamat</td><td>:</td><td class="v">{{ $address }}</td></tr>
                    <tr class="frow"><td class="k">Telp. Rumah</td><td>:</td><td class="v">-</td></tr>
                    <tr class="frow"><td class="k">Telp. Hp.</td><td>:</td><td class="v">{{ $phone }}</td></tr>
                </table>

                <div class="sign">
                    <div>Jakarta, {{ $issuedDate->translatedFormat('d F Y') }}</div>
                    <div>Anggota,</div>
                    <div class="name" style="margin-top:12px;">( {{ $name }} )</div>
                </div>
            </td>
        </tr>
    </table>
</body>
</html>
