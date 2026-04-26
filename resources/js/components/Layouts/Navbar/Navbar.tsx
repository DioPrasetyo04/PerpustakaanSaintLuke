import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { router } from '@inertiajs/react';
import { navAuthItems, navItems, profileSubNavItems } from '@/data/data';
import { useScrollToSection } from '@/hooks/useScrollToSection';
import { useLanguage } from '@/hooks/useLanguage';
import NavbarLogo from './NavbarLogo';
import NavbarDesktop from './NavbarDekstop';
import NavbarMobile from './NavbarMobile';
import { useScroll } from '@/hooks/useScroll';
import { useActiveScroll } from '@/hooks/useActiveScroll';
import type { NavItemSettingsAuth } from '@/types/navbar';

const Navbar = ({ initialAuth }: { initialAuth?: any }) => {
    const [auth, setAuth] = useState<any>(initialAuth ?? null);

    useEffect(() => {
        // Listen for Inertia page navigations to keep auth in sync
        const removeListener = router.on('navigate', (event) => {
            const pageAuth = (event.detail.page.props as any).auth;
            setAuth(pageAuth ?? null);
        });

        return removeListener;
    }, []);

    const isAuthenticated = !!auth?.user;

    const profileAuth: NavItemSettingsAuth | null = isAuthenticated
        ? {
              photo: auth.user.avatar
                  ? `/storage/${auth.user.avatar}`
                  : '/assets/images/default-avatar.png',
              name: auth.user.name,
              menu: profileSubNavItems,
          }
        : null;

    const { isScrolled } = useScroll();
    const { activeSection } = useActiveScroll();
    const { scrollToSection } = useScrollToSection();
    const { language } = useLanguage();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const isActive = (path: string) => location.pathname === path;

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
        return () => document.body.classList.remove('overflow-hidden');
    }, [mobileMenuOpen]);

    // Close mobile menu on desktop resize
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setMobileMenuOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className={`fixed top-0 right-0 left-0 transition-all duration-500 ${
                    mobileMenuOpen ? 'z-30' : 'z-50'
                } ${
                    isScrolled
                        ? 'border-b border-[#E5E7EB]/50 bg-white p-7 shadow-lg backdrop-blur-xl'
                        : 'bg-tranparent p-5'
                }`}
            >
                <div className="container mx-auto max-w-full px-4 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 w-full items-center justify-between">
                        {/* Logo */}
                        <div className="z-10 flex-shrink-0">
                            <NavbarLogo
                                scrollToSection={scrollToSection}
                                isScrolled={isScrolled}
                            />
                        </div>

                        {/* Desktop Nav */}
                        <div className="z-999 hidden w-full flex-1 justify-end lg:flex">
                            <NavbarDesktop
                                navItems={navItems}
                                navAuthItems={navAuthItems}
                                profileAuth={profileAuth}
                                isAuthenticated={isAuthenticated}
                                isScrolled={isScrolled}
                                activeSection={activeSection}
                                language={language}
                            />
                        </div>

                        {/* Mobile Hamburger */}
                        <button
                            aria-label={
                                mobileMenuOpen ? 'Tutup menu' : 'Buka menu'
                            }
                            className={`rounded-lg p-2 transition-colors lg:hidden ${
                                isScrolled
                                    ? 'text-gray-700 hover:bg-gray-100'
                                    : 'text-white hover:bg-white/10'
                            }`}
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <NavbarMobile
                    navItems={navItems}
                    navAuthItems={navAuthItems}
                    profileAuth={profileAuth}
                    isAuthenticated={isAuthenticated}
                    isMenuOpen={mobileMenuOpen}
                    setIsMenuOpen={setMobileMenuOpen}
                    isActive={isActive}
                    activeSection={activeSection}
                    language={language}
                />
            </motion.nav>

            {/* Backdrop overlay for mobile menu */}
            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 z-20 bg-black/30 backdrop-blur-sm lg:hidden"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}
        </>
    );
};

export default Navbar;
