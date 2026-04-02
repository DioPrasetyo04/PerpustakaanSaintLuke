import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '@/components/ui/SectionHeaderVariants';
import { useLanguage } from '@/hooks/useLanguage';
import { featureBookHeaderHome, featuredBooksDataHome } from '@/data/data';
import BookCard from '@/components/component/BookCard/BookCard';
import Pagination from '@/components/component/Pagination/Pagination';

const FeatureBooks = () => {
    const { language } = useLanguage();
    const text =
        language === 'id' ? featureBookHeaderHome.id : featureBookHeaderHome.en;

    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(1);

    const start = (page - 1) * perPage;
    const end = start + perPage;

    const paginatedBooks = featuredBooksDataHome.slice(start, end);

    return (
        <section className="bg-white py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <SectionHeader
                    title={text.title}
                    subtitle={text.subtitle}
                    hover="lift"
                />
                <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {paginatedBooks.map((book) => (
                        <BookCard key={book.id} {...book} />
                    ))}
                </div>

                <Pagination
                    page={page}
                    total={featuredBooksDataHome.length}
                    perPage={perPage}
                    onPageChange={setPage}
                    onPerPageChange={(val) => {
                        setPage(1);
                        setPerPage(val);
                    }}
                />
            </div>
        </section>
    );
};

export default FeatureBooks;
