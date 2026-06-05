import { InertiaLinkProps, Link } from '@inertiajs/react';

export default function ResponsiveNavLink({
    active = false,
    className = '',
    children,
    ...props
}: InertiaLinkProps & { active?: boolean }) {
    return (
        <Link
            {...props}
            className={`flex w-full items-start border-l-4 py-2 pe-4 ps-3 ${
                active
                    ? 'border-cobalt-lt bg-cobalt-50 text-cobalt-dk focus:border-cobalt-dk focus:bg-cobalt-50 focus:text-cobalt-dk'
                    : 'border-transparent text-muted-foreground hover:border-input hover:bg-background hover:text-foreground focus:border-input focus:bg-background focus:text-foreground'
            } text-base font-medium transition duration-150 ease-in-out focus:outline-none ${className}`}
        >
            {children}
        </Link>
    );
}
