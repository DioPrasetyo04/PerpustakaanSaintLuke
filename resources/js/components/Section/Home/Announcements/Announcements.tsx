import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowRight, Megaphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { announcementsHeaderHome } from '@/data/data';
import { useLanguage } from '@/hooks/useLanguage';
import { useQueryParams } from '@/hooks/useQueryParams';
import { AnnouncementCard } from '@/components/component/Card/AnnouncementCard';
import Carousel from '@/components/common/Carousel';
import Pagination from '@/components/component/Home/Pagination/Pagination';
import type { FeaturedInformationProps } from '@/types/HomePage/FeaturedHome';
import type { InformationProps } from '@/types/DataTypes/InformationProps';

const AnnouncementsSection = ({ informations }: FeaturedInformationProps) => {
    const { language } = useLanguage();
    const header =
        language === 'id'
            ? announcementsHeaderHome.id
            : announcementsHeaderHome.en;

    const { createPagination } = useQueryParams();
    const { onPageChange, onPerPageChange } = createPagination(
        'informations',
        informations.meta.per_page,
    );

    return (
        <section className="theme-transition relative overflow-hidden bg-background py-20">
            <div className="pointer-events-none absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/5 blur-3xl" />

            <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12 text-center"
                >
                    <span className="mb-4 inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-editorial text-cobalt dark:text-cobalt-lt">
                        <Megaphone className="h-3.5 w-3.5" />
                        {language === 'id' ? 'Kabar Terbaru' : 'Latest News'}
                    </span>
                    <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        {header.title}
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                        {header.description}
                    </p>
                </motion.div>

                {informations.data.length > 0 ? (
                    <Carousel<InformationProps>
                        items={informations.data}
                        getKey={(info) => info.id}
                        ariaLabel={header.title}
                        autoplay={5000}
                        renderItem={(info) => <AnnouncementCard {...info} />}
                        breakpoints={{
                            0: { slidesPerView: 1.1 },
                            640: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                        }}
                    />
                ) : (
                    <p className="py-12 text-center text-muted-foreground">
                        {language === 'id'
                            ? 'Belum ada pengumuman.'
                            : 'No announcements yet.'}
                    </p>
                )}

                {informations.meta.last_page > 1 && (
                    <Pagination
                        page={informations.meta.current_page}
                        total={informations.meta.total}
                        perPage={informations.meta.per_page}
                        onPageChange={onPageChange}
                        onPerPageChange={onPerPageChange}
                    />
                )}

                <div className="mt-10 text-center">
                    <Link href="/informations">
                        <Button
                            size="lg"
                            variant="outline"
                            className="group rounded-full border-brand/30 text-foreground transition-all duration-300 hover:border-brand hover:bg-brand/5 hover:text-brand"
                        >
                            {language === 'id'
                                ? 'Lihat Semua Pengumuman'
                                : 'View All Announcements'}
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default AnnouncementsSection;
