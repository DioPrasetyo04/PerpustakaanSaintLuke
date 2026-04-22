import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '@/components/ui/SectionHeaderVariants';
import { useLanguage } from '@/hooks/useLanguage';
import { featureBookHeaderHome, featuredBooksDataHome } from '@/data/data';
import BookCard from '@/components/component/Card/BookCard';
import Pagination from '@/components/component/Home/Pagination/Pagination';
import { FeaturedBookProps } from '@/types/HomePage/FeaturedHome';
import { router } from '@inertiajs/react';
import { useQueryParams } from '@/hooks/useQueryParams';

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
        <section className="bg-white py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <SectionHeader
                    title={text.title}
                    subtitle={text.subtitle}
                    hover="lift"
                />
                <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {books.data.map((book) => (
                        <BookCard key={book.id} {...book} />
                    ))}
                </div>

                <Pagination
                    page={books.meta.current_page}
                    total={books.meta.total}
                    perPage={books.meta.per_page}
                    onPageChange={onPageChange}
                    onPerPageChange={onPerPageChange}
                />
            </div>
        </section>
    );
};

export default FeatureBooks;
