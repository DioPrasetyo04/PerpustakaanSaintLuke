import { ImageWithFallback } from '@/components/common/ImageWithFallback';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/hooks/useLanguage';
import { formattedDate } from '@/lib/utils';
import type { InformationProps } from '@/types/DataTypes/InformationProps';
import { Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar } from 'lucide-react';
import DOMPurify from 'dompurify';
import React from 'react';

export default function show() {
    const { language } = useLanguage();
    const { detailInfo } = usePage<{ detailInfo: InformationProps }>().props;
    return (
        <div className="min-h-screen bg-background py-8">
            <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                {/* Back Button */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-6"
                >
                    <Link href="/informations">
                        <Button variant="ghost" className="group">
                            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                            Back to Informations
                        </Button>
                    </Link>
                </motion.div>

                {/* Main Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <Card className="overflow-hidden">
                        {/* Hero Image */}
                        <div className="relative aspect-[21/9] overflow-hidden bg-muted">
                            <ImageWithFallback
                                src={detailInfo.image}
                                alt={detailInfo.name}
                                className="h-full w-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <div className="absolute right-6 bottom-6 left-6">
                                <Badge
                                    className={
                                        'mb-3 bg-brass-lt text-brass'
                                    }
                                >
                                    {detailInfo.category.name}
                                </Badge>
                                <h1 className="mb-2 font-display text-3xl font-bold text-white sm:text-4xl">
                                    {detailInfo.name}
                                </h1>
                                <div className="flex items-center gap-2 text-white/90">
                                    <Calendar className="h-4 w-4" />
                                    <span>
                                        {formattedDate(
                                            detailInfo.created_at,
                                            language,
                                        )}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-8 sm:p-12">
                            {/* Description — render konten RichEditor (HTML) sesuai tagnya */}
                            <div
                                className="prose prose-lg dark:prose-invert mb-8 max-w-none border-l-4 border-primary pl-6 leading-relaxed text-foreground [&_a]:text-primary [&_a]:underline [&_b]:font-bold [&_strong]:font-bold"
                                dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(
                                        detailInfo.description ?? '',
                                    ),
                                }}
                            />

                            {/* CTA */}
                            <div className="mt-8 flex items-center justify-between">
                                <Link href="/informations">
                                    <Button variant="outline">
                                        <ArrowLeft className="mr-2 h-4 w-4" />
                                        View All Informations
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}
