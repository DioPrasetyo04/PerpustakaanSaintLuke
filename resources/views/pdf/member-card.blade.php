{{--
    Kartu Anggota Perpustakaan Santo Lukas — versi cetak (dompdf, landscape 2 kolom).
    Tata letak <table> karena dompdf tidak mendukung flex/grid/box-shadow.
    KIRI = panel emerald (Nomor Anggota + Foto + Barcode/QR di chip putih);
    KANAN = panel putih (Header + data); tanda tangan dipaku ke sudut kanan-bawah
    via div pembungkus ber-position:relative (dompdf mendukung absolute thd div).
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
        .note { font-size: 10px; color: #64748b; text-align: center; margin-bottom: 12px; }

        /* Pembungkus kartu: tinggi tetap + acuan posisi untuk tanda tangan */
        .card-outer { position: relative; width: 100%; height: 320px;
                      border: 1px solid #d1fae5; border-radius: 12px; overflow: hidden; }

        .card { width: 100%; height: 320px; table-layout: fixed; border-collapse: collapse; }
        .left  { width: 43%; height: 320px; padding: 14px; vertical-align: top; word-wrap: break-word; overflow-wrap: break-word;
                 background-color: #047857; color: #ecfdf5; }
        .right { height: 320px; padding: 14px; vertical-align: top; word-wrap: break-word; overflow-wrap: break-word;
                 background-color: #ffffff; }

        .no-lbl { font-size: 7px; letter-spacing: 1.5px; text-transform: uppercase; color: #a7f3d0; font-weight: bold; }
        .no-val { font-size: 16px; font-weight: bold; color: #ffffff;
                  border-bottom: 2px dashed #6ee7b7; padding-bottom: 3px; }

        .photo { width: 82px; height: 104px; border: 3px solid #ffffff; object-fit: cover; object-position: top; }
        .photo-fallback { width: 82px; height: 104px; background-color: #b0822f; color: #fff; border: 3px solid #fff;
                          text-align: center; font-size: 28px; font-weight: bold; }

        /* Chip kode putih — barcode & QR sejajar */
        .codes { background-color: #ffffff; padding: 9px 10px; }
        .bc { width: 100%; height: 76px; }
        .bcnum { font-size: 8px; letter-spacing: 1px; color: #065f46; font-weight: bold; }
        .qr { width: 76px; height: 76px; }

        .h-t1 { font-size: 7px; letter-spacing: 1px; text-transform: uppercase; color: #b0822f; font-weight: bold; }
        .h-t2 { font-size: 11px; font-weight: bold; color: #065f46; width: 100%; }
        .h-t3 { font-size: 6.5px; color: #64748b; }
        .head-wrap { border-bottom: 2px solid #047857; padding-bottom: 6px; }

        .frow td { font-size: 9.5px; padding: 2.5px 0; vertical-align: top; }
        .frow .k { color: #64748b; width: 72px; }
        .frow .v { color: #0f172a; font-weight: bold; }

        /* Tanda tangan dipaku ke sudut kanan-bawah kartu */
        .sign { position: absolute; right: 18px; bottom: 16px; text-align: right; font-size: 9px; color: #475569; }
        .sign .name { font-weight: bold; color: #065f46; }
    </style>
</head>
<body>
    <div class="note">Kartu Anggota Perpustakaan — potong &amp; laminating sesuai kebutuhan.</div>

    <div class="card-outer">
        <table class="card" cellpadding="0" cellspacing="0">
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

                    {{-- Chip kode: barcode (kiri) & QR (kanan) sejajar, ukuran besar --}}
                    <table class="codes" cellpadding="0" cellspacing="0" width="100%">
                        <tr>
                            <td style="text-align:center; vertical-align:middle;">
                                <img src="{{ $barcode }}" class="bc" alt="Barcode" /><br />
                                <span class="bcnum">{{ $member_number }}</span>
                            </td>
                            <td style="text-align:right; vertical-align:middle; width:84px; padding-left:8px;">
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
                                <div class="h-t3">Jl. Pademangan II Gg. VII No. 54 &middot; Telp.6414260, 64714859, Jakarta Utara</div>
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
                </td>
            </tr>
        </table>

        {{-- Tanda tangan: sudut kanan-bawah, ada ruang ttd antara "Anggota," & nama --}}
        <div class="sign">
            <div>Jakarta, {{ $issuedDate->translatedFormat('d F Y') }}</div>
            <div>Anggota,</div>
            <div class="name" style="margin-top:44px;">( {{ $name }} )</div>
        </div>
    </div>
</body>
</html>
