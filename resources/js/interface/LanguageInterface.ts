import { Lang } from '@/types/language';

export interface LanguageType {
    language: Lang;
    setLanguage: (lang: Lang) => void;
}
