import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/lib/utils';
import axios from 'axios';
import {
    Camera,
    CameraOff,
    CheckCircle2,
    Clock,
    QrCode,
    XCircle,
} from 'lucide-react';
import {
    useCallback,
    useEffect,
    useId,
    useRef,
    useState,
    type FormEvent,
} from 'react';
import { route } from 'ziggy-js';

type ScanStatus = 'success' | 'already' | 'rejected' | 'guest';

interface ScanUser {
    name: string;
    email: string;
    avatar: string;
}

interface ScanResult {
    status: ScanStatus;
    message: string;
    user?: ScanUser;
}

interface BarcodeScannerProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    /** Dipanggil saat kartu tidak dikenali — arahkan operator ke isian manual (tamu). */
    onGuestFallback: () => void;
    /** Dipanggil saat kunjungan berhasil tercatat otomatis (untuk refresh data bila perlu). */
    onRecorded?: () => void;
}

const HTML5_QRCODE_CDN =
    'https://unpkg.com/html5-qrcode@2.3.8/html5-qrcode.min.js';

/** Muat pustaka html5-qrcode dari CDN sekali saja (pola sama dengan scanner Filament). */
function loadHtml5QrcodeLib(): Promise<void> {
    return new Promise((resolve, reject) => {
        if (typeof window === 'undefined') {
            reject(new Error('no window'));
            return;
        }
        if ((window as unknown as { Html5Qrcode?: unknown }).Html5Qrcode) {
            resolve();
            return;
        }
        const script = document.createElement('script');
        script.src = HTML5_QRCODE_CDN;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('failed to load html5-qrcode'));
        document.head.appendChild(script);
    });
}

const resultMeta: Record<
    Exclude<ScanStatus, 'guest'>,
    { icon: typeof CheckCircle2; ring: string; text: string; title: string }
> = {
    success: {
        icon: CheckCircle2,
        ring: 'text-emerald-600 bg-emerald-50',
        text: 'text-emerald-700',
        title: 'Terima Kasih Telah Berkunjung!',
    },
    already: {
        icon: Clock,
        ring: 'text-brass bg-brass-50',
        text: 'text-brass',
        title: 'Sudah Tercatat Hari Ini',
    },
    rejected: {
        icon: XCircle,
        ring: 'text-red-600 bg-red-50',
        text: 'text-red-700',
        title: 'Akses Ditolak',
    },
};

export function BarcodeScanner({
    open,
    onOpenChange,
    onGuestFallback,
    onRecorded,
}: BarcodeScannerProps) {
    const [code, setCode] = useState('');
    const [scanning, setScanning] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [status, setStatus] = useState<{
        msg: string;
        type: 'idle' | 'info' | 'error';
    }>({
        msg: 'Arahkan scanner, ketik nomor anggota, atau gunakan kamera.',
        type: 'idle',
    });
    const [result, setResult] = useState<ScanResult | null>(null);

    const inputRef = useRef<HTMLInputElement | null>(null);
    const html5QrRef = useRef<{
        stop: () => Promise<void>;
        clear: () => void;
    } | null>(null);
    const readerId = 'mc-reader-' + useId().replace(/[^a-zA-Z0-9_-]/g, '');

    // Guard sinkron agar dekode kamera tidak diproses ganda (menghindari closure state basi).
    const processingRef = useRef(false);
    // Mengingat apakah kamera sedang menjadi mode aktif (untuk lanjut otomatis di "Scan Lagi").
    const cameraModeRef = useRef(false);

    const setStatusMsg = (msg: string, type: 'idle' | 'info' | 'error') =>
        setStatus({ msg, type });

    // Hentikan kamera berdasarkan instance di ref (bukan state `scanning`) agar tidak terjebak
    // closure basi — null-kan ref dulu agar tidak re-entrant, lalu stop() & clear() melepas stream.
    const stopCamera = useCallback(async () => {
        const inst = html5QrRef.current;
        html5QrRef.current = null;
        if (inst) {
            try {
                await inst.stop();
            } catch {
                /* abaikan: mungkin sudah berhenti */
            }
            try {
                inst.clear();
            } catch {
                /* abaikan */
            }
        }
        setScanning(false);
    }, []);

    const submitCode = useCallback(
        async (value?: string) => {
            if (processingRef.current) return;
            const v = (value ?? code ?? '').toString().trim();
            if (!v) {
                setStatusMsg(
                    'Masukkan atau scan kode kartu terlebih dahulu.',
                    'error',
                );
                return;
            }

            processingRef.current = true;
            setProcessing(true);
            setStatusMsg('Memproses kartu: ' + v + ' ...', 'info');
            await stopCamera();

            try {
                const { data } = await axios.post<ScanResult>(
                    route('visit.scan'),
                    { code: v },
                );

                if (data.status === 'guest') {
                    // Kartu tak dikenal → tutup dialog & arahkan ke isian manual.
                    setStatusMsg(
                        'Arahkan scanner, ketik nomor anggota, atau gunakan kamera.',
                        'idle',
                    );
                    onOpenChange(false);
                    onGuestFallback();
                    return;
                }

                if (data.status === 'success') {
                    onRecorded?.();
                }

                setResult(data);
            } catch {
                setStatusMsg('Gagal memproses kartu. Coba lagi.', 'error');
            } finally {
                processingRef.current = false;
                setProcessing(false);
                setCode('');
            }
        },
        [code, stopCamera, onOpenChange, onGuestFallback, onRecorded],
    );

    const startCamera = useCallback(async () => {
        try {
            await loadHtml5QrcodeLib();
        } catch {
            setStatusMsg(
                'Gagal memuat pustaka kamera. Periksa koneksi internet.',
                'error',
            );
            return;
        }

        cameraModeRef.current = true;
        setScanning(true);
        setStatusMsg('Mengaktifkan kamera...', 'info');

        // Tunggu elemen reader ter-render.
        await new Promise((r) => setTimeout(r, 50));

        const w = window as unknown as {
            Html5Qrcode: new (
                id: string,
                config: unknown,
            ) => {
                start: (
                    cam: unknown,
                    config: unknown,
                    onOk: (text: string) => void,
                    onErr: () => void,
                ) => Promise<void>;
                stop: () => Promise<void>;
                clear: () => void;
            };
            Html5QrcodeSupportedFormats: {
                QR_CODE: unknown;
                CODE_128: unknown;
            };
        };

        const config = {
            fps: 12,
            qrbox: (vw: number, vh: number) => ({
                width: Math.floor(Math.min(vw * 0.95, 400)),
                height: Math.floor(Math.min(vh * 0.95, 300)),
            }),
            aspectRatio: 1.7777778,
        };

        try {
            const instance = new w.Html5Qrcode(readerId, {
                formatsToSupport: [
                    w.Html5QrcodeSupportedFormats.QR_CODE,
                    w.Html5QrcodeSupportedFormats.CODE_128,
                ],
                experimentalFeatures: { useBarCodeDetectorIfSupported: true },
                verbose: false,
            });
            html5QrRef.current = instance;

            const onOk = (decodedText: string) => {
                setStatusMsg('Terbaca: ' + decodedText, 'info');
                void submitCode(decodedText);
            };

            try {
                await instance.start(
                    { facingMode: 'environment' },
                    config,
                    onOk,
                    () => {},
                );
            } catch {
                await instance.start(
                    { facingMode: 'user' },
                    config,
                    onOk,
                    () => {},
                );
            }
            setStatusMsg(
                'Arahkan kamera ke barcode / QR. Pegang stabil, isi penuh kotak, cahaya cukup.',
                'info',
            );
        } catch {
            setScanning(false);
            setStatusMsg(
                'Tidak dapat mengakses kamera. Pastikan izin kamera diberikan.',
                'error',
            );
        }
    }, [submitCode, readerId]);

    const toggleCamera = () => {
        if (scanning) {
            cameraModeRef.current = false; // dimatikan manual → jangan auto-lanjut
            void stopCamera();
        } else {
            void startCamera();
        }
    };

    const onManualSubmit = (e: FormEvent) => {
        e.preventDefault();
        void submitCode();
    };

    // "Scan Lagi": bersihkan hasil, lalu lanjutkan otomatis dengan kamera bila tadi memakai kamera
    // (instance & video lama sudah dilepas oleh stopCamera), selain itu fokuskan input USB/manual.
    const resetScanner = () => {
        setResult(null);
        setCode('');
        setStatusMsg(
            'Arahkan scanner, ketik nomor anggota, atau gunakan kamera.',
            'idle',
        );
        if (cameraModeRef.current) {
            void startCamera();
        } else {
            setTimeout(() => inputRef.current?.focus(), 50);
        }
    };

    // Tutup dialog: matikan kamera & kembalikan ke kondisi awal agar pembukaan berikutnya bersih.
    const closeDialog = () => {
        cameraModeRef.current = false;
        void stopCamera();
        setResult(null);
        setCode('');
        setStatusMsg(
            'Arahkan scanner, ketik nomor anggota, atau gunakan kamera.',
            'idle',
        );
        onOpenChange(false);
    };

    // Fokus ke input saat dialog terbuka (tanpa hasil). Reset state ditangani saat menutup.
    useEffect(() => {
        if (!open || result) return;
        const id = setTimeout(() => inputRef.current?.focus(), 80);
        return () => clearTimeout(id);
    }, [open, result]);

    const handleOpenChange = (next: boolean) => {
        if (next) onOpenChange(true);
        else closeDialog();
    };

    const statusColor =
        status.type === 'error'
            ? 'text-red-600'
            : status.type === 'info'
              ? 'text-blue-600'
              : 'text-muted-foreground';

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <QrCode className="size-5" /> Scan Kartu Anggota —
                        Kunjungan
                    </DialogTitle>
                    <DialogDescription>
                        Pindai barcode / QR pada kartu anggota. Kunjungan
                        otomatis tercatat tanpa mengisi form.
                    </DialogDescription>
                </DialogHeader>

                {result ? (
                    <ScanResultCard
                        result={result}
                        onAgain={resetScanner}
                        onClose={closeDialog}
                    />
                ) : (
                    <div className="flex flex-col gap-4">
                        <form
                            onSubmit={onManualSubmit}
                            className="flex items-end gap-2"
                        >
                            <div className="flex-1">
                                <label
                                    htmlFor="scan-code"
                                    className="mb-1 block text-sm font-medium"
                                >
                                    Nomor Anggota / Kode Kartu
                                </label>
                                <Input
                                    id="scan-code"
                                    ref={inputRef}
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    placeholder="Scan atau ketik nomor anggota…"
                                    autoComplete="off"
                                    disabled={processing}
                                />
                            </div>
                            <Button type="submit" disabled={processing}>
                                {processing ? <Spinner /> : 'Proses'}
                            </Button>
                        </form>

                        <Button
                            type="button"
                            variant="outline"
                            onClick={toggleCamera}
                            disabled={processing}
                            className="flex items-center gap-2 p-3"
                        >
                            {scanning ? (
                                <>
                                    <CameraOff className="size-4" /> Matikan
                                    Kamera
                                </>
                            ) : (
                                <>
                                    <Camera className="size-4" /> Gunakan Kamera
                                </>
                            )}
                        </Button>

                        <div
                            id={readerId}
                            className={cn(
                                'overflow-hidden rounded-lg border bg-black/5',
                                scanning ? 'block' : 'hidden',
                            )}
                        />

                        <p className={cn('text-sm', statusColor)}>
                            {status.msg}
                        </p>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}

function ScanResultCard({
    result,
    onAgain,
    onClose,
}: {
    result: ScanResult;
    onAgain: () => void;
    onClose: () => void;
}) {
    const meta =
        result.status === 'guest'
            ? resultMeta.rejected
            : resultMeta[result.status];
    const Icon = meta.icon;
    const user = result.user; // const → narrowing tetap berlaku di dalam closure onError

    return (
        <div className="flex flex-col items-center gap-4 py-2 text-center">
            <div
                className={cn(
                    'flex size-16 items-center justify-center rounded-full',
                    meta.ring,
                )}
            >
                <Icon className="size-9" />
            </div>
            <h3 className={cn('text-lg font-semibold', meta.text)}>
                {meta.title}
            </h3>

            {user && (
                <div className="flex items-center gap-3 rounded-xl border bg-muted/40 p-3">
                    <img
                        src={user.avatar}
                        alt={user.name}
                        onError={(e) => {
                            e.currentTarget.src =
                                'https://ui-avatars.com/api/?name=' +
                                encodeURIComponent(user.name) +
                                '&background=random&color=fff';
                        }}
                        className="size-12 rounded-full object-cover"
                    />
                    <div className="text-left">
                        <div className="font-semibold">{user.name}</div>
                        <div className="text-sm text-muted-foreground">
                            {user.email}
                        </div>
                    </div>
                </div>
            )}

            <p className="text-sm text-muted-foreground">{result.message}</p>

            <div className="flex w-full gap-2">
                <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={onAgain}
                >
                    Scan Lagi
                </Button>
                <Button type="button" className="flex-1" onClick={onClose}>
                    Selesai
                </Button>
            </div>
        </div>
    );
}
