import { motion } from 'framer-motion';
import { LayoutGrid } from 'lucide-react';
import { route } from 'ziggy-js';
import { categoriesHeaderHome } from '@/data/data';
import { useLanguage } from '@/hooks/useLanguage';
import { CategoriesCard } from '@/components/component/Card/CategoriesCard';
import Carousel from '@/components/common/Carousel';
import Pagination from '@/components/component/Home/Pagination/Pagination';
import { useQueryParams } from '@/hooks/useQueryParams';
import type { FeaturedCategoriesProps } from '@/types/HomePage/FeaturedHome';
import type { CategoryProps } from '@/types/DataTypes/CategoryProps';

const Categories = ({ categories }: FeaturedCategoriesProps) => {
    const { language } = useLanguage();
    const text =
        language === 'id' ? categoriesHeaderHome.id : categoriesHeaderHome.en;

    const { createPagination } = useQueryParams();
    const { onPageChange, onPerPageChange } = createPagination(
        'categories',
        categories.meta.per_page,
    );

    return (
        <section className="theme-transition relative overflow-hidden bg-muted/40 py-20 dark:bg-white/2">
            <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12 text-center"
                >
                    <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-brand/20 bg-brand/10 px-3 py-1 text-xs font-semibold tracking-wide text-brand uppercase">
                        <LayoutGrid className="h-3.5 w-3.5" />
                        {language === 'id' ? 'Jelajahi' : 'Explore'}
                    </span>
                    <h2 className="font-poppins text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        {text.title}
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                        {text.description}
                    </p>
                </motion.div>

                {categories.data.length > 0 ? (
                    <Carousel<CategoryProps>
                        items={categories.data}
                        getKey={(category) => category.id}
                        ariaLabel={text.title}
                        spaceBetween={16}
                        renderItem={(category) => (
                            <CategoriesCard
                                {...category}
                                href={route('catalog.category.books', {
                                    slug: category.slug,
                                })}
                            />
                        )}
                        breakpoints={{
                            0: { slidesPerView: 2.2 },
                            480: { slidesPerView: 3 },
                            768: { slidesPerView: 4 },
                            1024: { slidesPerView: 6 },
                        }}
                    />
                ) : (
                    <p className="py-12 text-center text-muted-foreground">
                        {language === 'id'
                            ? 'Belum ada kategori.'
                            : 'No categories yet.'}
                    </p>
                )}

                {categories.meta.last_page > 1 && (
                    <Pagination
                        page={categories.meta.current_page}
                        total={categories.meta.total}
                        perPage={categories.meta.per_page}
                        onPageChange={onPageChange}
                        onPerPageChange={onPerPageChange}
                    />
                )}
            </div>
        </section>
    );
};

export default Categories;
