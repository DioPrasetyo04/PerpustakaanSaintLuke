import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { CategoryProps } from '@/types/HomePage/HomeType';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import React from 'react';

export const CategoriesCard = ({
    name,
    slug,
    icon,
    count_of_books,
    language,
}: CategoryProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
        >
            <Link href={`/categories/${slug}/books`}>
                <Card className="cursor-pointer p-6 text-center transition-shadow hover:shadow-lg">
                    <div className="mb-3 flex items-center text-4xl">
                        <img
                            src={icon ? `/storage/${icon}` : ''}
                            alt={name}
                            className="h-10 w-10 object-cover object-center"
                        />
                    </div>
                    <h3 className="mb-2 font-semibold text-gray-900">{name}</h3>
                    <Badge className={'bg-gray-100 text-gray-700'}>
                        {count_of_books} {language === 'id' ? 'buku' : 'books'}
                    </Badge>
                </Card>
            </Link>
        </motion.div>
    );
};
