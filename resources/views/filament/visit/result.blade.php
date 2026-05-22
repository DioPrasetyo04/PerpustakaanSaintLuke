{{--
    Popup hasil scan kunjungan (ditampilkan di dalam modal Filament).
    Judul + ikon (check / silang) berasal dari header modal; konten ini menampilkan
    foto, nama, email user, dan deskripsi.

    $variant: 'success' (sambutan kunjungan), 'danger' (penolakan akses),
              atau 'warning' (sudah tercatat hari ini).
--}}
@php
    $variant = $variant ?? 'success';
@endphp
<style>
    .vr-wrap {
        display:flex; flex-direction:column; align-items:center; text-align:center; gap:.55rem;
        padding:.25rem 0 .35rem;
        font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
    }
    .vr-photo {
        width:92px; height:92px; border-radius:9999px; object-fit:cover; object-position:top;
        border:2px solid #ffffff;
    }
    .vr-name { font-size:1.15rem; font-weight:800; color:#0f172a; }
    .vr-email { font-size:.85rem; color:#64748b; word-break:break-all; }
    .vr-desc {
        margin-top:.25rem; font-size:.92rem; font-weight:600;
        border-radius:.75rem; padding:.65rem 1.1rem;
    }
    .vr-time { font-size:.72rem; color:#94a3b8; margin-top:.1rem; }

    /* Varian sukses (hijau) */
    .vr-success .vr-photo { box-shadow:0 0 0 4px #dcfce7; }
    .vr-success .vr-desc  { background:#ecfdf5; border:1px solid #a7f3d0; color:#047857; }

    /* Varian penolakan (merah) */
    .vr-danger .vr-photo { box-shadow:0 0 0 4px #fee2e2; }
    .vr-danger .vr-desc  { background:#fef2f2; border:1px solid #fecaca; color:#b91c1c; }

    /* Varian sudah tercatat (kuning) */
    .vr-warning .vr-photo { box-shadow:0 0 0 4px #fef3c7; }
    .vr-warning .vr-desc  { background:#fffbeb; border:1px solid #fde68a; color:#b45309; }

    .dark .vr-name { color:#ffffff; }
    .dark .vr-success .vr-photo { box-shadow:0 0 0 4px rgba(16,185,129,.25); }
    .dark .vr-success .vr-desc  { background:rgba(16,185,129,.1); border-color:rgba(16,185,129,.3); color:#6ee7b7; }
    .dark .vr-danger .vr-photo  { box-shadow:0 0 0 4px rgba(239,68,68,.25); }
    .dark .vr-danger .vr-desc   { background:rgba(239,68,68,.1); border-color:rgba(239,68,68,.3); color:#fca5a5; }
    .dark .vr-warning .vr-photo { box-shadow:0 0 0 4px rgba(245,158,11,.25); }
    .dark .vr-warning .vr-desc  { background:rgba(245,158,11,.1); border-color:rgba(245,158,11,.3); color:#fcd34d; }
</style>

<div class="vr-wrap vr-{{ $variant }}">
    <img src="{{ $photo }}" class="vr-photo" alt="Foto" />
    <div class="vr-name">{{ $name }}</div>
    <div class="vr-email">{{ $email }}</div>
    <div class="vr-desc">{{ $description }}</div>
    <div class="vr-time">{{ \Illuminate\Support\Carbon::now('Asia/Jakarta')->translatedFormat('l, d F Y') }} &bull; {{ \Illuminate\Support\Carbon::now('Asia/Jakarta')->format('H:i') }} WIB</div>
</div>
