import { ComponentType, Dispatch, SetStateAction } from 'react';
import { Lang } from './language';

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

export type NavItemSettingsAuth = {
    photo: string;
    name: string;
    menu: SubNavItemSettingsAuth[];
};

export type SubNavItemSettingsAuth = {
    id: number;
    icon: string;
    label: {
        id: string;
        en: string;
    };
    href: string;
};

export type NavAuth = {
    label: {
        id: string;
        en: string;
    };
    href: string;
    variant?: string;
};
export type NavbarProps = {
    isScrolled: boolean;
    mobileMenuOpen: boolean;
    setMobileMenuOpen: Dispatch<SetStateAction<boolean>>;
};

export type NavbarDesktopProps = {
    navItems: NavItem[];
    navAuthItems: NavAuth;
    profileAuth: NavItemSettingsAuth | null;
    isAuthenticated: boolean;
    isScrolled: boolean;
    activeSection: string;
    language: string;
};

export type NavbarMobileProps = {
    navItems: NavItem[];
    navAuthItems: NavAuth;
    profileAuth: NavItemSettingsAuth | null;
    isAuthenticated: boolean;
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
    language: Lang;
    label: string;
    code: string;
    flag: ComponentType<{ className?: string }>;
};
