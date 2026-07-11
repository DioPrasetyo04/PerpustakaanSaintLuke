import { LanguageType } from '@/interface/LanguageInterface';
import { Lang } from '@/types/language';
import { createContext, ReactNode, useState } from 'react';

export const LanguageContext = createContext<LanguageType | null>(null);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguageState] = useState<Lang>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('app_lang');
            if (saved === 'id' || saved === 'en') {
                return saved as Lang;
            }
        }
        return 'id';
    });

    const setLanguage = (lang: Lang) => {
        setLanguageState(lang);
        localStorage.setItem('app_lang', lang);
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};
