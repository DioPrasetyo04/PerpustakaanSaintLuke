import { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import workerSrc from 'pdfjs-dist/build/pdf.worker.min.js?url';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';

// 🔥 WAJIB untuk react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

type Props = {
    url: string;
};

export default function PDFViewer({ url }: Props) {
    const [file, setFile] = useState<Blob | null>(null);
    const [numPages, setNumPages] = useState<number>(0);
    const [page, setPage] = useState<number>(1);
    const [scale, setScale] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

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

    // 🔥 Loading state
    if (loading) {
        return <div className="p-4 text-center">Loading PDF...</div>;
    }

    // 🔥 Error state
    if (error) {
        return <div className="p-4 text-center text-red-500">{error}</div>;
    }

    if (!file) return null;

    return (
        <div className="p-4">
            {/* 🔥 NAVIGATION */}
            {numPages > 1 && (
                <div className="mb-4 flex items-center justify-center gap-4">
                    {/* PREV */}
                    {page > 1 && (
                        <button
                            onClick={() => setPage((p) => p - 1)}
                            className="rounded bg-black px-4 py-2 text-white"
                        >
                            Prev
                        </button>
                    )}

                    {/* PAGE INFO */}
                    <span className="font-medium">
                        {page} / {numPages}
                    </span>

                    {/* NEXT */}
                    {page < numPages && (
                        <button
                            onClick={() => setPage((p) => p + 1)}
                            className="rounded bg-black px-4 py-2 text-white"
                        >
                            Next
                        </button>
                    )}
                </div>
            )}

            {/* 🔥 ZOOM */}
            <div className="mb-4 flex justify-center gap-2">
                <button
                    onClick={() => setScale((s) => s + 0.1)}
                    className="rounded bg-black px-4 py-2 text-white"
                >
                    Zoom +
                </button>

                <button
                    onClick={() => setScale((s) => Math.max(0.5, s - 0.1))}
                    className="rounded bg-black px-4 py-2 text-white"
                >
                    Zoom -
                </button>
            </div>

            {/* 🔥 PDF DOCUMENT */}
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
