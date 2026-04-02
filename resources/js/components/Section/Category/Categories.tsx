import SectionHeader from '@/components/ui/SectionHeaderVariants';
import { categoriesHeaderHome } from '@/data/data';
import { useLanguage } from '@/hooks/useLanguage';
import React from 'react';

const Categories = () => {
    const { language } = useLanguage();
    const text =
        language === 'id' ? categoriesHeaderHome.id : categoriesHeaderHome.en;
    return (
        <section className="bg-white py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <SectionHeader
                    title={text.title}
                    subtitle={text.description}
                    hover="lift"
                />
            </div>
        </section>
    );
};

export default Categories;
