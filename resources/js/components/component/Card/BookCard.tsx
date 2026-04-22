import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardDescription, CardTitle } from '../../ui/card';
import { Link } from '@inertiajs/react';
import { Badge } from '../../ui/badge';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/hooks/useLanguage';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { Button } from '../../ui/button';
import { BookProps } from '@/types/DataTypes/BooksProps';

const BookCard = ({
    title,
    slug,
    cover,
    status,
    authors,
    categories,
    synopsis,
}: BookProps) => {
    const { language } = useLanguage();
    const [isBookMarked, setIsBookMarked] = useState(false);
    const isAvailable = status === 'Tersedia';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
            className="group"
        >
            <div className="flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-md transition-shadow duration-300">
                {/* COVER */}
                <Link
                    href={`/book/${slug}`}
                    className="relative aspect-[3/4] overflow-hidden bg-gray-100"
                >
                    <img
                        src={cover ? `/storage/${cover}` : ''}
                        alt={`Cover ${title}`}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />

                    {/* badge */}
                    <div className="absolute top-2 left-2">
                        <Badge
                            variant={isAvailable ? 'default' : 'secondary'}
                            className={cn(
                                isAvailable ? 'available' : 'unavailable',
                                'px-3 py-2 text-xs',
                            )}
                        >
                            {isAvailable
                                ? language === 'id'
                                    ? 'Tersedia'
                                    : 'Available'
                                : language === 'en'
                                  ? 'Unavailable'
                                  : 'Tidak Tersedia'}
                        </Badge>
                    </div>

                    {/* bookmark */}
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            setIsBookMarked(!isBookMarked);
                        }}
                        className="absolute top-2 right-2 rounded-full bg-white/90 p-2 backdrop-blur-sm transition-colors hover:bg-white"
                    >
                        {isBookMarked ? (
                            <BookmarkCheck className="h-4 w-4 fill-accent text-accent" />
                        ) : (
                            <Bookmark className="h-4 w-4 text-gray-600" />
                        )}
                    </button>
                </Link>

                {/* CONTENT */}
                <div className="flex flex-1 flex-col p-4">
                    <CardTitle className="mb-1 line-clamp-2 font-poppins text-lg text-gray-900 transition-colors group-hover:text-primary">
                        {title}
                    </CardTitle>

                    {synopsis && (
                        <CardDescription className="line-clamp-2 text-sm text-gray-600">
                            {synopsis}
                        </CardDescription>
                    )}

                    {/* author */}
                    <div className="flex items-center gap-2 p-3">
                        {authors.map((author) => (
                            <div
                                key={author.id}
                                className="mt-3 flex items-center gap-2"
                            >
                                <img
                                    src={
                                        author?.avatar
                                            ? `/storage/${author.avatar}`
                                            : ''
                                    }
                                    alt={author.name}
                                    className="h-8 w-8 rounded-full object-cover"
                                />
                                <p className="text-sm text-gray-600">
                                    {author?.name}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* categories */}
                    {/* {(categories?.length ?? 0) > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                            {categories?.map((category) => (
                                <Badge
                                    key={category.id}
                                    variant="secondary"
                                    className="flex items-center gap-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-2 py-1 text-white"
                                >
                                    {category.icon && (
                                        <img
                                            src={
                                                category.icon
                                                    ? `/storage/${category.icon}`
                                                    : ''
                                            }
                                            alt={category.name}
                                            className="h-4 w-4"
                                        />
                                    )}
                                    {category.name}
                                </Badge>
                            ))}
                        </div>
                    )} */}

                    {/* button */}
                    <Button
                        size="lg"
                        className="mt-auto w-full hover:bg-primary/90"
                        type="button"
                        disabled={!isAvailable}
                    >
                        {isAvailable
                            ? language === 'id'
                                ? 'Lihat Detail Buku'
                                : 'See Book Details'
                            : language === 'en'
                              ? 'Unavailable'
                              : 'Tidak Tersedia'}
                    </Button>
                </div>
            </div>
        </motion.div>
    );
};

export default BookCard;
