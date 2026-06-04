import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { faqItemType } from '@/types/DataTypes/faqtype';

interface FAQAccordionListProps {
    faqs: faqItemType[];
}

export function FAQAccordionList({ faqs }: FAQAccordionListProps) {
    const [openId, setOpenId] = useState<number | null>(null);

    const toggleFAQ = (id: number) => {
        setOpenId((current) => (current === id ? null : id));
    };

    return (
        <div className="space-y-4">
            {faqs.map((faq, index) => {
                const isOpen = openId === faq.id;
                return (
                    <motion.div
                        key={faq.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.08 }}
                    >
                        <div
                            className={cn(
                                'theme-transition overflow-hidden rounded-2xl border backdrop-blur-sm transition-all duration-300',
                                isOpen
                                    ? 'border-brand/50 bg-card shadow-lg shadow-brand/5'
                                    : 'border-border bg-card/60 hover:border-brand/30 hover:shadow-md',
                            )}
                        >
                            <button
                                type="button"
                                onClick={() => toggleFAQ(faq.id)}
                                aria-expanded={isOpen}
                                className="group flex w-full items-center justify-between gap-4 p-6 text-left"
                            >
                                <h3
                                    className={cn(
                                        'font-poppins text-base font-semibold transition-colors sm:text-lg',
                                        isOpen
                                            ? 'text-brand'
                                            : 'text-foreground group-hover:text-brand',
                                    )}
                                >
                                    {faq.question}
                                </h3>

                                <motion.span
                                    animate={{ rotate: isOpen ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                    className={cn(
                                        'flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors',
                                        isOpen
                                            ? 'bg-brand/15 text-brand'
                                            : 'bg-muted text-muted-foreground group-hover:text-brand',
                                    )}
                                >
                                    <ChevronDown className="h-4 w-4" />
                                </motion.span>
                            </button>

                            <AnimatePresence initial={false}>
                                {isOpen && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                                        className="overflow-hidden"
                                    >
                                        <p className="px-6 pt-1 pb-6 leading-relaxed text-muted-foreground">
                                            {faq.answer}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
}
