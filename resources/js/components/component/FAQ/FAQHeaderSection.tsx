import React from 'react';

import { motion } from 'framer-motion';

type FAQHeaderSection = {
    data: {
        title: string;
        subtitle: string;
    };
};

const FAQHeaderSection = ({ data }: FAQHeaderSection) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
        >
            <h2 className="mb-4 font-['Poppins'] text-3xl font-bold text-gray-900 sm:text-4xl">
                {data.title}
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600">{data.subtitle}</p>
        </motion.div>
    );
};

export default FAQHeaderSection;
