import { MonitorSmartphone, BookCopy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/hooks/useLanguage';
import type { BookFormat, BookTypeProps } from '@/types/DataTypes/BooksProps';

/** Metadata tampilan per format buku (ikon + warna ala badge "Populer"). */
const META: Record<
    BookFormat,
    { label: { id: string; en: string }; Icon: typeof BookCopy; cls: string }
> = {
    digital: {
        label: { id: 'Digital', en: 'Digital' },
        Icon: MonitorSmartphone,
        cls: 'bg-indigo-500/90 text-white',
    },
    fisik: {
        label: { id: 'Fisik', en: 'Physical' },
        Icon: BookCopy,
        cls: 'bg-amber-500/90 text-white',
    },
};

/** Ambil daftar format unik (digital/fisik) dari relasi types buku. */
export function uniqueFormats(types?: BookTypeProps[]): BookFormat[] {
    const set = new Set<BookFormat>();
    (types ?? []).forEach((t) => {
        if (t.type === 'digital' || t.type === 'fisik') set.add(t.type);
    });
    return [...set];
}

/** Label terlokalisasi gabungan, mis. "Digital & Fisik". */
export function formatTypeLabel(
    types: BookTypeProps[] | undefined,
    language: 'id' | 'en',
): string {
    const formats = uniqueFormats(types);
    if (formats.length === 0) return '-';
    return formats.map((f) => META[f].label[language]).join(' & ');
}

type BookTypeBadgeProps = {
    types?: BookTypeProps[];
    size?: 'sm' | 'md';
    className?: string;
};

/**
 * Badge format buku (Digital / Fisik / keduanya) bergaya seperti badge "Populer".
 * Menampilkan satu pill per format agar pengguna tahu ketersediaan buku.
 */
export default function BookTypeBadge({
    types,
    size = 'sm',
    className,
}: BookTypeBadgeProps) {
    const { language } = useLanguage();
    const formats = uniqueFormats(types);
    if (formats.length === 0) return null;

    return (
        <>
            {formats.map((f) => {
                const meta = META[f];
                const Icon = meta.Icon;
                return (
                    <span
                        key={f}
                        className={cn(
                            'tracking-editorial inline-flex items-center gap-1 rounded-full font-bold uppercase shadow-sm',
                            size === 'sm'
                                ? 'px-2 py-0.5 text-[10px]'
                                : 'px-2.5 py-1 text-[11px]',
                            meta.cls,
                            className,
                        )}
                    >
                        <Icon
                            className={size === 'sm' ? 'h-2.5 w-2.5' : 'h-3 w-3'}
                        />
                        {meta.label[language]}
                    </span>
                );
            })}
        </>
    );
}
