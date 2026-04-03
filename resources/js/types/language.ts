export type Lang = 'id' | 'en';

export interface LanguageType {
    language: Lang;
    setLanguage: (lang: Lang) => void;
}
