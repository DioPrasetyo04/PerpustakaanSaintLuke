import { ImageWithFallback } from '@/components/common/ImageWithFallback';
import { Card } from '@/components/ui/card';
import type { CategoryProps } from '@/types/DataTypes/CategoryProps';
import { useLanguage } from '@/hooks/useLanguage';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export const CategoriesCard = ({
    name,
    icon,
    count_of_books,
    href,
}: CategoryProps) => {
    const { language } = useLanguage();

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ y: -6 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            className="h-full"
        >
            <Link href={href ?? '#'} className="block h-full">
                <Card className="group theme-transition relative h-full items-center gap-3 overflow-hidden rounded-2xl border bg-card p-6 text-center shadow-sm transition-all duration-300 hover:border-brand/50 hover:shadow-xl hover:shadow-brand/10">
                    {/* subtle hover glow */}
                    <div className="pointer-events-none absolute -top-10 -right-10 h-24 w-24 rounded-full bg-brand/20 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

                    <span className="absolute top-3 right-3 text-muted-foreground opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-hover:text-brand">
                        <ArrowUpRight className="h-4 w-4" />
                    </span>

                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/10 ring-1 ring-brand/15 transition-transform duration-300 group-hover:scale-110">
                        <ImageWithFallback
                            src={icon}
                            alt={name}
                            loading="lazy"
                            className="h-8 w-8 object-contain"
                        />
                    </div>

                    <h3 className="line-clamp-2 font-display text-sm font-semibold text-foreground transition-colors group-hover:text-brand">
                        {name}
                    </h3>

                    <span className="rounded-full bg-secondary px-3 py-0.5 text-xs font-medium text-secondary-foreground">
                        {count_of_books ?? 0} {language === 'id' ? 'buku' : 'books'}
                    </span>
                </Card>
            </Link>
        </motion.div>
    );
};
