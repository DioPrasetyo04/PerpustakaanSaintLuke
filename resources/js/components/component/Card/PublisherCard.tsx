import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { router } from '@inertiajs/react';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';
import { MdLocationCity } from 'react-icons/md';
import { Badge } from '@/components/ui/badge';

type PublisherCardProps = {
    id: number;
    logo?: string;
    name: string;
    address?: string;
    count_of_books?: number;
    onHandlePublisherClick?: string;
};

export const PublisherCard = ({
    id,
    logo,
    name,
    address,
    count_of_books,
    onHandlePublisherClick,
}: PublisherCardProps) => {
    return (
        <motion.div
            key={id}
            whileHover={{ y: -8 }}
            transition={{
                type: 'spring',
                stiffness: 300,
            }}
        >
            <Card
                className="w-80 cursor-pointer border-2 p-6 transition-shadow hover:border-primary hover:shadow-xl"
                onClick={() => router.visit(onHandlePublisherClick!)}
            >
                <div className="flex items-start gap-4">
                    <ImageWithFallback
                        src={logo}
                        alt={name}
                        className="h-16 w-16 rounded-lg border-2 border-border object-cover"
                    />
                    <div className="flex-1">
                        <h3 className="mb-1 font-display text-lg font-bold text-foreground">
                            {name}
                        </h3>
                        <p className="mb-3 flex w-full items-center text-sm text-muted-foreground">
                            <MdLocationCity className="h-7 w-7" />
                            {address}
                        </p>
                        <Badge className="bg-primary text-white">
                            {count_of_books} Publications
                        </Badge>
                    </div>
                </div>
            </Card>
        </motion.div>
    );
};
