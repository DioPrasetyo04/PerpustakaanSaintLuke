export type faqType = faqDataType[];

export type faqDataType = {
    id: number;
    question: {
        id: string;
        en: string;
    };
    answer: {
        id: string;
        en: string;
    };
};

export type faqItemType = {
    id: number;
    question: string;
    answer: string;
};

export type faqHeaderType = {
    id: {
        title: string;
        description: string;
    };
    en: {
        title: string;
        description: string;
    };
};
