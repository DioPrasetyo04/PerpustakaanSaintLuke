import { motion } from 'framer-motion';
import { HelpCircle } from 'lucide-react';

type FAQHeaderSectionProps = {
    data: {
        title: string;
        subtitle: string;
    };
};

const FAQHeaderSection = ({ data }: FAQHeaderSectionProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
        >
            <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-brand/20 bg-brand/10 px-3 py-1 text-xs font-semibold tracking-wide text-brand uppercase">
                <HelpCircle className="h-3.5 w-3.5" />
                FAQ
            </span>
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {data.title}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                {data.subtitle}
            </p>
        </motion.div>
    );
};

export default FAQHeaderSection;
