import { Lang, LanguageType } from '@/types/language';
import { createContext, ReactNode, useState } from 'react';

export const LanguageContext = createContext<LanguageType | null>(null);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguage] = useState<Lang>('id');

    return (
        <LanguageContext.Provider value={{ language, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};
