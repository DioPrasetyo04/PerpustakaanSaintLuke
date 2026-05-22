import { Link, router } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { categoriesHeaderHome, CategoriesData } from '@/data/data';
import { useLanguage } from '@/hooks/useLanguage';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FeaturedCategoriesProps } from '@/types/HomePage/FeaturedHome';
import { CategoriesCard } from '@/components/component/Card/CategoriesCard';
import Pagination from '@/components/component/Home/Pagination/Pagination';
import { useQueryParams } from '@/hooks/useQueryParams';
import { route } from 'ziggy-js';

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
        <section className="bg-white py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12 text-center"
                >
                    <h2 className="mb-4 font-['Poppins'] text-3xl font-bold text-gray-900 sm:text-4xl">
                        {text.title}
                    </h2>
                    <p className="mx-auto max-w-2xl text-gray-600">
                        {text.description}
                    </p>
                </motion.div>

                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
                    {categories.data.map((category) => (
                        // <motion.div
                        //     key={category.id}
                        //     initial={{ opacity: 0, scale: 0.8 }}
                        //     whileInView={{ opacity: 1, scale: 1 }}
                        //     viewport={{ once: true }}
                        //     transition={{ delay: index * 0.1 }}
                        //     whileHover={{ scale: 1.05 }}
                        // >
                        //     <Link href="/categories">
                        //         <Card className="cursor-pointer p-6 text-center transition-shadow hover:shadow-lg">
                        //             <div className="mb-3 text-4xl">
                        //                 {category?.icon}
                        //             </div>
                        //             <h3 className="mb-2 font-semibold text-gray-900">
                        //                 {category.name}
                        //             </h3>
                        //             {/* <Badge
                        //                 className={
                        //                     category.color ||
                        //                     'bg-gray-100 text-gray-700'
                        //                 }
                        //             >
                        //                 {category.count_book}{' '}
                        //                 {language === 'id' ? 'buku' : 'books'}
                        //             </Badge> */}
                        //         </Card>
                        //     </Link>
                        // </motion.div>
                        <CategoriesCard
                            key={category.id}
                            {...category}
                            href={route('catalog.category.books', {
                                slug: category.slug,
                            })}
                        />
                    ))}
                </div>
                {categories.data.length > 0 ||
                    (categories.meta.last_page > 1 && (
                        <Pagination
                            page={categories.meta.current_page}
                            total={categories.meta.total}
                            perPage={categories.meta.per_page}
                            onPageChange={onPageChange}
                            onPerPageChange={onPerPageChange}
                        />
                    ))}
            </div>
        </section>
    );
};

export default Categories;
