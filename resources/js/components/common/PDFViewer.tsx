import { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import workerSrc from 'pdfjs-dist/build/pdf.worker.min.js?url';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import { Maximize2, Minimize2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

// 🔥 WAJIB untuk react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

type Props = {
    url: string;
};

export default function PDFViewer({ url }: Props) {
    const { language } = useLanguage();
    const [file, setFile] = useState<Blob | null>(null);
    const [numPages, setNumPages] = useState<number>(0);
    const [page, setPage] = useState<number>(1);
    const [scale, setScale] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

    const tr = (id: string, en: string) => (language === 'id' ? id : en);

    // 🔥 Fetch PDF sebagai blob
    useEffect(() => {
        setLoading(true);
        setError(null);
        setFile(null);

        fetch(url, {
            credentials: 'include',
        })
            .then((res) => {
                if (!res.ok) throw new Error('Gagal fetch PDF');
                console.log('STATUS:', res.status);
                console.log('CONTENT-TYPE:', res.headers.get('content-type'));
                return res.blob();
            })
            .then((blob) => {
                setFile(blob);
                setLoading(false);
            })
            .catch((err) => {
                console.error('PDF FETCH ERROR:', err);
                setError('Failed to load PDF');
                setLoading(false);
            });
    }, [url]);

    // 🔥 Reset ke halaman pertama saat ganti file
    useEffect(() => {
        setPage(1);
    }, [url]);

    // 🔥 Keyboard: Esc keluar fullscreen, panah untuk navigasi halaman
    useEffect(() => {
        if (!isFullscreen) return;

        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsFullscreen(false);
            if (e.key === 'ArrowRight')
                setPage((p) => Math.min(numPages, p + 1));
            if (e.key === 'ArrowLeft') setPage((p) => Math.max(1, p - 1));
        };

        // Kunci scroll body selama fullscreen
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        window.addEventListener('keydown', handler);
        return () => {
            window.removeEventListener('keydown', handler);
            document.body.style.overflow = prevOverflow;
        };
    }, [isFullscreen, numPages]);

    // 🔥 Loading state
    if (loading) {
        return <div className="p-4 text-center">Loading PDF...</div>;
    }

    // 🔥 Error state
    if (error) {
        return <div className="p-4 text-center text-red-500">{error}</div>;
    }

    if (!file) return null;

    // 🔥 Toolbar kontrol (navigasi + zoom + fullscreen). Dipakai ulang di mode normal & fullscreen.
    const Controls = ({ dark = false }: { dark?: boolean }) => {
        const btn = dark
            ? 'rounded bg-white/15 px-3 py-2 text-white hover:bg-white/25 disabled:opacity-30 disabled:hover:bg-white/15'
            : 'rounded bg-black px-3 py-2 text-white hover:bg-black/80 disabled:opacity-30';

        return (
            <div className="flex flex-wrap items-center justify-center gap-2">
                {/* NAVIGATION */}
                {numPages > 1 && (
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                            disabled={page <= 1}
                            className={btn}
                            aria-label={tr(
                                'Halaman sebelumnya',
                                'Previous page',
                            )}
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </button>

                        <span
                            className={`min-w-[64px] text-center font-medium ${dark ? 'text-white' : ''}`}
                        >
                            {page} / {numPages}
                        </span>

                        <button
                            onClick={() =>
                                setPage((p) => Math.min(numPages, p + 1))
                            }
                            disabled={page >= numPages}
                            className={btn}
                            aria-label={tr('Halaman berikutnya', 'Next page')}
                        >
                            <ChevronRight className="h-4 w-4" />
                        </button>
                    </div>
                )}

                {/* ZOOM */}
                <button
                    onClick={() => setScale((s) => Math.min(3, s + 0.1))}
                    className={btn}
                >
                    Zoom +
                </button>
                <button
                    onClick={() => setScale((s) => Math.max(0.5, s - 0.1))}
                    className={btn}
                >
                    Zoom -
                </button>

                {/* FULLSCREEN TOGGLE */}
                <button
                    onClick={() => setIsFullscreen((v) => !v)}
                    className={`inline-flex items-center gap-2 ${btn}`}
                >
                    {isFullscreen ? (
                        <>
                            <Minimize2 className="h-4 w-4" />
                            {tr('Tutup Layar Penuh', 'Exit Fullscreen')}
                        </>
                    ) : (
                        <>
                            <Maximize2 className="h-4 w-4" />
                            {tr('Layar Penuh', 'Fullscreen')}
                        </>
                    )}
                </button>
            </div>
        );
    };

    // 🔥 Mode Fullscreen — overlay menutupi seluruh layar, download tetap tidak tersedia.
    if (isFullscreen) {
        return (
            <div
                className="fixed inset-0 z-[100] flex flex-col bg-black/95 select-none"
                onContextMenu={(e) => e.preventDefault()}
            >
                {/* Toolbar atas */}
                <div className="flex shrink-0 items-center justify-center gap-2 border-b border-white/10 p-3">
                    <Controls dark />
                </div>

                {/* Area dokumen (scrollable) */}
                <div className="flex flex-1 justify-center overflow-auto p-4">
                    <Document
                        file={file}
                        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                        onLoadError={(err) =>
                            console.error('PDF LOAD ERROR:', err)
                        }
                    >
                        <Page
                            pageNumber={page}
                            scale={scale}
                            renderTextLayer={false}
                        />
                    </Document>
                </div>
            </div>
        );
    }

    // 🔥 Mode normal
    return (
        <div className="p-4" onContextMenu={(e) => e.preventDefault()}>
            <div className="mb-4 flex justify-center">
                <Controls />
            </div>

            {/* PDF DOCUMENT */}
            <div className="flex justify-center">
                <Document
                    file={file}
                    onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                    onLoadError={(err) => console.error('PDF LOAD ERROR:', err)}
                >
                    <Page pageNumber={page} scale={scale} />
                </Document>
            </div>
        </div>
    );
}
