import { LanguageContext } from '@/context/LanguageContext';
import { useContext } from 'react';

export const useLanguage = () => {
    const context = useContext(LanguageContext);

    if (!context) {
        throw new Error('Use Language must be used inside LanguageProvider');
    }

    return context;
};
