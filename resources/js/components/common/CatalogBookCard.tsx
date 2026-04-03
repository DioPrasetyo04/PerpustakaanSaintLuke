import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Star, Bookmark, BookmarkCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';
import { useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';

export interface CatalogBook {
    id: string;
    title: string;
    author: string;
    category: string;
    coverUrl: string;
    rating: number;
    available: boolean;
    year?: number;
    publisher?: string;
    language?: string;
}

export function CatalogBookCard({
    id,
    title,
    author,
    category,
    coverUrl,
    rating = 4.5,
    available,
}: CatalogBook) {
    const [isBookmarked, setIsBookmarked] = useState(false);
    const { language: lang } = useLanguage();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
            className="group"
        >
            <div className="flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-md transition-shadow duration-300 hover:shadow-xl">
                <Link
                    href={`/book/${id}`}
                    className="relative aspect-[3/4] overflow-hidden bg-gray-100"
                >
                    <ImageWithFallback
                        src={coverUrl}
                        alt={title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />

                    <div className="absolute top-2 left-2">
                        <Badge
                            variant={available ? 'default' : 'secondary'}
                            className={
                                available ? 'bg-green-500' : 'bg-red-500'
                            }
                        >
                            {available
                                ? lang === 'id'
                                    ? 'Tersedia'
                                    : 'Available'
                                : lang === 'id'
                                  ? 'Dipinjam'
                                  : 'Borrowed'}
                        </Badge>
                    </div>

                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            setIsBookmarked(!isBookmarked);
                        }}
                        className="absolute top-2 right-2 rounded-full bg-white/90 p-2 backdrop-blur-sm transition-colors hover:bg-white"
                    >
                        {isBookmarked ? (
                            <BookmarkCheck className="h-4 w-4 fill-accent text-accent" />
                        ) : (
                            <Bookmark className="h-4 w-4 text-gray-600" />
                        )}
                    </button>
                </Link>

                <div className="flex flex-1 flex-col p-4">
                    <Link href={`/book/${id}`}>
                        <h3 className="mb-1 line-clamp-2 font-['Poppins'] font-semibold text-gray-900 transition-colors group-hover:text-primary">
                            {title}
                        </h3>
                    </Link>

                    <p className="mb-2 text-sm text-gray-600">{author}</p>

                    <div className="mb-3 flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                            {category}
                        </Badge>
                    </div>

                    <div className="mb-4 flex items-center gap-1">
                        <Star className="h-4 w-4 fill-accent text-accent" />
                        <span className="text-sm font-medium text-gray-700">
                            {rating}
                        </span>
                    </div>

                    <Link href={`/book/${id}`} className="mt-auto">
                        <Button
                            className="w-full bg-primary hover:bg-primary/90"
                            disabled={!available}
                        >
                            {available
                                ? lang === 'id'
                                    ? 'Pinjam Buku'
                                    : 'Borrow Book'
                                : lang === 'id'
                                  ? 'Tidak Tersedia'
                                  : 'Not Available'}
                        </Button>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}
