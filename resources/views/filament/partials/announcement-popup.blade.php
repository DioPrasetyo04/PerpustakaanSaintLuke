<style>
    #ann-popup-overlay {
        display: none;
        position: fixed;
        inset: 0;
        z-index: 99999;
        align-items: center;
        justify-content: center;
        background: rgba(0, 0, 0, 0.6);
        backdrop-filter: blur(4px);
        padding: 1rem;
    }

    #ann-popup-modal {
        position: relative;
        width: 100%;
        max-width: 28rem;
        border-radius: 1rem;
        overflow: hidden;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        background: #ffffff;
    }
    .dark #ann-popup-modal { background: #111827; }

    #ann-close-btn {
        position: absolute;
        top: 0.75rem;
        right: 0.75rem;
        z-index: 10;
        border-radius: 9999px;
        padding: 0.375rem;
        cursor: pointer;
        border: none;
        line-height: 0;
        background: rgba(243, 244, 246, 0.8);
        color: #4b5563;
        transition: background-color 0.2s;
    }
    #ann-close-btn:hover { background: #e5e7eb; }
    .dark #ann-close-btn { background: rgba(55, 65, 81, 0.8); color: #e5e7eb; }
    .dark #ann-close-btn:hover { background: #4b5563; }

    #ann-popup-photo {
        width: 100%;
        height: 13rem;
        overflow: hidden;
    }
    #ann-popup-photo img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    #ann-popup-content {
        padding: 1.25rem 1.5rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    #ann-popup-title {
        font-size: 1.25rem;
        font-weight: 700;
        text-align: center;
        margin: 0;
        color: #111827;
    }
    .dark #ann-popup-title { color: #ffffff; }

    #ann-countdown {
        display: inline-block;
        font-size: 0.875rem;
        font-weight: 600;
        padding: 0.375rem 1rem;
        border-radius: 9999px;
    }

    #ann-dot {
        display: inline-block;
        width: 0.625rem;
        height: 0.625rem;
        border-radius: 9999px;
    }

    #ann-status {
        font-size: 0.875rem;
        font-weight: 600;
    }

    #ann-hours {
        font-size: 0.75rem;
        color: #6b7280;
    }
    .dark #ann-hours { color: #9ca3af; }

    #ann-popup-desc {
        font-size: 0.875rem;
        line-height: 1.6;
        text-align: center;
        color: #4b5563;
    }
    .dark #ann-popup-desc { color: #d1d5db; }
    #ann-popup-desc p { margin-bottom: 0.25rem; }
    #ann-popup-desc strong { font-weight: 600; }

    #ann-mengerti-btn {
        width: 100%;
        padding: 0.625rem;
        border-radius: 0.75rem;
        font-size: 0.875rem;
        font-weight: 600;
        color: #ffffff;
        cursor: pointer;
        border: none;
        background: #1f2937;
        transition: background-color 0.2s;
    }
    #ann-mengerti-btn:hover { background: #374151; }
    .dark #ann-mengerti-btn { background: #374151; }
    .dark #ann-mengerti-btn:hover { background: #4b5563; }

    #ann-dismiss-btn {
        width: 100%;
        padding: 0.5rem;
        border-radius: 0.75rem;
        font-size: 0.75rem;
        font-weight: 500;
        cursor: pointer;
        border: none;
        background: transparent;
        color: #6b7280;
        transition: color 0.2s;
    }
    #ann-dismiss-btn:hover { text-decoration: underline; }
    .dark #ann-dismiss-btn { color: #9ca3af; }
</style>

<div id="ann-popup-overlay">
    <div id="ann-popup-modal">
        {{-- X Close (tutup saja, muncul lagi saat refresh) --}}
        <button id="ann-close-btn" title="Tutup" type="button">
            <svg style="width:1rem; height:1rem;" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
        </button>

        {{-- Photo --}}
        @if($photo)
        <div id="ann-popup-photo">
            <img src="{{ $photo }}" alt="{{ $title }}" />
        </div>
        @endif

        {{-- Content --}}
        <div id="ann-popup-content">

            {{-- Title --}}
            <h2 id="ann-popup-title">{{ $title }}</h2>

            {{-- Countdown + Status --}}
            <div style="display:flex; flex-direction:column; gap:0.5rem;">
                <div style="display:flex; justify-content:center;">
                    <span id="ann-countdown"></span>
                </div>
                <div style="display:flex; align-items:center; justify-content:center; gap:0.5rem;">
                    <span id="ann-dot"></span>
                    <span id="ann-status"></span>
                    <span id="ann-hours">({{ $open_time }} – {{ $close_time }})</span>
                </div>
            </div>

            {{-- Description --}}
            @if($description)
            <div id="ann-popup-desc">{!! $description !!}</div>
            @endif

            {{-- Tombol aksi --}}
            <div style="display:flex; flex-direction:column; gap:0.5rem;">
                {{-- Mengerti: tutup saja, muncul lagi saat refresh --}}
                <button id="ann-mengerti-btn" type="button">Mengerti</button>

                {{-- Jangan tampilkan lagi: simpan ke localStorage, tidak muncul 1 hari --}}
                <button id="ann-dismiss-btn" type="button">Jangan tampilkan lagi hari ini</button>
            </div>

        </div>
    </div>
</div>

<script>
(function () {
    var STORAGE_KEY = 'ann_v2_{{ $days }}_' + new Date().toISOString().slice(0, 10);
    var OPEN_TIME   = '{{ $open_time }}';
    var CLOSE_TIME  = '{{ $close_time }}';
    var timer       = null;

    function parseSec(hhmm) {
        var p = hhmm.split(':');
        return parseInt(p[0], 10) * 3600 + parseInt(p[1], 10) * 60;
    }

    function pad(n) {
        return String(n).padStart(2, '0');
    }

    function fmt(sec) {
        var h = Math.floor(sec / 3600);
        var m = Math.floor((sec % 3600) / 60);
        var s = sec % 60;
        return h + ' jam : ' + pad(m) + ' menit : ' + pad(s) + ' detik';
    }

    function tick() {
        var now      = new Date();
        var nowSec   = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
        var openSec  = parseSec(OPEN_TIME);
        var closeSec = parseSec(CLOSE_TIME);
        var isOpen   = nowSec >= openSec && nowSec < closeSec;

        var countdown = document.getElementById('ann-countdown');
        var statusEl  = document.getElementById('ann-status');
        var dotEl     = document.getElementById('ann-dot');

        if (!countdown) return;

        if (isOpen) {
            countdown.textContent      = 'Tutup dalam ' + fmt(closeSec - nowSec);
            countdown.style.background = '#dcfce7';
            countdown.style.color      = '#15803d';
            statusEl.textContent       = 'Perpustakaan Buka';
            statusEl.style.color       = '#16a34a';
            dotEl.style.background     = '#22c55e';
        } else if (nowSec < openSec) {
            countdown.textContent      = 'Buka dalam ' + fmt(openSec - nowSec);
            countdown.style.background = '#fee2e2';
            countdown.style.color      = '#b91c1c';
            statusEl.textContent       = 'Perpustakaan Tutup';
            statusEl.style.color       = '#dc2626';
            dotEl.style.background     = '#ef4444';
        } else {
            countdown.textContent      = 'Perpustakaan sudah tutup hari ini';
            countdown.style.background = '#fee2e2';
            countdown.style.color      = '#b91c1c';
            statusEl.textContent       = 'Perpustakaan Tutup';
            statusEl.style.color       = '#dc2626';
            dotEl.style.background     = '#ef4444';
        }
    }

    function init() {
        var overlay = document.getElementById('ann-popup-overlay');
        if (!overlay) return;

        // Hindari inisialisasi ganda
        if (overlay.dataset.annInit === '1') return;
        overlay.dataset.annInit = '1';

        // Cek localStorage — hanya diset oleh tombol "Jangan tampilkan lagi hari ini"
        if (localStorage.getItem(STORAGE_KEY)) return;

        overlay.style.display = 'flex';

        tick();
        if (timer) clearInterval(timer);
        timer = setInterval(tick, 1000);

        // Tutup sementara — muncul kembali saat refresh
        function closeOnly() {
            overlay.style.display = 'none';
        }

        // Tutup + simpan ke localStorage — tidak muncul selama 1 hari
        function dismissForToday() {
            localStorage.setItem(STORAGE_KEY, '1');
            overlay.style.display = 'none';
        }

        document.getElementById('ann-close-btn').addEventListener('click', closeOnly);
        document.getElementById('ann-mengerti-btn').addEventListener('click', closeOnly);
        document.getElementById('ann-dismiss-btn').addEventListener('click', dismissForToday);
        overlay.addEventListener('click', function (e) {
            if (e.target === overlay) closeOnly();
        });
    }

    // Jalankan di berbagai kondisi agar pasti ter-eksekusi
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    // Jaga-jaga bila Filament memakai SPA / wire:navigate
    document.addEventListener('livewire:navigated', init);
})();
</script>
