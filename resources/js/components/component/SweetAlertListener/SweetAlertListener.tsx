import { useEffect, useRef } from 'react';
import { router } from '@inertiajs/react';
import Swal from 'sweetalert2';
import { useLanguage } from '@/hooks/useLanguage';
import type { FlashProps, PageProps } from '@/types';

type Props = {
    initialFlash: FlashProps | null;
};

export default function SweetAlertListener({ initialFlash }: Props) {
    const { language } = useLanguage();
    const lastTriggeredRef = useRef<string | null>(null);

    const triggerAlert = (successMsg: string) => {
        if (successMsg === 'login_success') {
            const title = language === 'id' ? 'Berhasil Login!' : 'Success Login!';
            const text = language === 'id' 
                ? 'Selamat datang kembali di E-Library Santo Lukas.' 
                : 'Welcome back to E-Library Santo Lukas.';

            Swal.fire({
                title: title,
                text: text,
                icon: 'success',
                confirmButtonText: 'OK',
                confirmButtonColor: '#10b981', // emerald green matching the theme
                timer: 3000,
                timerProgressBar: true,
                customClass: {
                    popup: 'dark:bg-night-2 dark:text-white rounded-2xl border dark:border-border shadow-2xl',
                    title: 'dark:text-white font-bold',
                    htmlContainer: 'dark:text-muted-foreground',
                }
            });
        }

        if (successMsg === 'logout_success') {
            const title = language === 'id' ? 'Berhasil Logout!' : 'Logout Successful!';
            const text = language === 'id'
                ? 'Anda telah berhasil keluar dari akun Anda.'
                : 'You have been successfully logged out of your account.';

            Swal.fire({
                title: title,
                text: text,
                icon: 'success',
                confirmButtonText: 'OK',
                confirmButtonColor: '#10b981',
                timer: 3000,
                timerProgressBar: true,
                showConfirmButton: false,
                customClass: {
                    popup: 'dark:bg-night-2 dark:text-white rounded-2xl border dark:border-border shadow-2xl',
                    title: 'dark:text-white font-bold',
                    htmlContainer: 'dark:text-muted-foreground',
                }
            });
        }
    };

    useEffect(() => {
        // Check initial flash on mount
        if (initialFlash?.success && lastTriggeredRef.current !== initialFlash.success) {
            triggerAlert(initialFlash.success);
            lastTriggeredRef.current = initialFlash.success;
        }

        // Listen for subsequent page navigations
        const remove = router.on('navigate', (event) => {
            const pageProps = event.detail.page.props as PageProps;
            const flash = pageProps.flash ?? null;
            if (flash?.success && lastTriggeredRef.current !== flash.success) {
                triggerAlert(flash.success);
                lastTriggeredRef.current = flash.success;
            }
        });

        return remove;
    }, [language]);

    return null;
}
