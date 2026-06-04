import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { featureBookHeaderHome } from '@/data/data';
import BookCard from '@/components/component/Card/BookCard';
import Carousel from '@/components/common/Carousel';
import Pagination from '@/components/component/Home/Pagination/Pagination';
import type { FeaturedBookProps } from '@/types/HomePage/FeaturedHome';
import { useQueryParams } from '@/hooks/useQueryParams';
import type { BookProps } from '@/types/DataTypes/BooksProps';

const FeatureBooks = ({ books }: FeaturedBookProps) => {
    const { language } = useLanguage();
    const text =
        language === 'id' ? featureBookHeaderHome.id : featureBookHeaderHome.en;

    const { createPagination } = useQueryParams();
    const { onPageChange, onPerPageChange } = createPagination(
        'books',
        books.meta.per_page,
    );

    return (
        <section className="theme-transition relative overflow-hidden bg-background py-20">
            {/* decorative glow */}
            <div className="pointer-events-none absolute top-0 -left-32 h-72 w-72 rounded-full bg-brand/10 blur-3xl dark:bg-brand/5" />
            <div className="pointer-events-none absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-amber-200/10 blur-3xl dark:bg-brand/5" />

            <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12 text-center"
                >
                    <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-brand/20 bg-brand/10 px-3 py-1 text-xs font-semibold tracking-wide text-brand uppercase">
                        <Sparkles className="h-3.5 w-3.5" />
                        {language === 'id' ? 'Pilihan Terbaik' : 'Top Picks'}
                    </span>
                    <h2 className="font-poppins text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        {text.title}
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                        {text.subtitle}
                    </p>
                </motion.div>

                {books.data.length > 0 ? (
                    <Carousel<BookProps>
                        items={books.data}
                        getKey={(book) => book.id}
                        ariaLabel={text.title}
                        renderItem={(book) => <BookCard {...book} />}
                        breakpoints={{
                            0: { slidesPerView: 1.15 },
                            480: { slidesPerView: 2 },
                            768: { slidesPerView: 3 },
                            1024: { slidesPerView: 4 },
                        }}
                    />
                ) : (
                    <p className="py-12 text-center text-muted-foreground">
                        {language === 'id'
                            ? 'Belum ada buku tersedia.'
                            : 'No books available yet.'}
                    </p>
                )}

                {books.meta.last_page > 1 && (
                    <Pagination
                        page={books.meta.current_page}
                        total={books.meta.total}
                        perPage={books.meta.per_page}
                        onPageChange={onPageChange}
                        onPerPageChange={onPerPageChange}
                    />
                )}
            </div>
        </section>
    );
};

export default FeatureBooks;
