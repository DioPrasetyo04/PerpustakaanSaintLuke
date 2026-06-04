import { FAQAccordionList } from '@/components/component/Home/FAQ/FAQAccordionList';
import FAQHeaderSection from '@/components/component/Home/FAQ/FAQHeaderSection';
import { faqHeader, faqs } from '@/data/data';
import { useLanguage } from '@/hooks/useLanguage';
import { useMemo } from 'react';

const Faq = () => {
    const { language } = useLanguage();

    const mappedFaqs = useMemo(() => {
        return faqs.map((faq) => ({
            id: faq.id,
            question: faq.question[language],
            answer: faq.answer[language],
        }));
    }, [language]);

    const header = useMemo(
        () => ({
            title: faqHeader[language].title,
            subtitle: faqHeader[language].description,
        }),
        [language],
    );

    return (
        <section className="theme-transition relative overflow-hidden bg-muted/40 py-20 dark:bg-white/2">
            <div className="pointer-events-none absolute top-1/3 -left-24 h-72 w-72 rounded-full bg-brand/10 blur-3xl" />
            <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
                <FAQHeaderSection data={header} />

                <div className="mx-auto max-w-4xl">
                    <FAQAccordionList faqs={mappedFaqs} />
                </div>
            </div>
        </section>
    );
};

export default Faq;
