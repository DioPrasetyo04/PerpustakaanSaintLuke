import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';
import { announcementsData, announcementsHeaderHome } from '@/data/data';
import { useLanguage } from '@/hooks/useLanguage';
import { useState } from 'react';
import { FeaturedInformationProps } from '@/types/HomePage/FeaturedHome';
import { useQueryParams } from '@/hooks/useQueryParams';
import { AnnouncementCard } from '@/components/component/Card/AnnouncementCard';
import Pagination from '@/components/component/Home/Pagination/Pagination';

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
        <section className="bg-gray-50 py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12 text-center"
                >
                    <h2 className="mb-4 font-['Poppins'] text-3xl font-bold text-gray-900 sm:text-4xl">
                        {header.title}
                    </h2>
                    <p className="mx-auto max-w-2xl text-gray-600">
                        {header.description}
                    </p>
                </motion.div>

                <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {informations.data.map((information, index) => (
                        <AnnouncementCard
                            key={information.id}
                            {...information}
                            index={index}
                        />
                    ))}
                </div>
                <Pagination
                    page={informations.meta.current_page}
                    total={informations.meta.total}
                    perPage={informations.meta.per_page}
                    onPageChange={onPageChange}
                    onPerPageChange={onPerPageChange}
                />

                <div className="mt-8 text-center">
                    <Link href="/informations">
                        <Button size="lg" variant="outline" className="group">
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
