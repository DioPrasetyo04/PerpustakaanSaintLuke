import { ImageWithFallback } from '@/components/common/ImageWithFallback';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/hooks/useLanguage';
import { cn, formattedDate } from '@/lib/utils';
import type { InformationProps } from '@/types/DataTypes/InformationProps';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowRight, CalendarDays } from 'lucide-react';
import DOMPurify from 'dompurify';

export const AnnouncementCard = ({
    image,
    name,
    slug,
    description,
    category,
    created_at,
}: InformationProps) => {
    const { language } = useLanguage();

    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            whileHover={{ y: -8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            className="h-full"
        >
            <Link href={`/information/detail/${slug}`} className="block h-full">
                <Card className="group theme-transition flex h-full flex-col gap-0 overflow-hidden rounded-2xl border border-gray-200/80 bg-card p-0 shadow-sm transition-all duration-300 hover:border-brand/60 hover:shadow-2xl hover:shadow-brand/10 dark:border-white/10">
                    <div className="relative aspect-video overflow-hidden bg-muted">
                        <ImageWithFallback
                            src={image}
                            alt={name}
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/10 to-transparent" />
                        {category?.name && (
                            <Badge className="absolute top-3 left-3 rounded-full bg-brand px-2.5 py-1 text-brand-foreground shadow-lg">
                                {category.name}
                            </Badge>
                        )}
                    </div>

                    <div className="flex flex-1 flex-col p-6">
                        <div className="mb-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                            <CalendarDays className="h-3.5 w-3.5" />
                            {formattedDate(created_at ?? '', language)}
                        </div>

                        <h3 className="mb-2 line-clamp-2 font-poppins text-lg font-semibold text-foreground transition-colors group-hover:text-brand">
                            {name}
                        </h3>

                        <p
                            className="mb-4 line-clamp-2 flex-1 text-sm text-muted-foreground"
                            dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(description),
                            }}
                        />

                        <span
                            className={cn(
                                'mt-auto inline-flex items-center gap-1 text-sm font-semibold text-brand',
                            )}
                        >
                            {language === 'id' ? 'Selengkapnya' : 'Read More'}
                            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                    </div>
                </Card>
            </Link>
        </motion.article>
    );
};
