import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
    ArrowLeft,
    FileImage,
    FileSpreadsheet,
    FileText,
    Headphones,
    Video,
} from 'lucide-react';
import { Link, router, usePage } from '@inertiajs/react';
import { Card } from '@/components/ui/card';
import type { AssetPageProps } from '@/types/AssetPage/AssetPageProps';
import type { AssetProps, FileType } from '@/types/DataTypes/AssetProps';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';
import { Badge } from '@/components/ui/badge';
import { formattedDate } from '@/lib/utils';
import { useLanguage } from '@/hooks/useLanguage';
import { Document, Page } from 'react-pdf';

export default function assets() {
    const { props } = usePage<AssetPageProps>();
    const { book, assets, totalAssets } = props;
    const { language } = useLanguage();

    const [selectedAsset, setSelectedAsset] = useState<AssetProps | null>(
        assets[0] ?? null,
    );

    const [currentPage, setCurrentPage] = useState(1);
    const [numPages, setNumPages] = useState<number>(0);
    const [scale, setScale] = useState(1);

    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
        setNumPages(numPages);
    };

    // 🔥 PAKSA REFRESH SIGNED URL SAAT LOAD
    useEffect(() => {
        router.reload({
            only: ['assets'],
        });
    }, []);

    useEffect(() => {
        document.addEventListener('contextmenu', (e) => e.preventDefault());
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedAsset]);

    const getAssetIcon = (type: FileType) => {
        const icons = {
            pdf: <FileText className="h-5 w-5" />,
            word: <FileText className="h-5 w-5" />,
            excel: <FileSpreadsheet className="h-5 w-5" />,
            video: <Video className="h-5 w-5" />,
            audio: <Headphones className="h-5 w-5" />,
            image: <FileImage className="h-5 w-5" />,
        };
        return icons[type];
    };

    const getAssetColor = (type: FileType) => {
        const colors = {
            pdf: 'bg-red-100 text-red-600',
            video: 'bg-purple-100 text-purple-600',
            audio: 'bg-green-100 text-green-600',
            excel: 'bg-emerald-100 text-emerald-600',
            word: 'bg-blue-100 text-blue-600',
            image: 'bg-pink-100 text-pink-600',
        };
        return colors[type];
    };

    const renderAssetViewer = () => {
        if (!selectedAsset) return null;

        switch (selectedAsset.file_type) {
            case 'pdf':
                return (
                    <div className="p-4">
                        <div className="mb-4 flex justify-center gap-4">
                            <Button
                                onClick={() =>
                                    setCurrentPage((p) => Math.max(p - 1, 1))
                                }
                            >
                                Prev
                            </Button>

                            <span>
                                {currentPage} / {numPages}
                            </span>

                            <Button
                                onClick={() =>
                                    setCurrentPage((p) =>
                                        Math.min(p + 1, numPages),
                                    )
                                }
                            >
                                Next
                            </Button>
                        </div>

                        <div className="mb-4 flex justify-center gap-2">
                            <Button onClick={() => setScale((s) => s + 0.1)}>
                                Zoom +
                            </Button>
                            <Button
                                onClick={() =>
                                    setScale((s) => Math.max(0.5, s - 0.1))
                                }
                            >
                                Zoom -
                            </Button>
                        </div>

                        <Document
                            file={selectedAsset.url}
                            onLoadSuccess={onDocumentLoadSuccess}
                            key={selectedAsset.url} // 🔥 WAJIB
                        >
                            <Page pageNumber={currentPage} scale={scale} />
                        </Document>
                    </div>
                );

            case 'video':
                return (
                    <video
                        src={selectedAsset.url} // ❗ FIX
                        key={selectedAsset.url}
                        controls
                        controlsList="nodownload noremoteplayback"
                        disablePictureInPicture
                        className="w-full"
                        onError={() => router.reload({ only: ['assets'] })}
                    />
                );

            case 'audio':
                return (
                    <audio
                        src={selectedAsset.url}
                        key={selectedAsset.url}
                        controls
                        controlsList="nodownload"
                        className="w-full"
                    />
                );

            case 'image':
                return (
                    <img
                        src={selectedAsset.url} // ❗ FIX
                        key={selectedAsset.url}
                        className="max-h-[600px] w-full object-contain"
                        draggable={false}
                        onError={() => router.reload({ only: ['assets'] })}
                    />
                );

            default:
                return <div>Preview not supported</div>;
        }
    };
    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    <Link href="/dashboard">
                        <Button variant="ghost" className="gap-2">
                            <ArrowLeft className="h-4 w-4" />
                            Back to Dashboard
                        </Button>
                    </Link>

                    <Badge className="bg-blue-500">
                        Borrowed until{' '}
                        {formattedDate(
                            book.loan?.map((l) => l.due_date)[0],
                            language,
                        )}
                    </Badge>
                </div>

                {/* Book Info */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <Card className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="mb-2 font-['Poppins'] text-2xl font-bold text-gray-900 sm:text-3xl">
                                    {book.title}
                                </h1>
                                <div className="flex flex-1 flex-row items-center gap-2 p-2">
                                    {book.authors.map((author) => (
                                        <div key={author.id}>
                                            <ImageWithFallback
                                                src={author.avatar}
                                                alt={author.name}
                                                className="obejct-cover h-8 w-8 rounded-full object-center"
                                            />
                                            <p className="text-gray-600">
                                                {author.name}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-1 flex-row items-center gap-2 p-2">
                                {book.categories.map((category) => (
                                    <div key={category.id}>
                                        <ImageWithFallback
                                            src={category.icon}
                                            alt={category.name}
                                            className="h-8 w-8 object-cover object-center"
                                        />
                                        <Badge variant="outline">
                                            {category.name}
                                        </Badge>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Card>
                </motion.div>

                <div className="grid gap-6 lg:grid-cols-4">
                    {/* Assets Sidebar */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-1"
                    >
                        <Card className="p-6">
                            <h3 className="mb-4 font-semibold text-gray-900">
                                Available Files
                            </h3>

                            <div className="space-y-2">
                                {assets.length > 0 &&
                                    assets.map((asset) => (
                                        <button
                                            key={asset.id}
                                            onClick={() =>
                                                setSelectedAsset(asset)
                                            }
                                            className={`w-full rounded-lg p-3 text-left transition-all ${
                                                selectedAsset?.id === asset.id
                                                    ? 'bg-primary text-white shadow-md'
                                                    : 'bg-gray-50 hover:bg-gray-100'
                                            }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className={`rounded p-2 ${selectedAsset?.id === asset.id ? 'bg-white/20' : getAssetColor(asset.file_type)}`}
                                                >
                                                    {getAssetIcon(
                                                        asset.file_type,
                                                    )}
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <p
                                                        className={`truncate text-sm font-medium ${selectedAsset?.id === asset.id ? 'text-white' : 'text-gray-900'}`}
                                                    >
                                                        {asset.file_type.toUpperCase()}
                                                    </p>
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                            </div>

                            <div className="mt-6 border-t pt-6">
                                <p className="mb-2 text-sm text-gray-600">
                                    Total Files
                                </p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {totalAssets}
                                </p>
                            </div>
                        </Card>
                    </motion.div>

                    {/* Main Viewer */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="lg:col-span-3"
                    >
                        <Card className="overflow-hidden">
                            {renderAssetViewer()}
                        </Card>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
