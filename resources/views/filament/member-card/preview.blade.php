{{--
    Kartu Anggota Perpustakaan Santo Lukas — tampilan modal (HTML, landscape 2 kolom).
    Mengikuti desain kartu fisik: KIRI = Nomor Anggota + Foto + Barcode (di samping foto),
    KANAN = Header (logo + instansi) + data + tanda tangan.
    Variabel berasal dari App\Services\MemberCardService::payload().
--}}
@php($issuedDate = $issued_at ? \Illuminate\Support\Carbon::parse($issued_at) : now())

<style>
    .mc-wrap { display:flex; flex-direction:column; align-items:center; gap:1rem;
        font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif; }

    .mc-card {
        width:100%; max-width:40rem;
        background:#ffffff; color:#0f172a;
        border:1px solid #e2e8f0; border-left:6px solid #047857;
        border-radius:.9rem; overflow:hidden;
        box-shadow:0 20px 45px -18px rgba(0,0,0,.4);
    }

    .mc-grid { display:flex; gap:0; }
    .mc-col-left  { flex:0 0 42%; padding:1rem 1rem 1rem 1.1rem; border-right:1px dashed #cbd5e1;
        display:flex; flex-direction:column; }
    .mc-col-right { flex:1; padding:1rem 1.1rem; min-width:0; }

    /* Nomor anggota */
    .mc-no { margin-bottom:.85rem; }
    .mc-no .lbl { font-size:.6rem; letter-spacing:.12em; text-transform:uppercase; color:#047857; font-weight:800; }
    .mc-no .val {
        font-size:1.15rem; font-weight:800; color:#065f46; letter-spacing:.05em;
        border-bottom:2px dotted #94a3b8; padding-bottom:.15rem; word-break:break-all;
    }

    /* Foto di tengah; kode di bawah (barcode kiri-bawah, QR kanan-bawah) */
    .mc-photo-center { flex:1; display:flex; align-items:center; justify-content:center; margin:.5rem 0 .7rem; }
    .mc-photo {
        width: 80px; height: 100px; border: 2px solid #cbd5e1; object-fit: cover; object-position: top;
    }
    .mc-photo-fallback {
        width:92px; height:116px; border-radius:.45rem;
        display:flex; align-items:center; justify-content:center;
        background:linear-gradient(135deg,#10b981,#047857); color:#fff;
        font-size:2rem; font-weight:800; border:2px solid #cbd5e1;
    }
    .mc-codes-row { display:flex; justify-content:space-between; align-items:flex-end; gap:.5rem; }
    .mc-bc-wrap { display:flex; flex-direction:column; align-items:flex-start; min-width:0; }
    .mc-bc-wrap .bc { width:128px; max-width:100%; height:auto; }
    .mc-bc-wrap .bcnum { font-size:.62rem; letter-spacing:.16em; color:#334155; font-weight:700; margin-top:.15rem; }
    .mc-codes-row .qr { flex:0 0 auto; width:62px; height:62px; border:1px solid #e5e7eb; border-radius:.3rem; padding:2px; background:#fff; }

    /* Header instansi */
    .mc-head { display:flex; align-items:center; gap:.6rem; padding-bottom:.65rem; border-bottom:2px solid #047857; }
    .mc-logo { width:48px; height:48px; flex:0 0 48px; object-fit:contain; }
    .mc-head .t1 { font-size:.6rem; letter-spacing:.1em; text-transform:uppercase; color:#475569; font-weight:700; }
    .mc-head .t2 { font-size:.8rem; font-weight:800; color:#065f46; line-height:1.2; white-space:nowrap; }
    .mc-head .t3 { font-size:.56rem; color:#64748b; margin-top:1px; white-space:nowrap; }
    .mc-head > div { min-width:0; }

    /* Field */
    .mc-fields { margin-top:.7rem; display:flex; flex-direction:column; gap:.32rem; }
    .mc-row { display:flex; font-size:.78rem; }
    .mc-row .k { flex:0 0 84px; color:#475569; font-weight:600; }
    .mc-row .s { flex:0 0 8px; color:#475569; }
    .mc-row .v { flex:1; color:#0f172a; font-weight:600; word-break:break-word; }

    /* Tanda tangan */
    .mc-sign { margin-top:.9rem; text-align:right; font-size:.74rem; color:#334155; }
    .mc-sign .city { }
    .mc-sign .role { margin-top:.1rem; }
    .mc-sign .name { margin-top:.9rem; font-weight:700; color:#0f172a; }

    .mc-download {
        display:inline-flex; align-items:center; gap:.45rem;
        padding:.6rem 1.2rem; border-radius:.7rem;
        background:#059669; color:#fff; font-weight:700; font-size:.85rem;
        text-decoration:none; box-shadow:0 6px 16px -6px rgba(5,150,105,.6);
        transition:background-color .15s;
    }
    .mc-download:hover { background:#047857; }
    .mc-download svg { width:1.05rem; height:1.05rem; }

    .dark .mc-card { background:#0b1220; color:#e2e8f0; border-color:rgba(255,255,255,.08); }
    .dark .mc-row .v, .dark .mc-sign .name { color:#e2e8f0; }
    .dark .mc-col-left { border-right-color:rgba(255,255,255,.12); }
</style>

<div class="mc-wrap">
    <div class="mc-card">
        <div class="mc-grid">
            {{-- KIRI: Nomor Anggota + Foto + Barcode --}}
            <div class="mc-col-left">
                <div class="mc-no">
                    <div class="lbl">Nomor Anggota</div>
                    <div class="val">{{ $member_number }}</div>
                </div>

                {{-- Foto/avatar di tengah --}}
                <div class="mc-photo-center">
                    @if($avatar)
                        <img src="{{ $avatar }}" class="mc-photo" alt="Foto" />
                    @else
                        <div class="mc-photo-fallback">{{ $initials }}</div>
                    @endif
                </div>

                {{-- Barcode kiri-bawah, QR kanan-bawah --}}
                <div class="mc-codes-row">
                    <div class="mc-bc-wrap">
                        <img src="{{ $barcode }}" class="bc" alt="Barcode" />
                        <div class="bcnum">{{ $member_number }}</div>
                    </div>
                    <img src="{{ $qr }}" class="qr" alt="QR" />
                </div>
            </div>

            {{-- KANAN: Header + Data + Tanda tangan --}}
            <div class="mc-col-right">
                <div class="mc-head">
                    @if($logo)
                        <img src="{{ $logo }}" class="mc-logo" alt="Logo" />
                    @endif
                    <div>
                        <div class="t1">Perpustakaan</div>
                        <div class="t2">Yayasan Pendidikan Umum St. Lukas</div>
                        <div class="t3">Jl. Pademangan II Gg. VII No. 54 &#9742; Telp.6414260, 64714859, Jakarta Utara</div>
                    </div>
                </div>

                <div class="mc-fields">
                    <div class="mc-row"><span class="k">Nama</span><span class="s">:</span><span class="v">{{ $name }}</span></div>
                    <div class="mc-row"><span class="k">Kelas</span><span class="s">:</span><span class="v">{{ $kelas }}</span></div>
                    <div class="mc-row"><span class="k">Alamat</span><span class="s">:</span><span class="v">{{ $address }}</span></div>
                    <div class="mc-row"><span class="k">Telp. Rumah</span><span class="s">:</span><span class="v">-</span></div>
                    <div class="mc-row"><span class="k">Telp. Hp.</span><span class="s">:</span><span class="v">{{ $phone }}</span></div>
                </div>

                <div class="mc-sign">
                    <div class="city">Jakarta, {{ $issuedDate->translatedFormat('d F Y') }}</div>
                    <div class="role">Anggota,</div>
                    <div class="name">( {{ $name }} )</div>
                </div>
            </div>
        </div>
    </div>

    @if(!empty($downloadUrl))
        <a href="{{ $downloadUrl }}" target="_blank" rel="noopener" class="mc-download">
            <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16" />
            </svg>
            Download Kartu (PDF)
        </a>
    @endif
</div>
