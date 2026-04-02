import { Dispatch, SetStateAction } from 'react';

export type SubNavItem = {
    id: string;
    label: {
        id: string;
        en: string;
    };
    href: string;
};

export type NavItem = {
    id: string;
    label: {
        id: string;
        en: string;
    };
    href: string;
    menu?: SubNavItem[];
};

export type NavAuthItem = {
    id: string;
    label: {
        id: string;
        en: string;
    };
    href: string;
    variant?: 'ghost' | 'default';
};

export type NavbarProps = {
    isScrolled: boolean;
    mobileMenuOpen: boolean;
    setMobileMenuOpen: Dispatch<SetStateAction<boolean>>;
};

export type NavbarDesktopProps = {
    navItems: NavItem[];
    navAuthItems: NavAuthItem[];
    isScrolled: boolean;
    activeSection: string;
    language: string;
};

export type NavbarMobileProps = {
    navItems: NavItem[];
    navAuthItems: NavAuthItem[];
    isMenuOpen: boolean;
    setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
    isActive: (path: string) => boolean;
    activeSection: string;
    language: string;
};

export type NavbarLogoProps = {
    scrollToSection: (id: string) => void;
    isScrolled: boolean;
};

export type NavbarLanguageProps = {
    language: boolean;
    setLangugae: Dispatch<SetStateAction<boolean>>;
    isMenuOpen: boolean;
    setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
};

export type LanguageItem = {
    id: number;
    language: string;
    label: string;
};
