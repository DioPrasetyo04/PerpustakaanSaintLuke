import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';
import { announcementsData, announcementsHeaderHome } from '@/data/data';
import { useLanguage } from '@/hooks/useLanguage';
import { useState } from 'react';

const AnnouncementsSection = () => {
    const { language } = useLanguage();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const header =
        language === 'id'
            ? announcementsHeaderHome.id
            : announcementsHeaderHome.en;

    const totalPages = Math.ceil(announcementsData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayAnnouncements = announcementsData.slice(startIndex, endIndex);
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
                    {displayAnnouncements.map((announcement, index) => (
                        <motion.div
                            key={announcement.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -8 }}
                        >
                            <Card className="flex h-full flex-col overflow-hidden transition-shadow hover:shadow-xl">
                                <div className="relative aspect-video overflow-hidden bg-gray-100">
                                    <ImageWithFallback
                                        src={announcement.imageUrl}
                                        alt={announcement.title}
                                        className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                                    />
                                </div>
                                <div className="flex flex-1 flex-col p-6">
                                    <div className="mb-2 text-sm text-gray-500">
                                        {announcement.date}
                                    </div>
                                    <h3 className="mb-2 font-['Poppins'] text-xl font-semibold text-gray-900">
                                        {announcement.title}
                                    </h3>
                                    <p className="mb-4 flex-1 text-gray-600">
                                        {announcement.description}
                                    </p>
                                    <Link
                                        href={`/announcements/${announcement.id}`}
                                    >
                                        <Button
                                            variant="link"
                                            className="p-0 text-primary"
                                        >
                                            Read More{' '}
                                            <ArrowRight className="ml-1 h-4 w-4" />
                                        </Button>
                                    </Link>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="mt-8 flex items-center justify-center gap-2">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() =>
                                setCurrentPage((prev) => Math.max(1, prev - 1))
                            }
                            disabled={currentPage === 1}
                            className="h-9 w-9"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>

                        {Array.from(
                            { length: totalPages },
                            (_, i) => i + 1,
                        ).map((page) => (
                            <Button
                                key={page}
                                variant={
                                    currentPage === page ? 'default' : 'outline'
                                }
                                size="sm"
                                onClick={() => setCurrentPage(page)}
                                className="h-9 w-9"
                            >
                                {page}
                            </Button>
                        ))}

                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() =>
                                setCurrentPage((prev) =>
                                    Math.min(totalPages, prev + 1),
                                )
                            }
                            disabled={currentPage === totalPages}
                            className="h-9 w-9"
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                )}

                <div className="mt-8 text-center">
                    <Link href="/announcements">
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
