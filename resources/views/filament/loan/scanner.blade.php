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

{{-- Styling sadar-tema (light/dark). Filament menambahkan class `dark` pada <html>,
     jadi varian gelap memakai prefix `.dark`. Sebelumnya tombol kamera memakai
     background putih hardcoded sementara warna teks mewarisi teks terang dark-mode
     sehingga tombol tampak putih polos (teks tak terlihat). --}}
<style>
    .mc-scan-wrap .mc-scan-input {
        flex:1; padding:.6rem .8rem; border-radius:.6rem; font-size:.95rem;
        border:1px solid #d1d5db; background:#ffffff; color:#111827;
    }
    .mc-scan-wrap .mc-scan-input::placeholder { color:#9ca3af; }
    .mc-scan-wrap .mc-btn {
        display:inline-flex; align-items:center; gap:.45rem; padding:.55rem 1rem;
        border-radius:.6rem; border:1px solid #d1d5db; background:#ffffff;
        color:#111827; font-weight:600; cursor:pointer;
    }
    .mc-scan-wrap .mc-btn:hover { background:#f3f4f6; }
    .mc-scan-wrap .mc-btn:disabled { opacity:.6; cursor:not-allowed; }
    .mc-scan-wrap .mc-btn-primary {
        display:inline-flex; align-items:center; justify-content:center;
        padding:.6rem 1rem; border:none; border-radius:.6rem;
        background:#059669; color:#ffffff; font-weight:700; cursor:pointer;
    }
    .mc-scan-wrap .mc-btn-primary:hover { background:#047857; }
    .mc-scan-wrap .mc-hint { font-size:.72rem; color:#6b7280; }
    .mc-scan-wrap .mc-cam-frame { border:1px dashed #cbd5e1; border-radius:.6rem; overflow:hidden; }

    .dark .mc-scan-wrap .mc-scan-input { border-color:#3f3f46; background:#27272a; color:#f4f4f5; }
    .dark .mc-scan-wrap .mc-scan-input::placeholder { color:#a1a1aa; }
    .dark .mc-scan-wrap .mc-btn { border-color:#3f3f46; background:#27272a; color:#f4f4f5; }
    .dark .mc-scan-wrap .mc-btn:hover { background:#3f3f46; }
    .dark .mc-scan-wrap .mc-hint { color:#a1a1aa; }
    .dark .mc-scan-wrap .mc-cam-frame { border-color:#3f3f46; }
</style>

<div
    class="mc-scan-wrap"
    x-data="{
        code: '',
        scanning: false,
        loadingLib: false,
        processing: false,
        switching: false,
        status: 'Arahkan scanner, ketik nomor anggota, atau gunakan kamera.',
        statusType: 'idle',
        html5Qr: null,
        readerId: 'mc-reader-' + Math.random().toString(36).slice(2),
        wireMethod: @js($wireMethod),
        cameras: [],
        cameraIndex: 0,

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

        // Konfigurasi pemindai: kotak scan dibuat sebesar mungkin (mengisi hampir
        // seluruh area kamera) namun tetap menyisakan batas di tepi agar barcode 1D
        // (Code128) maupun QR mudah terdeteksi.
        scanConfig() {
            return {
                fps: 12,
                qrbox: (vw, vh) => {
                    const width  = Math.max(160, Math.floor(vw * 0.92));
                    const height = Math.max(120, Math.floor(vh * 0.82));
                    return { width, height };
                },
                aspectRatio: 1.7777778,
            };
        },

        // Tentukan kamera awal: utamakan kamera belakang (environment) bila ada,
        // jika tidak pakai kamera pertama yang tersedia.
        pickInitialCameraIndex() {
            const back = this.cameras.findIndex(
                (c) => /back|rear|environment|belakang/i.test(c.label || '')
            );
            if (back >= 0) return back;
            // Pada banyak ponsel kamera belakang berada di urutan terakhir.
            return this.cameras.length > 1 ? this.cameras.length - 1 : 0;
        },

        async startCamera() {
            try { await this.loadLib(); }
            catch (e) { this.setStatus('Gagal memuat pustaka kamera. Periksa koneksi internet.', 'error'); return; }

            this.scanning = true;
            this.setStatus('Mengaktifkan kamera...', 'info');
            await this.$nextTick();

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

                // Daftar kamera (depan/belakang) untuk fitur ganti kamera.
                try {
                    this.cameras = (await Html5Qrcode.getCameras()) || [];
                } catch (eCam) {
                    this.cameras = [];
                }

                if (this.cameras.length > 0) {
                    this.cameraIndex = this.pickInitialCameraIndex();
                    await this.startWithCurrentCamera();
                } else {
                    // Fallback bila enumerasi kamera gagal: pakai facingMode.
                    const onOk = (t) => this.onDecoded(t);
                    try {
                        await this.html5Qr.start({ facingMode: 'environment' }, this.scanConfig(), onOk, () => {});
                    } catch (eRear) {
                        await this.html5Qr.start({ facingMode: 'user' }, this.scanConfig(), onOk, () => {});
                    }
                    this.setStatus('Arahkan kamera ke barcode / QR. Pegang stabil, isi penuh kotak, cahaya cukup.', 'info');
                }
            } catch (e) {
                this.scanning = false;
                this.setStatus('Tidak dapat mengakses kamera. Pastikan izin kamera diberikan.', 'error');
            }
        },

        async startWithCurrentCamera() {
            const cam = this.cameras[this.cameraIndex];
            if (! cam) return;

            const onOk = (t) => this.onDecoded(t);
            await this.html5Qr.start({ deviceId: { exact: cam.id } }, this.scanConfig(), onOk, () => {});
            this.setStatus('Arahkan kamera ke barcode / QR. Pegang stabil, isi penuh kotak, cahaya cukup.', 'info');
        },

        // Ganti kamera depan ⇄ belakang (atau berputar bila lebih dari dua).
        async switchCamera() {
            if (this.switching || this.cameras.length < 2 || ! this.html5Qr) return;

            this.switching = true;
            this.setStatus('Mengganti kamera...', 'info');
            try {
                try { await this.html5Qr.stop(); } catch (e) {}
                this.cameraIndex = (this.cameraIndex + 1) % this.cameras.length;
                await this.startWithCurrentCamera();
            } catch (e) {
                this.setStatus('Gagal mengganti kamera.', 'error');
            } finally {
                this.switching = false;
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
                class="mc-scan-input"
            />
            <button
                type="button"
                x-on:click="submitCode()"
                class="mc-btn-primary"
            >Cari</button>
        </div>
    </div>

    {{-- Tombol kamera --}}
    <div style="display:flex; align-items:center; gap:.6rem; flex-wrap:wrap;">
        <button
            type="button"
            x-on:click="toggleCamera()"
            x-bind:disabled="loadingLib"
            class="mc-btn"
        >
            <svg style="width:1.1rem;height:1.1rem;" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.66-.9l.82-1.2A2 2 0 0110.07 4h3.86a2 2 0 011.66.9l.82 1.2a2 2 0 001.66.9H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
                <circle cx="12" cy="13" r="3"/>
            </svg>
            <span x-show="!scanning">Buka Kamera</span>
            <span x-show="scanning" style="display:none;">Tutup Kamera</span>
            <span x-show="loadingLib" style="display:none;">Memuat...</span>
        </button>

        {{-- Ganti kamera depan/belakang (muncul bila perangkat punya >1 kamera) --}}
        <button
            type="button"
            x-show="scanning && cameras.length > 1"
            x-cloak
            x-on:click="switchCamera()"
            x-bind:disabled="switching"
            class="mc-btn"
        >
            <svg style="width:1.1rem;height:1.1rem;" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16 3h5v5"/>
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 3l-7 7"/>
                <path stroke-linecap="round" stroke-linejoin="round" d="M8 21H3v-5"/>
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 21l7-7"/>
                <circle cx="12" cy="12" r="2.5"/>
            </svg>
            <span x-show="!switching">Ganti Kamera</span>
            <span x-show="switching" style="display:none;">Mengganti...</span>
        </button>

        <span class="mc-hint">QR & Code128 didukung</span>
    </div>

    {{-- Area kamera --}}
    <div x-show="scanning" x-cloak class="mc-cam-frame">
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
