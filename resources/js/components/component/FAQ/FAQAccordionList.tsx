import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { faqItemType } from '@/types/faqtype';

interface FAQAccordionListProps {
    faqs: faqItemType[];
}

export function FAQAccordionList({ faqs }: FAQAccordionListProps) {
    const [openId, setOpenId] = useState<number | null>(null);
    const [timeoutId, setTimeoutId] = useState<ReturnType<
        typeof setTimeout
    > | null>(null);

    const toggleFAQ = (id: number) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <div className="space-y-4">
            {faqs.map((faq, index) => (
                <motion.div
                    key={faq.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                >
                    <Card
                        className={`overflow-hidden transition-all duration-300 ${
                            openId === faq.id
                                ? 'border-2 border-primary shadow-lg'
                                : 'border border-gray-200 hover:border-gray-300 hover:shadow-md'
                        }`}
                    >
                        <button
                            onClick={() => toggleFAQ(faq.id)}
                            onMouseEnter={() => {
                                if (timeoutId) clearTimeout(timeoutId);
                                setOpenId(faq.id);
                            }}
                            onMouseLeave={() => {
                                const id = setTimeout(() => {
                                    setOpenId(null);
                                }, 150);

                                setTimeoutId(id);
                            }}
                            className="group flex w-full items-center justify-between gap-4 p-6 text-left"
                        >
                            <h3
                                className={`text-lg font-semibold ${
                                    openId === faq.id
                                        ? 'text-primary'
                                        : 'text-gray-900 group-hover:text-primary'
                                }`}
                            >
                                {faq.question}
                            </h3>

                            <motion.div
                                animate={{
                                    rotate: openId === faq.id ? 180 : 0,
                                }}
                                transition={{ duration: 0.3 }}
                            >
                                <ChevronDown className="h-5 w-5" />
                            </motion.div>
                        </button>

                        <AnimatePresence>
                            {openId === faq.id && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                >
                                    <div className="px-6 pt-2 pb-6">
                                        <p className="text-gray-600">
                                            {faq.answer}
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </Card>
                </motion.div>
            ))}
        </div>
    );
}
