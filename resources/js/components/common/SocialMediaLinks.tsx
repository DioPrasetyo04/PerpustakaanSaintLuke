import React from 'react';
import {
    FaInstagram,
    FaFacebookF,
    FaXTwitter,
    FaTiktok,
    FaWhatsapp,
    FaLinkedinIn,
    FaEnvelope,
} from 'react-icons/fa6';
import type { IconType } from 'react-icons';
import { cn } from '@/lib/utils';
import type {
    SocialMediaProps,
    SocialMediaPlatform,
} from '@/types/DataTypes/SocialMediaProps';

/**
 * Pemetaan tiap platform → ikon, label, dan warna brand-nya.
 * `gradient` dipakai untuk platform multi-warna (Instagram/TikTok) saat hover.
 */
const SOCIAL_CONFIG: Record<
    SocialMediaPlatform,
    { icon: IconType; label: string; color: string; gradient?: string }
> = {
    instagram: {
        icon: FaInstagram,
        label: 'Instagram',
        color: '#E1306C',
        gradient: 'linear-gradient(45deg, #F58529, #DD2A7B, #8134AF, #515BD4)',
    },
    facebook: { icon: FaFacebookF, label: 'Facebook', color: '#1877F2' },
    twitter: { icon: FaXTwitter, label: 'Twitter', color: '#000000' },
    tiktok: {
        icon: FaTiktok,
        label: 'TikTok',
        color: '#000000',
        gradient: 'linear-gradient(45deg, #25F4EE, #000000, #FE2C55)',
    },
    whatsapp: { icon: FaWhatsapp, label: 'WhatsApp', color: '#25D366' },
    linkedin: { icon: FaLinkedinIn, label: 'LinkedIn', color: '#0A66C2' },
    gmail: { icon: FaEnvelope, label: 'Email', color: '#EA4335' },
};

/**
 * Normalisasi tujuan link: WhatsApp/Gmail kerap diisi nomor/email saja,
 * jadi kita bentuk URL yang valid bila `url` belum berupa http(s).
 */
const resolveHref = (social: SocialMediaProps): string => {
    const value = (social.url ?? '').trim();
    if (!value) return '#';

    if (/^https?:\/\//i.test(value)) return value;

    switch (social.platform) {
        case 'whatsapp':
            return `https://wa.me/${value.replace(/[^0-9]/g, '')}`;
        case 'gmail':
            return value.includes('@') ? `mailto:${value}` : value;
        default:
            return `https://${value}`;
    }
};

const SIZES = {
    sm: { box: 'h-8 w-8', icon: 'h-3.5 w-3.5' },
    md: { box: 'h-9 w-9', icon: 'h-4 w-4' },
} as const;

const SocialIcon = ({
    social,
    size,
}: {
    social: SocialMediaProps;
    size: keyof typeof SIZES;
}) => {
    const config = SOCIAL_CONFIG[social.platform];
    if (!config) return null;

    const Icon = config.icon;
    const href = resolveHref(social);
    const s = SIZES[size];

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            aria-label={`${config.label}${social.username ? ` — ${social.username}` : ''}`}
            title={config.label}
            style={
                {
                    '--brand': config.color,
                    '--brand-bg': config.gradient ?? config.color,
                } as React.CSSProperties
            }
            className={cn(
                'group/social grid place-items-center rounded-full border border-border bg-muted/40 text-muted-foreground transition-all duration-300',
                'hover:-translate-y-0.5 hover:scale-110 hover:border-transparent hover:text-white hover:[background:var(--brand-bg)] hover:[box-shadow:0_8px_20px_-6px_var(--brand)]',
                s.box,
            )}
        >
            <Icon
                className={cn(
                    'transition-transform duration-300 group-hover/social:scale-110',
                    s.icon,
                )}
            />
        </a>
    );
};

type SocialMediaLinksProps = {
    socials?: SocialMediaProps[] | null;
    size?: keyof typeof SIZES;
    className?: string;
};

/**
 * Deretan ikon media sosial brand yang interaktif (hover → warna brand + lift).
 * Hanya menampilkan platform yang dikenal dan punya URL.
 */
export const SocialMediaLinks = ({
    socials,
    size = 'md',
    className,
}: SocialMediaLinksProps) => {
    const items = (socials ?? []).filter(
        (s) => SOCIAL_CONFIG[s.platform] && (s.url ?? '').trim() !== '',
    );

    if (items.length === 0) return null;

    return (
        <div className={cn('flex flex-wrap items-center gap-2', className)}>
            {items.map((social) => (
                <SocialIcon key={social.id} social={social} size={size} />
            ))}
        </div>
    );
};

export default SocialMediaLinks;
