import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { router } from '@inertiajs/react';

type AuthorProps = {
    id: number;
    avatar?: string;
    name?: string;
    speciality?: number;
    count_of_books?: number;
    onHandleAuthorClick?: string;
};

export const AuthorsCard = ({
    id,
    avatar,
    name,
    speciality,
    count_of_books,
    onHandleAuthorClick,
}: AuthorProps) => {
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
                className="cursor-pointer border-2 p-6 transition-shadow hover:border-primary hover:shadow-xl"
                onClick={() => router.visit(onHandleAuthorClick!)}
            >
                <div className="text-center">
                    <img
                        src={avatar}
                        alt={name}
                        className="mx-auto mb-4 h-24 w-24 rounded-full border-4 border-primary/20 object-cover"
                    />
                    <h3 className="mb-1 font-display text-lg font-bold text-foreground">
                        {name}
                    </h3>
                    <p className="mb-2 text-sm text-muted-foreground">{speciality}</p>
                    <Badge
                        variant="outline"
                        className="border-primary text-primary"
                    >
                        {count_of_books ?? 0} Books
                    </Badge>
                </div>
            </Card>
        </motion.div>
    );
};
