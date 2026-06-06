import { ImageWithFallback } from '@/components/common/ImageWithFallback';
import Pagination from '@/components/component/Home/Pagination/Pagination';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/hooks/useLanguage';
import { useDebounce } from '@/hooks/useDebounce';
import { formattedDate, stripHtml } from '@/lib/utils';
import type { InformationPageType } from '@/types/InformationPage/Information';
import { Link, router, usePage } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Calendar } from 'lucide-react';
import {
    CatalogHeader,
    CatalogSearch,
    SortToggle,
} from '@/components/component/Catalog/CatalogShell';

function InformationsPage() {
    const { language } = useLanguage();
    const { informationsData, state } = usePage<InformationPageType>().props;
    const perPage = informationsData.meta?.per_page ?? 10;

    const [search, setSearch] = useState(state?.search || '');
    const debounceSearch = useDebounce(search, 400);
    // Urut judul A–Z (asc) / Z–A (desc). null = default (terbaru).
    const [sortDir, setSortDir] = useState<'asc' | 'desc' | null>(null);

    const buildParams = (page: number, load: number) => ({
        search: debounceSearch || undefined,
        informations_page: page,
        informations_load: load,
        ...(sortDir ? { field: 'name', direction: sortDir } : {}),
    });

    // Search/sort → kembali ke halaman 1 (lewati mount pertama).
    const firstRender = useRef(true);
    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }
        router.get(route('announcements.index'), buildParams(1, perPage), {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debounceSearch, sortDir]);

    const onPageChange = (page: number) =>
        router.get(route('announcements.index'), buildParams(page, perPage), {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });

    const onPerPageChange = (load: number) =>
        router.get(route('announcements.index'), buildParams(1, load), {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    return (
        <div className="min-h-screen bg-background py-8">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <CatalogHeader
                    eyebrow={language === 'id' ? 'Berita' : 'News'}
                    title={
                        language === 'id'
                            ? 'Kabar & Pengumuman Perpustakaan'
                            : 'Library News & Announcements'
                    }
                    count={informationsData.meta?.total}
                    subtitle={
                        language === 'id'
                            ? 'Ikuti kabar koleksi baru, acara klub baca, dan pengumuman terkini.'
                            : 'Stay updated with the latest news, book club events, and announcements.'
                    }
                />

                <CatalogSearch
                    placeholder={
                        language === 'id'
                            ? 'Cari berita atau pengumuman…'
                            : 'Search news or announcements…'
                    }
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    trailing={
                        <SortToggle
                            direction={sortDir}
                            onChange={setSortDir}
                            language={language}
                        />
                    }
                />

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {informationsData.data.map((information, index) => (
                        <motion.div
                            key={information.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -8 }}
                        >
                            <Card className="flex h-full flex-col overflow-hidden transition-shadow hover:shadow-xl">
                                {/* Image */}
                                <div className="relative aspect-video overflow-hidden bg-muted">
                                    <ImageWithFallback
                                        src={information.image}
                                        alt={information.name}
                                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                    <div className="absolute top-3 right-3">
                                        <div
                                            key={information.category.id}
                                            className="flex gap-3 p-3"
                                        >
                                            <ImageWithFallback
                                                src={information.category.icon}
                                                alt={information.category.name}
                                                className="h-8 w-8 object-cover object-center"
                                            />
                                            <Badge className="bg-brass-lt text-brass">
                                                {information.category.name}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex flex-1 flex-col p-6">
                                    <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
                                        <Calendar className="h-4 w-4" />
                                        <span>
                                            {formattedDate(
                                                information.created_at,
                                                language,
                                            )}
                                        </span>
                                    </div>

                                    <h3 className="mb-3 font-display text-xl font-semibold text-foreground">
                                        {information.name}
                                    </h3>

                                    <p className="mb-4 line-clamp-3 flex-1 text-muted-foreground">
                                        {stripHtml(information.description)}
                                    </p>

                                    <Link
                                        href={`/information/detail/${information.slug}`}
                                    >
                                        <Button
                                            variant="link"
                                            className="group justify-start p-0 text-primary"
                                        >
                                            Read More
                                            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                        </Button>
                                    </Link>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* Pagination */}
                {informationsData.meta.total >
                    informationsData.meta.per_page && (
                    <Pagination
                        page={informationsData.meta.current_page}
                        total={informationsData.meta.total}
                        perPage={informationsData.meta.per_page}
                        onPageChange={onPageChange}
                        onPerPageChange={onPerPageChange}
                    />
                )}
            </div>
        </div>
    );
}

export default InformationsPage;
