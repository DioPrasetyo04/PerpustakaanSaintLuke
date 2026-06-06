import { motion } from 'framer-motion';
import { Link } from '@inertiajs/react';
import { Building2, MapPin, ArrowUpRight, BookOpen } from 'lucide-react';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';
import { useLanguage } from '@/hooks/useLanguage';

type PublisherCardProps = {
    id: number;
    logo?: string;
    name: string;
    address?: string;
    count_of_books?: number;
    onHandlePublisherClick?: string;
};

export const PublisherCard = ({
    logo,
    name,
    address,
    count_of_books,
    onHandlePublisherClick,
}: PublisherCardProps) => {
    const { language } = useLanguage();

    return (
        <motion.div
            whileHover={{ y: -6 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            className="h-full"
        >
            <Link
                href={onHandlePublisherClick ?? '#'}
                className="hairline group flex h-full flex-col rounded-xl2 border bg-card p-5 transition-all duration-300 hover:border-cobalt/40 hover:shadow-lift dark:bg-night-2"
            >
                {/* Header: logo + nama + alamat */}
                <div className="flex items-start gap-4">
                    <div className="grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-xl border border-border bg-white dark:bg-night-3">
                        {logo ? (
                            <ImageWithFallback
                                src={logo}
                                alt={name}
                                loading="lazy"
                                className="h-full w-full object-contain p-1.5"
                            />
                        ) : (
                            <Building2 className="h-6 w-6 text-muted-foreground" />
                        )}
                    </div>

                    <div className="min-w-0 flex-1">
                        <h3 className="line-clamp-2 font-display text-base leading-snug font-bold text-foreground transition-colors group-hover:text-cobalt dark:group-hover:text-cobalt-lt">
                            {name}
                        </h3>
                        {address ? (
                            <p className="mt-1.5 flex items-center gap-1 text-xs text-muted-foreground">
                                <MapPin className="h-3.5 w-3.5 shrink-0" />
                                <span className="truncate">{address}</span>
                            </p>
                        ) : null}
                    </div>

                    <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cobalt dark:group-hover:text-cobalt-lt" />
                </div>

                {/* Footer: jumlah publikasi */}
                <div className="hairline mt-5 flex items-center justify-between border-t pt-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-cobalt-50 px-3 py-1 text-xs font-semibold text-cobalt dark:bg-cobalt/15 dark:text-cobalt-lt">
                        <BookOpen className="h-3.5 w-3.5" />
                        <span className="tabnum">{count_of_books ?? 0}</span>
                        {language === 'id' ? 'publikasi' : 'publications'}
                    </span>
                    <span className="tracking-editorial font-mono text-[10px] text-muted-foreground uppercase opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        {language === 'id' ? 'Lihat' : 'View'}
                    </span>
                </div>
            </Link>
        </motion.div>
    );
};
