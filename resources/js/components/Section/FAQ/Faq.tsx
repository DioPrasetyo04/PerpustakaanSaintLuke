import { FAQAccordionList } from '@/components/component/FAQ/FAQAccordionList';
import FAQHeaderSection from '@/components/component/FAQ/FAQHeaderSection';
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
        <section className="bg-white py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <FAQHeaderSection data={header} />

                <div className="mx-auto max-w-4xl">
                    <FAQAccordionList faqs={mappedFaqs} />
                </div>
            </div>
        </section>
    );
};

export default Faq;
