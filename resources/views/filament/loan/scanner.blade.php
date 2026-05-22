{{--
    Pemindai Kartu Anggota untuk peminjaman.
    Mendukung:
      - Scanner USB / keyboard-wedge  (mengetik ke input lalu Enter)
      - Input manual nomor anggota
      - Kamera webcam (html5-qrcode) membaca QR Code & Code128

    Saat kode terbaca, memanggil method Livewire $wireMethod($code) pada
    komponen halaman (CreateLoan / EditLoan / ListLoans).
--}}
@php($wireMethod = $wireMethod ?? 'applyScannedMember')

<div
    x-data="{
        code: '',
        scanning: false,
        loadingLib: false,
        processing: false,
        status: 'Arahkan scanner, ketik nomor anggota, atau gunakan kamera.',
        statusType: 'idle',
        html5Qr: null,
        readerId: 'mc-reader-' + Math.random().toString(36).slice(2),
        wireMethod: @js($wireMethod),

        init() {
            this.$nextTick(() => { this.$refs.scanInput && this.$refs.scanInput.focus(); });
        },

        setStatus(msg, type) { this.status = msg; this.statusType = type; },

        async submitCode(value) {
            if (this.processing) return;
            const v = (value ?? this.code ?? '').toString().trim();
            if (! v) { this.setStatus('Masukkan atau scan kode kartu terlebih dahulu.', 'error'); return; }

            this.processing = true;
            this.setStatus('Memproses kartu: ' + v + ' ...', 'info');
            await this.stopCamera();
            try {
                await this.$wire[this.wireMethod](v);
            } finally {
                // Bila modal tidak tertutup (mis. kode tidak dikenali), izinkan scan ulang.
                this.processing = false;
                this.code = '';
                this.$nextTick(() => { this.$refs.scanInput && this.$refs.scanInput.focus(); });
            }
        },

        loadLib() {
            return new Promise((resolve, reject) => {
                if (window.Html5Qrcode) { resolve(); return; }
                this.loadingLib = true;
                const s = document.createElement('script');
                s.src = 'https://unpkg.com/html5-qrcode@2.3.8/html5-qrcode.min.js';
                s.onload = () => { this.loadingLib = false; resolve(); };
                s.onerror = () => { this.loadingLib = false; reject(); };
                document.head.appendChild(s);
            });
        },

        onDecoded(decodedText) {
            // Tampilkan nilai terbaca agar jelas barcode/QR berhasil terdeteksi.
            this.setStatus('Terbaca: ' + decodedText, 'info');
            this.submitCode(decodedText);
        },

        async startCamera() {
            try { await this.loadLib(); }
            catch (e) { this.setStatus('Gagal memuat pustaka kamera. Periksa koneksi internet.', 'error'); return; }

            this.scanning = true;
            this.setStatus('Mengaktifkan kamera...', 'info');
            await this.$nextTick();

            // Kotak scan lebar & responsif — penting agar barcode 1D (Code128) mudah terbaca.
            const config = {
                fps: 12,
                qrbox: (vw, vh) => ({
                    width: Math.floor(Math.min(vw * 0.85, 340)),
                    height: Math.floor(Math.min(vh * 0.6, 220)),
                }),
                aspectRatio: 1.7777778,
            };
            const onOk = (decodedText) => { this.onDecoded(decodedText); };
            const onErr = () => {};

            try {
                this.html5Qr = new Html5Qrcode(this.readerId, {
                    formatsToSupport: [
                        Html5QrcodeSupportedFormats.QR_CODE,
                        Html5QrcodeSupportedFormats.CODE_128,
                    ],
                    // Gunakan BarcodeDetector bawaan browser (Chrome/Edge) — jauh lebih akurat untuk Code128.
                    experimentalFeatures: { useBarCodeDetectorIfSupported: true },
                    verbose: false,
                });

                // Coba kamera belakang dulu; bila gagal (laptop biasanya hanya kamera depan), pakai kamera depan.
                try {
                    await this.html5Qr.start({ facingMode: 'environment' }, config, onOk, onErr);
                } catch (eRear) {
                    await this.html5Qr.start({ facingMode: 'user' }, config, onOk, onErr);
                }
                this.setStatus('Arahkan kamera ke barcode / QR. Pegang stabil, isi penuh kotak, cahaya cukup.', 'info');
            } catch (e) {
                this.scanning = false;
                this.setStatus('Tidak dapat mengakses kamera. Pastikan izin kamera diberikan.', 'error');
            }
        },

        async stopCamera() {
            if (this.html5Qr && this.scanning) {
                try { await this.html5Qr.stop(); this.html5Qr.clear(); } catch (e) {}
            }
            this.scanning = false;
        },

        toggleCamera() { this.scanning ? this.stopCamera() : this.startCamera(); },
    }"
    x-init="init()"
    x-on:keydown.enter.prevent.stop="submitCode()"
    style="display:flex; flex-direction:column; gap:.9rem;"
>
    {{-- Input scanner / manual --}}
    <div>
        <label style="display:block; font-size:.8rem; font-weight:600; margin-bottom:.35rem;">
            Nomor Anggota / Barcode / QR
        </label>
        <div style="display:flex; gap:.5rem;">
            <input
                x-ref="scanInput"
                x-model="code"
                type="text"
                inputmode="text"
                autocomplete="off"
                placeholder="Scan kartu atau ketik nomor anggota, lalu Enter"
                style="flex:1; padding:.6rem .8rem; border:1px solid #d1d5db; border-radius:.6rem; font-size:.95rem;"
            />
            <button
                type="button"
                x-on:click="submitCode()"
                style="padding:.6rem 1rem; border:none; border-radius:.6rem; background:#059669; color:#fff; font-weight:700; cursor:pointer;"
            >Cari</button>
        </div>
    </div>

    {{-- Tombol kamera --}}
    <div style="display:flex; align-items:center; gap:.6rem;">
        <button
            type="button"
            x-on:click="toggleCamera()"
            x-bind:disabled="loadingLib"
            style="display:inline-flex; align-items:center; gap:.45rem; padding:.55rem 1rem; border-radius:.6rem; border:1px solid #d1d5db; background:#fff; font-weight:600; cursor:pointer;"
        >
            <svg style="width:1.1rem;height:1.1rem;" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.66-.9l.82-1.2A2 2 0 0110.07 4h3.86a2 2 0 011.66.9l.82 1.2a2 2 0 001.66.9H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
                <circle cx="12" cy="13" r="3"/>
            </svg>
            <span x-show="!scanning">Buka Kamera</span>
            <span x-show="scanning" style="display:none;">Tutup Kamera</span>
            <span x-show="loadingLib" style="display:none;">Memuat...</span>
        </button>
        <span style="font-size:.72rem; color:#6b7280;">QR & Code128 didukung</span>
    </div>

    {{-- Area kamera --}}
    <div x-show="scanning" x-cloak style="border:1px dashed #cbd5e1; border-radius:.6rem; overflow:hidden;">
        <div x-bind:id="readerId" style="width:100%;"></div>
    </div>

    {{-- Status --}}
    <div
        x-text="status"
        x-bind:style="statusType === 'error'
            ? 'font-size:.82rem;font-weight:600;color:#dc2626;'
            : (statusType === 'info' ? 'font-size:.82rem;font-weight:600;color:#2563eb;' : 'font-size:.82rem;color:#6b7280;')"
    ></div>
</div>
