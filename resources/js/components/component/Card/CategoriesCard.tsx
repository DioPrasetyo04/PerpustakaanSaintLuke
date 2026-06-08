import { ImageWithFallback } from '@/components/common/ImageWithFallback';
import type { CategoryProps } from '@/types/DataTypes/CategoryProps';
import { useLanguage } from '@/hooks/useLanguage';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowUpRight, LayoutGrid } from 'lucide-react';

export const CategoriesCard = ({
    name,
    icon,
    photo,
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
            <Link
                href={href ?? '#'}
                className="hairline group relative block aspect-[4/3] h-full overflow-hidden rounded-2xl border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand/50 hover:shadow-xl hover:shadow-brand/10"
            >
                {/* Foto kategori sebagai gambar utama kartu */}
                {photo ? (
                    <ImageWithFallback
                        src={photo}
                        alt={name}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-brand/25 via-card to-background" />
                )}

                {/* Scrim agar teks terbaca di atas foto */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-black/35" />

                {/* Ikon kategori — badge di pojok atas */}
                <div className="absolute top-3 left-3 grid h-11 w-11 place-items-center overflow-hidden rounded-xl bg-white/90 ring-1 ring-white/40 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110 dark:bg-night-3/85">
                    {icon ? (
                        <ImageWithFallback
                            src={icon}
                            alt={name}
                            loading="lazy"
                            className="h-7 w-7 object-contain"
                        />
                    ) : (
                        <LayoutGrid className="h-6 w-6 text-brand" />
                    )}
                </div>

                {/* Panah */}
                <span className="absolute top-3 right-3 grid h-8 w-8 place-items-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-all duration-300 group-hover:bg-brand">
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>

                {/* Nama + jumlah buku (overlay bawah) */}
                <div className="absolute inset-x-0 bottom-0 p-4 text-left">
                    <h3 className="line-clamp-2 font-display text-lg font-semibold text-white">
                        {name}
                    </h3>
                    <div className="mt-0.5 text-xs text-white/70">
                        <span className="tabnum font-medium text-white/90">
                            {count_of_books ?? 0}
                        </span>{' '}
                        {language === 'id' ? 'buku' : 'books'}
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};
