{{--
    Kartu Anggota Perpustakaan Santo Lukas — tampilan modal (HTML, landscape 2 kolom).
    Desain modern 2-tone: KIRI = panel emerald (Nomor Anggota + Foto + Barcode/QR di chip putih),
    KANAN = panel putih (Header instansi + data + tanda tangan). Efek 3D + glossy sheen.
    Variabel berasal dari App\Services\MemberCardService::payload().
--}}
@php($issuedDate = $issued_at ? \Illuminate\Support\Carbon::parse($issued_at) : now())

<style>
    .mc-wrap { display:flex; flex-direction:column; align-items:center; gap:1.25rem;
        font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
        perspective: 1600px; }

    .mc-card {
        position:relative; width:100%; max-width:42rem;
        background:#ffffff; color:#0f172a;
        border-radius:1.25rem; overflow:hidden;
        transform: rotateX(2.2deg);
        box-shadow:
            0 1px 0 rgba(255,255,255,.6) inset,
            0 18px 30px -12px rgba(4,120,87,.35),
            0 40px 70px -28px rgba(15,23,42,.55);
        transition: transform .35s ease, box-shadow .35s ease;
    }
    .mc-card:hover { transform: rotateX(0) translateY(-3px);
        box-shadow:
            0 1px 0 rgba(255,255,255,.6) inset,
            0 26px 44px -14px rgba(4,120,87,.4),
            0 56px 90px -32px rgba(15,23,42,.6);
    }
    /* glossy sheen overlay */
    .mc-card::after {
        content:""; position:absolute; inset:0; pointer-events:none; z-index:3;
        background:linear-gradient(125deg, rgba(255,255,255,.35) 0%, rgba(255,255,255,0) 32%, rgba(255,255,255,0) 70%, rgba(255,255,255,.12) 100%);
    }

    .mc-grid { display:flex; gap:0; position:relative; z-index:1; }

    /* ── Panel KIRI (emerald) ── */
    .mc-col-left  {
        flex:0 0 43%; padding:1.15rem 1.1rem 1.15rem 1.25rem;
        display:flex; flex-direction:column;
        color:#ecfdf5;
        background:
            radial-gradient(120% 120% at 0% 0%, rgba(255,255,255,.16) 0%, rgba(255,255,255,0) 45%),
            linear-gradient(155deg, #065f46 0%, #047857 48%, #0f766e 100%);
        position:relative;
    }
    /* subtle dot/grid texture */
    .mc-col-left::before {
        content:""; position:absolute; inset:0; opacity:.5;
        background-image: radial-gradient(rgba(255,255,255,.12) 1px, transparent 1px);
        background-size: 14px 14px;
    }
    .mc-col-left > * { position:relative; z-index:1; }

    .mc-col-right { flex:1; padding:1.15rem 1.25rem; min-width:0; background:#ffffff;
        display:flex; flex-direction:column; }

    /* Nomor anggota */
    .mc-no { margin-bottom:.7rem; }
    .mc-no .lbl { font-size:.6rem; letter-spacing:.16em; text-transform:uppercase; color:#a7f3d0; font-weight:800; }
    .mc-no .val {
        font-size:1.2rem; font-weight:800; color:#fff; letter-spacing:.04em;
        padding-bottom:.3rem; word-break:break-all;
        border-bottom:2px dashed rgba(255,255,255,.4);
        text-shadow:0 1px 2px rgba(0,0,0,.18);
    }

    /* Foto di tengah dengan bingkai putih */
    .mc-photo-center { flex:1; display:flex; align-items:center; justify-content:center; margin:.55rem 0 .8rem; }
    .mc-photo {
        width: 92px; height: 116px; object-fit: cover; object-position: top;
        border:3px solid #fff; border-radius:.55rem;
        box-shadow:0 8px 18px -8px rgba(0,0,0,.5);
    }
    .mc-photo-fallback {
        width:92px; height:116px; border-radius:.55rem;
        display:flex; align-items:center; justify-content:center;
        background:linear-gradient(135deg,#fbbf24,#b0822f); color:#fff;
        font-size:2.1rem; font-weight:800; border:3px solid #fff;
        box-shadow:0 8px 18px -8px rgba(0,0,0,.5);
    }

    /* Chip kode (putih, agar barcode/QR tetap mudah dipindai) — barcode & QR sejajar */
    .mc-codes {
        background:#fff; border-radius:.7rem; padding:.7rem .8rem;
        box-shadow:0 10px 22px -12px rgba(0,0,0,.45);
        display:flex; align-items:center; gap:.8rem;
    }
    .mc-codes .bc-col { flex:1; min-width:0; display:flex; flex-direction:column; align-items:stretch; }
    .mc-codes .bc { display:block; width:100%; height:82px; object-fit:fill; }
    .mc-codes .bcnum { font-size:.66rem; letter-spacing:.06em; color:#065f46; font-weight:800; margin-top:.3rem; text-align:center; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
    .mc-codes .qr { flex:0 0 auto; width:82px; height:82px; }

    /* Header instansi */
    .mc-head { display:flex; align-items:center; gap:.6rem; padding-bottom:.65rem; border-bottom:2px solid #047857; }
    .mc-logo { width:48px; height:48px; flex:0 0 48px; object-fit:contain; }
    .mc-head .t1 { font-size:.6rem; letter-spacing:.12em; text-transform:uppercase; color:#b0822f; font-weight:800; }
    .mc-head .t2 { font-size:.84rem; font-weight:800; color:#065f46; line-height:1.2; white-space:nowrap; }
    .mc-head .t3 { font-size:.56rem; color:#64748b; margin-top:2px; white-space:nowrap; }
    .mc-head > div { min-width:0; }

    /* Field */
    .mc-fields { margin-top:.8rem; display:flex; flex-direction:column; gap:.36rem; }
    .mc-row { display:flex; font-size:.8rem; align-items:baseline; }
    .mc-row .k { flex:0 0 86px; color:#64748b; font-weight:600; }
    .mc-row .s { flex:0 0 8px; color:#94a3b8; }
    .mc-row .v { flex:1; color:#0f172a; font-weight:700; word-break:break-word; }

    /* Tanda tangan — menempel di sudut kanan-bawah, beri ruang ttd */
    .mc-sign { margin-top:auto; text-align:right; font-size:.76rem; color:#475569; }
    .mc-sign .name { margin-top:3.25rem; font-weight:800; color:#065f46; }

    .mc-download {
        display:inline-flex; align-items:center; gap:.5rem;
        padding:.7rem 1.4rem; border-radius:.8rem;
        background:linear-gradient(135deg,#059669,#047857); color:#fff; font-weight:700; font-size:.88rem;
        text-decoration:none; box-shadow:0 10px 22px -8px rgba(5,150,105,.65);
        transition:transform .15s, box-shadow .15s;
    }
    .mc-download:hover { transform:translateY(-2px); box-shadow:0 16px 28px -10px rgba(5,150,105,.7); }
    .mc-download svg { width:1.05rem; height:1.05rem; }

    /* Dark mode */
    .dark .mc-card { background:#0b1220; color:#e2e8f0;
        box-shadow:0 18px 30px -12px rgba(0,0,0,.6), 0 40px 70px -28px rgba(0,0,0,.7); }
    .dark .mc-col-right { background:#0b1220; }
    .dark .mc-head .t2, .dark .mc-sign .name { color:#34d399; }
    .dark .mc-row .v { color:#e2e8f0; }
    .dark .mc-row .k { color:#94a3b8; }
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

                {{-- Chip kode: barcode (kiri) & QR (kanan) sejajar, ukuran besar --}}
                <div class="mc-codes">
                    <div class="bc-col">
                        <img src="{{ $barcode }}" class="bc" alt="Barcode" />
                        <span class="bcnum">{{ $member_number }}</span>
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
