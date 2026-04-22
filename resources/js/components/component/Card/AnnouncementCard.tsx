import { ImageWithFallback } from '@/components/common/ImageWithFallback';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { formattedDate } from '@/lib/utils';
import { InformationProps } from '@/types/HomePage/HomeType';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import React from 'react';

export const AnnouncementCard = ({
    image,
    name,
    slug,
    description,
    categories,
    created_at,
    language,
    index,
}: InformationProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -8 }}
        >
            <div className="flex h-full flex-col overflow-hidden transition-shadow hover:shadow-xl">
                <div className="relative aspect-video overflow-hidden bg-gray-100">
                    <ImageWithFallback
                        src={image}
                        alt={name}
                        className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                </div>
                <div className="flex flex-1 flex-col p-6">
                    <div className="mb-2 text-sm text-gray-500">
                        {formattedDate(created_at, language)}
                    </div>
                    <h3 className="mb-2 font-['Poppins'] text-xl font-semibold text-gray-900">
                        {name}
                    </h3>
                    <p
                        className="mb-4 line-clamp-2 flex-1 text-gray-600"
                        dangerouslySetInnerHTML={{ __html: description }}
                    />
                    <Link href={`/announcements/${slug}`}>
                        <Button variant="link" className="p-0 text-primary">
                            Read More <ArrowRight className="ml-1 h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};
