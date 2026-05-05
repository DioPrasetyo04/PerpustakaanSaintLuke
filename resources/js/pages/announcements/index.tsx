import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';
import { Footer } from '@/components/Layouts/Footer/Footer';
import { useLanguage } from '@/hooks/useLanguage';

const getCategoryColor = (category: string) => {
    switch (category) {
        case 'Events':
            return 'bg-purple-100 text-purple-700';
        case 'New Resources':
            return 'bg-green-100 text-green-700';
        case 'Updates':
            return 'bg-blue-100 text-blue-700';
        case 'Notice':
            return 'bg-amber-100 text-amber-700';
        default:
            return 'bg-gray-100 text-gray-700';
    }
};

export default function AnnouncementsPage() {
    const { language } = useLanguage();

    const t = {
        title:
            language === 'id'
                ? 'Pengumuman Perpustakaan'
                : 'Library Announcements',
        subtitle:
            language === 'id'
                ? 'Tetap update dengan berita dan acara terbaru'
                : 'Stay updated with the latest news and events',
        readMore: language === 'id' ? 'Baca Selengkapnya' : 'Read More',
    };

    return (
        <>
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <h1 className="mb-2 font-['Poppins'] text-3xl font-bold text-gray-900 sm:text-4xl">
                            {t.title}
                        </h1>
                        <p className="text-gray-600">{t.subtitle}</p>
                    </motion.div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {announcementsData.map((announcement, index) => (
                            <motion.div
                                key={announcement.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -8 }}
                            >
                                <Card className="flex h-full flex-col overflow-hidden transition-shadow hover:shadow-xl">
                                    {/* Image */}
                                    <div className="relative aspect-video overflow-hidden bg-gray-100">
                                        <ImageWithFallback
                                            src={announcement.imageUrl}
                                            alt={
                                                language === 'id'
                                                    ? announcement.title.id
                                                    : announcement.title.en
                                            }
                                            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                                        />
                                        <div className="absolute top-3 right-3">
                                            <Badge
                                                className={getCategoryColor(
                                                    announcement.category,
                                                )}
                                            >
                                                {announcement.category}
                                            </Badge>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="flex flex-1 flex-col p-6">
                                        <div className="mb-3 flex items-center gap-2 text-sm text-gray-500">
                                            <Calendar className="h-4 w-4" />
                                            <span>{announcement.date}</span>
                                        </div>

                                        <h3 className="mb-3 font-['Poppins'] text-xl font-semibold text-gray-900">
                                            {language === 'id'
                                                ? announcement.title.id
                                                : announcement.title.en}
                                        </h3>

                                        <p className="mb-4 line-clamp-3 flex-1 text-gray-600">
                                            {language === 'id'
                                                ? announcement.description.id
                                                : announcement.description.en}
                                        </p>

                                        <Button
                                            variant="link"
                                            className="group justify-start p-0 text-primary"
                                        >
                                            {t.readMore}
                                            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                        </Button>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
