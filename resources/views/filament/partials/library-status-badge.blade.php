<style>
    #lib-status-wrap {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 1rem;
        z-index: 9990;            /* di bawah modal announcement (99999) */
        display: flex;
        justify-content: flex-end; /* justify-end */
        align-items: center;       /* align-items center */
        padding: 0 1.25rem;
        pointer-events: none;      /* klik tembus, kecuali badge */
    }

    #lib-status-badge {
        pointer-events: auto;
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 1rem;
        border-radius: 9999px;
        font-size: 0.875rem;
        font-weight: 700;
        color: #ffffff;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, .15), 0 4px 6px -4px rgba(0, 0, 0, .1);
        transition: background-color 0.3s ease;
    }

    #lib-status-badge svg {
        width: 1.1rem;
        height: 1.1rem;
        display: block;
    }

    #lib-status-icon {
        display: inline-flex;
        line-height: 0;
    }
</style>

<div id="lib-status-wrap">
    <div id="lib-status-badge">
        <span id="lib-status-icon"></span>
        <span id="lib-status-text"></span>
    </div>
</div>

<script>
(function () {
    var OPEN_TIME  = '{{ $open_time }}';
    var CLOSE_TIME = '{{ $close_time }}';
    var timer      = null;

    var ICON_OPEN  = '<svg fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path stroke-linecap="round" stroke-linejoin="round" d="M8.5 12.5l2.5 2.5 4.5-5"/></svg>';
    var ICON_CLOSE = '<svg fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path stroke-linecap="round" stroke-linejoin="round" d="M9 9l6 6M15 9l-6 6"/></svg>';

    function parseSec(hhmm) {
        var p = hhmm.split(':');
        return parseInt(p[0], 10) * 3600 + parseInt(p[1], 10) * 60;
    }

    function tick() {
        var badge = document.getElementById('lib-status-badge');
        var iconEl = document.getElementById('lib-status-icon');
        var textEl = document.getElementById('lib-status-text');
        if (!badge || !iconEl || !textEl) return;

        var now      = new Date();
        var nowSec   = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
        var openSec  = parseSec(OPEN_TIME);
        var closeSec = parseSec(CLOSE_TIME);
        var isOpen   = nowSec >= openSec && nowSec < closeSec;

        if (isOpen) {
            badge.style.background = '#16a34a';
            textEl.textContent     = 'Perpustakaan Buka';
            iconEl.innerHTML       = ICON_OPEN;
        } else {
            badge.style.background = '#dc2626';
            textEl.textContent     = 'Perpustakaan Tutup';
            iconEl.innerHTML       = ICON_CLOSE;
        }
    }

    function init() {
        var wrap = document.getElementById('lib-status-wrap');
        if (!wrap) return;

        // Hindari inisialisasi ganda
        if (wrap.dataset.libInit === '1') return;
        wrap.dataset.libInit = '1';

        tick();
        if (timer) clearInterval(timer);
        timer = setInterval(tick, 1000);
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
